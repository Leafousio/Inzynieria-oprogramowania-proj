import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/client";
import { useEffect } from "react";

function analyzePassword(pass) {
  const rules = {
    length: pass.length >= 8,
    uppercase: /[A-Z]/.test(pass),
    digit: /[0-9]/.test(pass),
  };

  const score = Object.values(rules).filter(Boolean).length;
  return { ...rules, score };
}

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const pwd = analyzePassword(password);

  const strengthColors = [
    "bg-red-500",
    "bg-yellow-500",
    "bg-green-500",
  ];

  const canSubmit = pwd.score === 3 && email.length > 0;
 
  useEffect(() => {
    if (error && canSubmit) {
      setError("");
    }
  }, [password, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!canSubmit) {
      setError("Hasło nie spełnia wymagań.");
      return;
    }

    setLoading(true);
    try {
      await api.post("/users/register", { email, password });
      navigate("/login");
    } catch (err) {
      const detail = err?.response?.data?.detail;

      if (Array.isArray(detail)) {
        setError(detail.map(d => d.msg).join(", "));
      } else if (typeof detail === "string") {
        setError(detail);
      } else {
        setError("Rejestracja nie powiodła się.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen-with-nav flex items-center justify-center p-4">
      <div className="form-container w-full">
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-center mb-6">
            Registration
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

           <div className="relative overflow-visible">
            <input
              type="password"
              placeholder="Password"
              className="form-input relative z-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

           
            <div className="mt-2 h-2 w-full bg-gray-200 rounded overflow-hidden relative z-0">
              <div
                style={{
                  width:
                    pwd.score === 1 ? "33%" :
                    pwd.score === 2 ? "66%" :
                    pwd.score === 3 ? "100%" : "0%",
                }}
                className={`h-full transition-all duration-300 ${
                  pwd.score === 1
                    ? "bg-red-500"
                    : pwd.score === 2
                    ? "bg-yellow-500"
                    : pwd.score === 3
                    ? "bg-green-500"
                    : ""
                }`}
              />
            </div>
          </div>

            Password Requirements:     
            <ul className="text-sm space-y-1">
              {!pwd.length && <li className="text-red-600">At least 8 characters</li>}
              {!pwd.uppercase && <li className="text-red-600">One uppercase letter</li>}
              {!pwd.digit && <li className="text-red-600">One number</li>}

              {pwd.score === 3 && (
                <li className="text-green-600 font-medium">
                  Password is OK
                </li>
              )}
            </ul>

            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
                {error}
              </div>
            )}

           <button
            disabled={!canSubmit || loading}
            className={`
              btn py-3
              ${canSubmit && !loading
                ? "btn-primary"
                : "bg-gray-400 cursor-not-allowed"}
            `}
          >
            {loading ? "Creating account…" : "Register"}
          </button>
          </form>

          <div className="mt-6 text-center">
            <p>
              Account Exists?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
