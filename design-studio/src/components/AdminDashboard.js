import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../styles/AdminDashboard.css";

const AdminDashboard = () => {
  const [contractCode, setContractCode] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [tempPassword, setTempPassword] = useState("");
  const [message, setMessage] = useState("");
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectContractCode, setProjectContractCode] = useState("");
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);
  const [searchContract, setSearchContract] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [contactMessages, setContactMessages] = useState([]);

  
  const [toast, setToast] = useState(null);
  const showToast = (text, type = "success") => {
    setToast({ text, type });
    setTimeout(() => setToast(null), 3000);
  };
    const handleLogout = () => {
      logout();
      navigate("/login");
    };

  const PROJECT_STATUSES = [
    { value: "contract_signed", label: "Contract signed" },
    { value: "briefing", label: "Briefing & requirements analysis" },
    { value: "concept_development", label: "Concept development" },
    { value: "layout_planning", label: "Layout planning" },
    { value: "design_approval", label: "Design revision & approval" },
    { value: "working_drawings", label: "Technical drawings" },
    { value: "contractor_search", label: "Contractor selection" },
    { value: "materials_selection", label: "Materials selection" },
    { value: "budget_approval", label: "Budget approval" },
    { value: "implementation", label: "Implementation supervision" },
    { value: "author_supervision", label: "Author supervision" },
    { value: "completed", label: "Project completed" },
  ];

  const handleCreateProject = async (e) => {
    e.preventDefault();

    const existingProject = projects.find(
      (p) => p.contract_code === projectContractCode
    );

    if (existingProject) {
      showToast(`Client ${projectContractCode} already has a project!`, "error");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/create-project",
        {
          contractCode: projectContractCode,
          projectName,
          description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      await fetchProjects();
      
      setProjectContractCode("");
      setProjectName("");
      setDescription("");
      
      showToast("Project created successfully!", "success");

    } catch (err) {
      showToast(err.response?.data || "Error creating project", "error");
    }
  };


  const handleCreateClient = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/create-client",
        { contractCode },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      setTempPassword(res.data.tempPassword);
      setMessage(`Client created! Temporary password: ${res.data.tempPassword}`);
      setContractCode("");
    } catch (err) {
      if (err.response && err.response.data.message) {
        setMessage(err.response.data.message);
      } else {
        showToast("Error creating client", "error");
      }
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/api/admin/reset-client-password",
        { contractCode: resetCode },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      );
      showToast(`Password reset! New temp password: ${res.data.tempPassword}`, "success");
      setResetCode("");
    } catch (err) {
      console.error(err);
      showToast("Error resetting password", "error");
    }
  };

  const fetchClients = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/clients", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setClients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/projects", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
    
      const normalized = res.data.map((p) => {
        const found = PROJECT_STATUSES.find(s => s.value === p.status || s.label === p.status);
        return { ...p, status: found ? found.value : p.status };
      });

      setProjects(normalized);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchContactMessages = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/admin/contact-messages",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setContactMessages(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleStatusChange = async (projectId, newStatus) => {
    try {
      await axios.put(
        "http://localhost:5000/api/admin/update-project-status",
        { projectId, status: newStatus },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProjects((prev) =>
        prev.map((p) =>
          p.id === projectId
            ? {
                ...p,
                status: newStatus,
                meeting_required: newStatus === "briefing" ? true : p.meeting_required,
              }
            : p
        )
      );
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkMessageProcessed = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/admin/contact-messages/${id}/processed`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchContactMessages();
      showToast("Message marked as processed", "success");
    } catch (err) {
      console.error(err);
      showToast("Error updating message", "error");
    }
  };

  const [meetings, setMeetings] = useState([]);

  const fetchMeetings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/admin/meetings", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setMeetings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleMarkDone = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin/meetings/${id}/done`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      fetchMeetings();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProjects();
    fetchClients();
    fetchMeetings();
    fetchContactMessages();
  }, []);


  return (
    <div className="admin-dashboard">
      <h2 className="admin-title">Admin Dashboard</h2>
      {message && <p className="admin-message">{message}</p>}
      <section className="admin-section">
        <div className="admin-forms">
          <form className="admin-form" onSubmit={handleCreateClient}>
            <h3>Create New Client</h3>
            <input
              className="admin-input"
              type="text"
              inputMode="numeric"
              pattern="\d*"
              placeholder="Contract Code"
              value={contractCode}
              onChange={(e) => {
                const val = e.target.value;
                if (/^\d*$/.test(val)) { 
                  setContractCode(val);
                }
              }}
              required
            />
            <button className="admin-button full-width" type="submit">Create Client</button>
          </form>

          <form className="admin-form" onSubmit={handleResetPassword}>
            <h3>Reset Client Password</h3>
            <select className="admin-select"
              value={resetCode}
              onChange={(e) => setResetCode(e.target.value)}
              required
            >
              <option value="">Select client contract</option>
              {clients.map((client) => (
                <option key={client.contract_code} value={client.contract_code}>
                  {client.contract_code}
                </option>
              ))}
            </select>

            <button className="admin-button full-width" type="submit">Reset Password</button>
          </form>
        </div>
      </section>

      <section className="admin-section">
        <form className="admin-form" onSubmit={handleCreateProject}>
          <h3>Create Project</h3>
          <select className="admin-select"
            value={projectContractCode}
            onChange={(e) => setProjectContractCode(e.target.value)}
            required
          >
            <option value="">Select client contract</option>
            {clients.map((client) => (
              <option key={client.contract_code} value={client.contract_code}>
                {client.contract_code}
              </option>
            ))}
          </select>
          <input className="admin-input"
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            required
          />
          <textarea className="admin-textarea"
            placeholder="Project Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <button className="admin-button" type="submit">Create Project</button>
        </form>
      </section>

      <section className="admin-section">    
      <h3 className="admin-section-title">Project Management</h3>
        <div className="admin-search">
          <input className="admin-input search"
            type="text"
            placeholder="Search by Contract Code (9 digits)"
            value={searchContract}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d{0,9}$/.test(val)) {
                setSearchContract(val);
              }
            }}
          />
        </div>
        <div className="admin-table-wrapper">     
          <table className="admin-table">
            <thead>
              <tr>
                <th>Contract Code</th>
                <th>Project</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {projects
                .filter((project) =>
                  project.contract_code.includes(searchContract)
                )
                .map((project) => (
                  <tr key={project.id}>
                    <td>{project.contract_code}</td>
                    <td>{project.project_name}</td>
                    <td>
                      <select
                        value={project.status}
                        onChange={(e) => handleStatusChange(project.id, e.target.value)}
                      >
                        {PROJECT_STATUSES.map((status) => (
                          <option key={status.value} value={status.value}>
                            {status.label}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div> 
      </section> 
      
      <section className="admin-section">     
        <h3 className="admin-section-title">All Meetings</h3>
        <div className="admin-table-wrapper"> 
          <table className="admin-table">
            <thead>
              <tr>
                <th>Contract Code</th>
                <th>Project</th>
                <th>Date & Time</th>
                <th>Type</th>
                <th>Topic</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {meetings.map(m => (
                <tr key={m.id}>
                  <td>{m.contract_code}</td>
                  <td>{m.project_name}</td>
                  <td>{new Date(m.date).toLocaleString()}</td>
                  <td>{m.type}</td>
                  <td>{m.topic}</td>
                  <td>{m.status}</td>
                  <td>
                    {m.status !== "done" && (
                      <button className="admin-button" onClick={() => handleMarkDone(m.id)}>Done</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section> 

      <section className="admin-section">
        <h3 className="admin-section-title">Contact Form Messages</h3>

        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Message</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              </thead>
              <tbody>
                {contactMessages.map((msg) => (
                  <tr key={msg.id}>
                    <td>{msg.name}</td>
                    <td>
                      <a href={`mailto:${msg.email}`}>{msg.email}</a>
                    </td>
                    <td className="message-cell">{msg.message}</td>
                    <td>
                      {msg.status === "new" ? (
                        <span className="badge new">NEW</span>
                      ) : (
                        <span className="badge processed">Processed</span>
                      )}
                    </td>
                    <td>
                      {msg.status === "new" && (
                        <button
                          className="admin-button"
                          onClick={() => handleMarkMessageProcessed(msg.id)}
                        >
                          Mark as processed
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>

          </table>
        </div>
      </section>
            
      <button className="admin-logout" onClick={handleLogout}>Logout</button>
      
      {toast && (<div className={`toast ${toast.type}`}>{toast.text}</div>)}

    </div>
  );
};

export default AdminDashboard;
