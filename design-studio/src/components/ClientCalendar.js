import { useEffect, useState } from "react";
import axios from "axios";
import { generateSlots } from "./generateSlots";
import "../styles/ClientCalendar.css";

const ClientCalendar = ({ project }) => {
  const [selectedDay, setSelectedDay] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [meetings, setMeetings] = useState([]);
  const [meetingType, setMeetingType] = useState("online");
  const [topic, setTopic] = useState("");

  const [toast, setToast] = useState(null);

  const token = localStorage.getItem("token");

  const showToast = (text, type = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };

  const hasUpcomingMeeting = meetings.some(
    (m) => m.status !== "done" && new Date(m.date) > new Date()
  );

  const needsBriefing =
    project?.status === "briefing" &&
    project?.meeting_required === 1 &&
    !hasUpcomingMeeting;

    const localDateTime = new Date(selectedSlot)
      .toLocaleString("sv-SE")
      .slice(0, 16);

  const fetchMeetings = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/client/meetings",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setMeetings(res.data);
  };
  
  useEffect(() => {
    fetchMeetings();
  }, []);

  const fetchSlots = async (day) => {
    const res = await axios.get(
      `http://localhost:5000/api/meetings/slots?day=${day}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const booked = res.data;
    setSlots(generateSlots(new Date(day), booked));
  };

  useEffect(() => {
    if (selectedDay) {
      fetchSlots(selectedDay);
      setSelectedSlot(null);
    }
  }, [selectedDay]);

  const handleBook = async () => {
    if (!selectedSlot) {
      showToast("Please select a time slot", "error");  
      return;
    }
    if (!topic.trim()) {
    showToast("Please enter meeting topic", "error");
    return;
  }
    try {
      await axios.post(
        "http://localhost:5000/api/client/meetings",
        {
          date: localDateTime,
          type: meetingType,
          topic
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      showToast("Meeting booked!");
      fetchMeetings();
      fetchSlots(selectedDay);
      setSelectedSlot(null);
    } catch {
      showToast("Slot is no longer available", "error");
    }
  };

  const handleMarkDone = async (id) => {
    await axios.put(
      `http://localhost:5000/api/client/meetings/${id}/done`,
      {},
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchMeetings();
  };

  const handleDeleteMeeting = async (id) => {
    await axios.delete(
      `http://localhost:5000/api/client/meetings/${id}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    fetchMeetings();
  };

  const todayStr = new Date().toISOString().slice(0, 10);
  const isWeekend = (dateStr) => {
    const d = new Date(dateStr);
    return d.getDay() === 0 || d.getDay() === 6;
  };

  return (
    <div className="client-calendar">
      <h3>Book a meeting</h3>
      {needsBriefing && (
        <div className="calendar-warning">
          ⚠️ Please schedule a briefing meeting.
        </div>
      )}

      <input
        type="date"
        min={todayStr}
        value={selectedDay}
        onChange={(e) => {
          if (isWeekend(e.target.value)) {
            showToast("Weekends are not available", "error");
            return;
          }
          setSelectedDay(e.target.value);
        }}
      />

      <select value={meetingType} onChange={(e) => setMeetingType(e.target.value)}>
        <option value="online">Online</option>
        <option value="offline">Offline</option>
      </select>

      <textarea
        className="meeting-topic"
        placeholder="What would you like to discuss?"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        rows={3}
      />
      

      {slots.length > 0 && (
        <div className="slots">
          {slots.map(slot => (
            <button
              key={slot}
              className={selectedSlot === slot ? "slot active" : "slot"}
              onClick={() => setSelectedSlot(slot)}
            >
              {new Date(slot).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </button>
          ))}
        </div>
      )}

      <button className="book-button" disabled={!selectedSlot || hasUpcomingMeeting} onClick={handleBook}>
        Book meeting
      </button>

      {hasUpcomingMeeting && (
        <p className="info">
          You already have an upcoming meeting. You cannot book another until it’s done or cancelled.
        </p>
      )}

      <ul>
        {[...meetings].reverse().map((m) => (
          <li key={m.id}>
            <div className="meeting-info">
              <span>{new Date(m.date).toLocaleString()} ({m.type})</span>
              <strong>{m.status}</strong>
            </div>
            <div className="meeting-topic-preview">
              📝 {m.topic}
            </div>
            {m.status !== "done" && (
              <div className="meeting-actions">
                <button onClick={() => handleMarkDone(m.id)}>Done</button>
                <button onClick={() => handleDeleteMeeting(m.id)}>Cancel</button>
              </div>
            )}
          </li>
        ))}
      </ul>

      {toast && <div className={`toast ${toast.type}`}>{toast.text}</div>}

    </div>
  );
};

export default ClientCalendar;
