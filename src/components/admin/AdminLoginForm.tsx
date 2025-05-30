// src/components/admin/AdminLoginForm.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, AlertTriangle } from "lucide-react";
import { ShootingStars } from "@/components/ui/shooting-stars";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function AdminLoginForm() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page after a delay since we use path-based authentication
    const timer = setTimeout(() => {
      router.replace("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

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
            <p className="text-navy-400 text-sm">
              This system uses path-based authentication
            </p>
          </div>

          {/* Security Notice */}
          <div className="mb-6 rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-500" />
              <div>
                <h3 className="mb-1 text-sm font-medium text-yellow-300">
                  Authentication Method Changed
                </h3>
                <p className="text-xs text-yellow-200/80">
                  Traditional login is no longer available. Access is now
                  provided via secure URL paths.
                </p>
              </div>
            </div>
          </div>

          <div className="text-navy-400 space-y-2 text-center text-sm">
            <p>Contact the administrator for access instructions.</p>
            <p className="text-xs opacity-75">Redirecting to home page...</p>
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
