// src/components/admin/AdminLoginForm.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Loader2, Lock, User, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function AdminLoginForm() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Login failed");
      }

      toast.success("Welcome back!");
      router.push("/admin");
      router.refresh();
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error instanceof Error ? error.message : "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <main className="bg-background relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <ShootingStars />
      <div className="absolute inset-0 opacity-30">
        <BackgroundBeams />
      </div>

      <div className="relative z-10 w-full max-w-md px-6">
        {/* Login Card */}
        <div className="bg-navy-800/50 border-navy-600 rounded-2xl border p-8 shadow-2xl backdrop-blur-xl">
          {/* Header */}
          <div className="mb-8 text-center">
            <div className="bg-neon/20 border-neon/30 mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border">
              <Lock className="text-neon h-8 w-8" />
            </div>
            <h1 className="text-foreground mb-2 text-2xl font-bold">
              Admin Access
            </h1>
            <p className="text-navy-200 text-sm">
              Secure authentication required
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label
                htmlFor="username"
                className="text-foreground block text-sm font-medium"
              >
                Username
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <User className="text-navy-400 h-5 w-5" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={credentials.username}
                  onChange={handleInputChange}
                  className="bg-navy-700/50 border-navy-600 focus:border-neon focus:ring-neon/20 text-foreground placeholder-navy-400 w-full rounded-lg border py-3 pr-4 pl-10 transition-colors focus:ring-2 focus:outline-none"
                  placeholder="Enter username"
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-foreground block text-sm font-medium"
              >
                Password
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Lock className="text-navy-400 h-5 w-5" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={credentials.password}
                  onChange={handleInputChange}
                  className="bg-navy-700/50 border-navy-600 focus:border-neon focus:ring-neon/20 text-foreground placeholder-navy-400 w-full rounded-lg border py-3 pr-12 pl-10 transition-colors focus:ring-2 focus:outline-none"
                  placeholder="Enter password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:text-neon absolute inset-y-0 right-0 flex items-center pr-3 transition-colors"
                  disabled={isLoading}
                >
                  {showPassword ? (
                    <EyeOff className="text-navy-400 h-5 w-5" />
                  ) : (
                    <Eye className="text-navy-400 h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={
                isLoading || !credentials.username || !credentials.password
              }
              className="from-neon to-neon-4 hover:from-neon-4 hover:to-neon text-navy-900 w-full rounded-lg bg-gradient-to-r px-4 py-3 font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Authenticating...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>

          {/* Security Notice */}
          <div className="bg-navy-700/30 border-navy-600/50 mt-6 rounded-lg border p-4">
            <p className="text-navy-300 text-center text-xs">
              🔒 This is a secure area. All access attempts are logged.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-navy-400 text-sm">
            © {new Date().getFullYear()} zg0ul Admin Portal
          </p>
        </div>
      </div>
    </main>
  );
}
