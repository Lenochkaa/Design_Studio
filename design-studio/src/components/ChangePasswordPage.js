import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/ChangePasswordPage.css';
import axios from "axios";

const ChangePasswordPage = () => {
  const { auth, login } = useContext(AuthContext);
  const [newPassword, setNewPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/auth/change-password",
        { newPassword },
        { headers: { Authorization: `Bearer ${auth.token}` } }
      );

      login({ ...auth, isActivated: true });
      navigate("/client-dashboard");
    } catch (err) {
      setError(err.response?.data || "Error changing password");
    }
  };

  return (
    <div className="change-password">
      <h2 className="cp_text">Change Password</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="cp_form" onSubmit={handleSubmit}>
        <input className="cp_input"
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          required
        />
        <button className="cp_button" type="submit">Change Password</button>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
