import { useState } from "react";
import { api, setAuthToken } from "../api/client";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const form = new URLSearchParams();
    form.append("username", email);
    form.append("password", password);
    try {
      const res = await api.post("/users/token", form);
      localStorage.setItem("token", res.data.access_token);
      setAuthToken(res.data.access_token);
      navigate("/dashboard");
    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen-with-nav flex items-center justify-center p-4">
      <div className="form-container w-full">
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form onSubmit={submit} className="flex flex-col gap-4">
            <input 
              className="form-input" 
              placeholder="Email" 
              onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
              className="form-input" 
              placeholder="Password" 
              type="password" 
              onChange={(e) => setPassword(e.target.value)} 
            />
            <button className="btn btn-primary py-3">Login</button>
          </form>
          <div className="mt-6 text-center">
            <p>No existing account? <Link to="/register" className="text-blue-600 hover:underline">Register here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;