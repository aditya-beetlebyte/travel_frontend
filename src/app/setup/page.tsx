"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { authAdminToUser, bootstrapFirstAdmin, getSetupStatus } from "@/services/authApi";
import { setAuth } from "@/redux/features/authSlice";
import { RootState } from "@/redux/store";
import Wrapper from "@/layouts/Wrapper";

export default function FirstTimeSetupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(true);
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((s: RootState) => s.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) router.replace("/admin");
  }, [isAuthenticated, router]);

  useEffect(() => {
    getSetupStatus()
      .then((d) => {
        if (d.hasSuperAdmin) {
          toast.info("A super admin already exists. Please log in.");
          router.replace("/login");
        }
      })
      .finally(() => setCheckingStatus(false));
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedEmail = email.trim();
    if (!trimmedEmail || !password) {
      toast.error("Please enter email and password");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    setLoading(true);
    try {
      const data = await bootstrapFirstAdmin(trimmedEmail, password, name.trim() || undefined);
      if (data.success && data.token && data.admin) {
        const permissions = data.permissions ?? {};
        dispatch(
          setAuth({
            token: data.token,
            user: authAdminToUser(data.admin),
            permissions,
          })
        );
        toast.success("Super admin account created");
        router.push("/admin");
      } else {
        toast.error(data.message || "Setup failed");
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Setup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      {checkingStatus ? (
        <div className="tg-login-area pt-130 pb-130 text-center">
          <div className="container">Checking setup status...</div>
        </div>
      ) : (
      <div className="tg-login-area pt-130 pb-130">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-xl-6 col-lg-8 col-md-10">
              <div className="tg-login-wrapper">
                <div className="tg-login-top text-center mb-30">
                  <h2>First-time setup</h2>
                  <p>
                    Create the first super admin account when none exists yet (new project or
                    recovery). After this, use the normal login page.
                  </p>
                </div>
                <form className="tg-login-form" onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-lg-12 mb-25">
                      <input
                        className="input"
                        type="text"
                        placeholder="Name (optional)"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={loading}
                        autoComplete="name"
                      />
                    </div>
                    <div className="col-lg-12 mb-25">
                      <input
                        className="input"
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                        required
                        autoComplete="email"
                      />
                    </div>
                    <div className="col-lg-12 mb-25">
                      <input
                        className="input"
                        type="password"
                        placeholder="Password (min 6 characters)"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                        required
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="col-lg-12 mb-25">
                      <input
                        className="input"
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        disabled={loading}
                        autoComplete="new-password"
                      />
                    </div>
                    <div className="col-lg-12">
                      <button type="submit" className="tg-btn w-100 mb-20" disabled={loading}>
                        {loading ? "Creating…" : "Create super admin"}
                      </button>
                      <p className="text-center mb-0">
                        <Link href="/login">Back to login</Link>
                      </p>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
    </Wrapper>
  );
}
