"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { login } from "@/services/authApi";
import { setAuth } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";

const EyeIcon = ({ show }: { show: boolean }) =>
  show ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
      <line x1="1" y1="1" x2="23" y2="23" />
    </svg>
  );

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) router.replace("/admin");
  }, [isAuthenticated, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast.error("Please enter email and password");
      return;
    }
    setApiError("");
    setLoading(true);
    try {
      const data = await login(email.trim(), password);
      if (data.success && data.token && data.admin) {
        dispatch(
          setAuth({
            token: data.token,
            user: { id: data.admin.id, email: data.admin.email },
          })
        );
        toast.success("Signed in successfully");
        router.push("/admin");
      } else {
        const msg = data.message || "Login failed";
        setApiError(msg);
        toast.error(msg);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Login failed";
      setApiError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="row">
        {apiError && (
          <div className="col-lg-12 mb-25">
            <div
              className="tg-form-error"
              style={{
                padding: "12px 16px",
                borderRadius: 6,
                background: "rgba(220, 53, 69, 0.1)",
                color: "#dc3545",
                fontSize: 14,
              }}
            >
              {apiError}
            </div>
          </div>
        )}
        <div className="col-lg-12 mb-25">
          <input
            className="input"
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            autoComplete="email"
          />
        </div>
        <div className="col-lg-12 mb-25">
          <div className="tg-password-input-wrapper" style={{ position: "relative" }}>
            <input
              className="input"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={loading}
              autoComplete="current-password"
              style={{ paddingRight: 44 }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="tg-password-toggle"
              style={{
                position: "absolute",
                right: 12,
                top: "50%",
                transform: "translateY(-50%)",
                background: "none",
                border: "none",
                padding: 4,
                cursor: "pointer",
                color: "currentColor",
                opacity: 0.7,
              }}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <EyeIcon show={!showPassword} />
            </button>
          </div>
        </div>
        <div className="col-lg-12">
          <div className="d-flex align-items-center justify-content-between">
            <div className="review-checkbox d-flex align-items-center mb-25">
              <input className="tg-checkbox" type="checkbox" id="remember" />
              <label htmlFor="remember" className="tg-label">
                Remember me
              </label>
            </div>
            <div className="tg-login-navigate mb-25">
              <Link href="/register">Register Now</Link>
            </div>
          </div>
          <button
            type="submit"
            className="tg-btn w-100"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
