import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { api } from "../api/client";

function analyzePassword(pass) {
  const length = pass.length >= 8;
  const uppercase = /[A-Z]/.test(pass);
  const digit = /[0-9]/.test(pass);

  const score = [length, uppercase, digit].filter(Boolean).length;

  return { length, uppercase, digit, score };
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
            Rejestracja
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

            <input
              type="password"
              placeholder="Hasło"
              className="form-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* Pasek siły hasła */}
            <div className="h-2 w-full bg-gray-200 rounded overflow-hidden">
              <div
                className={`h-full transition-all ${
                  pwd.score > 0 ? strengthColors[pwd.score - 1] : ""
                }`}
                style={{ width: `${(pwd.score / 3) * 100}%` }}
              />
            </div>

            {/* Wymagania */}
            <ul className="text-sm">
              <li className={pwd.length ? "text-green-600" : "text-red-600"}>
                Minimum 8 znaków
              </li>
              <li className={pwd.uppercase ? "text-green-600" : "text-red-600"}>
                Jedna wielka litera
              </li>
              <li className={pwd.digit ? "text-green-600" : "text-red-600"}>
                Jedna cyfra
              </li>
            </ul>

            {error && (
              <div className="bg-red-100 text-red-700 p-2 rounded text-sm">
                {error}
              </div>
            )}

            <button
              className="btn btn-primary py-3"
              type="submit"
              disabled={loading}
            >
              {loading ? "Rejestracja..." : "Zarejestruj się"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p>
              Masz już konto?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Zaloguj się
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
