import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import ClientCalendar from "./ClientCalendar";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import "../styles/ClientDashboard.css";

const ClientDashboard = () => {
  const PROJECT_STATUS_LABELS = {
    contract_signed: "Contract signed",
    briefing: "Briefing & requirements analysis",
    concept_development: "Concept development",
    layout_planning: "Layout planning",
    design_approval: "Design revision & approval",
    working_drawings: "Technical drawings",
    contractor_search: "Contractor selection",
    materials_selection: "Materials selection",
    budget_approval: "Budget approval",
    implementation: "Implementation supervision",
    author_supervision: "Author supervision",
    completed: "Project completed",
  };
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/client/project", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProject(res.data);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setMessage("No project assigned yet.");
        } else {
          setMessage("Error fetching project");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="client-dashboard">
      <h2 className="dashboard-title">Client Dashboard</h2>
      {message && <p className="message">{message}</p>}

      {project && (
        <div className="project-info">
          <h3 className="project-name">{project.project_name}</h3>
          <p className="client-project-contract"><strong>Contract Code:</strong> {project.contract_code}</p>
          <p className="client-project-status"><strong>Status:</strong> {PROJECT_STATUS_LABELS[project.status]}</p>
          <p className="client-project-description"><strong>Description:</strong> {project.description || "No description"}</p>
          <div className="calendar-container">
            <ClientCalendar project={project} />
          </div>

        </div>
      )}

      <button className="dashboard-button" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default ClientDashboard;
