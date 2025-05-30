"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut, Shield, Clock } from "lucide-react";
import { toast } from "sonner";

export function AdminLogout() {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    // Calculate session expiry (24 hours from now, approximately)
    const expiryTime = new Date(Date.now() + 24 * 60 * 60 * 1000);
    setSessionExpiry(
      expiryTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );

    // Optional: Auto-logout warning before session expires
    const warningTime = 23 * 60 * 60 * 1000; // 23 hours
    const warningTimeout = setTimeout(() => {
      toast.warning("Admin session will expire in 1 hour", {
        duration: 10000,
      });
    }, warningTime);

    return () => clearTimeout(warningTimeout);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      const response = await fetch("/api/admin/logout", {
        method: "POST",
      });

      if (response.ok) {
        toast.success("Logged out successfully");
        router.push("/");
        router.refresh();
      } else {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Failed to logout");

      // Fallback: clear cookies client-side and redirect
      document.cookie =
        "admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/admin;";
      router.push("/");
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <div className="flex items-center gap-4">
      {/* Session Status Indicator */}
      <div className="flex items-center gap-2 text-sm">
        <div className="flex items-center gap-1.5 text-green-400">
          <Shield className="h-4 w-4" />
          <span className="hidden sm:inline">Admin Active</span>
        </div>

        <div className="text-navy-300 hidden items-center gap-1.5 md:flex">
          <Clock className="h-3 w-3" />
          <span className="text-xs">Expires {sessionExpiry}</span>
        </div>
      </div>

      {/* Logout Button */}
      <Button
        onClick={handleLogout}
        disabled={isLoggingOut}
        variant="ghost"
        size="sm"
        className="text-red-400 transition-colors hover:bg-red-900/20 hover:text-red-300"
      >
        {isLoggingOut ? (
          <>
            <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-red-400 border-t-transparent" />
            <span className="hidden sm:inline">Logging out...</span>
          </>
        ) : (
          <>
            <LogOut className="h-4 w-4 sm:mr-2" />
            <span className="hidden sm:inline">Logout</span>
          </>
        )}
      </Button>
    </div>
  );
}

// Simple logout link component (alternative)
export function AdminLogoutLink() {
  return (
    <a
      href="/api/admin/logout"
      className="text-sm text-red-400 underline transition-colors hover:text-red-300"
    >
      Logout
    </a>
  );
}
