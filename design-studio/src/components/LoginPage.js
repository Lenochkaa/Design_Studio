import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import '../styles/LoginPage.css';
import axios from "axios";

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [contractCode, setContractCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        contractCode,
        password,
      });

      login(res.data);

      if (!res.data.isActivated) {
        navigate("/change-password");
      } else if (res.data.role === "admin") {
        navigate("/admin-dashboard");
      } else {
        navigate("/client-dashboard");
      }
    } catch (err) {
      setError(err.response?.data || "Error logging in");
    }
  };

  return (
    <div className="login">
      <h2 className="login_text">Login</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form className="login_form" onSubmit={handleSubmit}>
        <input className="login_input"
          type="text"
          placeholder="Contract Code"
          value={contractCode}
          onChange={(e) => setContractCode(e.target.value)}
          required
        />
        <input className="login_input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="login_button" type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
