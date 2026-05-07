import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  Mail,
  Lock,
  Eye,
  ShieldCheck,
  MapPin,
  Zap,
} from "lucide-react";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    setIsLoading(true);

    setTimeout(() => {
      const success = login(email, password);

      if (success) {
        navigate("/");
      } else {
        setError("Invalid email or password");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#020817] text-white flex flex-col">
      {/* Main Content */}
      <div className="flex flex-1">
        
        {/* LEFT SIDE */}
        <div className="hidden lg:flex w-1/2 relative border-r border-slate-800 items-center justify-center overflow-hidden">
          
          {/* Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 to-black"></div>

          {/* City Glow */}
          <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-blue-600/20 via-indigo-500/10 to-transparent blur-3xl"></div>

          <div className="relative z-10 text-center px-10">
            
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center">
                <Zap className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            {/* Brand */}
            <h1 className="text-5xl font-extrabold tracking-wide">
              CRIME
              <span className="text-blue-500">DETECT</span>
            </h1>

            <p className="mt-6 text-xl text-slate-300">
              Smart Crime Detection & Alert System
            </p>

            <p className="mt-3 text-slate-500 max-w-md mx-auto leading-relaxed">
              Real-time monitoring. Smarter cities. Safer communities.
            </p>

            {/* Fake Skyline */}
            <div className="relative mt-20 h-56 flex items-end justify-center gap-3">
              {[70, 120, 90, 160, 100, 180, 130, 150, 90].map(
                (height, index) => (
                  <div
                    key={index}
                    className="w-10 bg-gradient-to-t from-blue-900 to-slate-800 rounded-t-md relative"
                    style={{ height: `${height}px` }}
                  >
                    {/* Windows */}
                    <div className="absolute inset-2 grid grid-cols-2 gap-1">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <div
                          key={i}
                          className="h-1 bg-blue-400/40 rounded"
                        ></div>
                      ))}
                    </div>

                    {/* Location Pins */}
                    {index % 2 === 0 && (
                      <MapPin className="absolute -top-7 left-1/2 -translate-x-1/2 w-5 h-5 text-blue-500" />
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex w-full lg:w-1/2 items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            
            {/* Card */}
            <div className="bg-[#071224]/90 border border-slate-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl">
              
              <h2 className="text-4xl font-bold mb-2">
                Welcome Back
              </h2>

              <p className="text-slate-400 mb-8">
                Sign in to continue to your account
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Email */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Email
                  </label>

                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />

                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-[#0b1729] border border-slate-800 rounded-xl py-3 pl-12 pr-4 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm text-slate-300 mb-2">
                    Password
                  </label>

                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />

                    <input
                      type="password"
                      required
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#0b1729] border border-slate-800 rounded-xl py-3 pl-12 pr-12 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />

                    <Eye className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 cursor-pointer" />
                  </div>
                </div>

                {/* Remember */}
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-slate-400">
                    <input
                      type="checkbox"
                      checked={remember}
                      onChange={() => setRemember(!remember)}
                      className="accent-blue-600"
                    />
                    Remember me
                  </label>

                  <button
                    type="button"
                    className="text-blue-500 hover:text-blue-400 transition"
                  >
                    Forgot Password?
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-center gap-3">
                    <ShieldCheck className="w-5 h-5 text-red-400" />
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                )}

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-blue-600 hover:bg-blue-700 transition rounded-xl py-3 font-semibold text-white shadow-lg shadow-blue-900/30"
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </button>

                {/* Divider */}
                <div className="flex items-center gap-4 text-slate-500 text-sm">
                  <div className="flex-1 h-px bg-slate-800"></div>
                  or
                  <div className="flex-1 h-px bg-slate-800"></div>
                </div>

                {/* Admin Login */}
                <button
                  type="button"
                  className="w-full border border-slate-800 hover:border-slate-700 bg-[#0b1729] rounded-xl py-3 flex items-center justify-center gap-2 text-slate-300 transition"
                >
                  <ShieldCheck className="w-5 h-5" />
                  Login as Admin
                </button>
              </form>

              {/* Footer */}
              <p className="text-center text-sm text-slate-500 mt-8">
                Don&apos;t have an account?{" "}
                <span className="text-blue-500 cursor-pointer hover:text-blue-400">
                  Contact Administrator
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-800 py-4 text-center text-slate-500 text-sm">
        © 2025 CrimeDetect. All rights reserved.
      </div>
    </div>
  );
};