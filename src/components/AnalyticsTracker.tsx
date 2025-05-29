/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { analytics } from "@/lib/analytics/client";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Track page view on mount and path change
    const trackPageView = async () => {
      // Add search params to path if they exist
      const fullPath = searchParams.toString()
        ? `${pathname}?${searchParams.toString()}`
        : pathname;

      await analytics.trackPageView(fullPath);
    };

    trackPageView();
  }, [pathname, searchParams]);

  // Add global click tracking for external links
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      const link = target.closest("a");

      if (link && link.href) {
        const url = new URL(link.href);
        const currentDomain = window.location.hostname;

        // Track external links
        if (url.hostname !== currentDomain) {
          analytics.trackExternalLink(link.href, link.textContent || undefined);
        }

        // Track downloads
        const downloadExtensions = [
          ".pdf",
          ".doc",
          ".docx",
          ".zip",
          ".rar",
          ".exe",
          ".dmg",
        ];
        const isDownload = downloadExtensions.some((ext) =>
          url.pathname.toLowerCase().endsWith(ext),
        );

        if (isDownload) {
          const fileName = url.pathname.split("/").pop() || "unknown";
          const fileType = fileName.split(".").pop() || "unknown";
          analytics.trackDownload(fileName, fileType);
        }
      }
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null; // This component doesn't render anything
}

// Hook for manual tracking in components
export function usePageTracking() {
  const pathname = usePathname();

  const trackProjectView = (projectSlug: string, projectTitle: string) => {
    analytics.trackProjectView(projectSlug, projectTitle);
  };

  const trackFormSubmission = (formName: string, success: boolean) => {
    analytics.trackFormSubmission(formName, success);
  };

  const trackCustomEvent = (
    eventName: string,
    properties?: Record<string, any>,
  ) => {
    analytics.trackEvent(eventName, properties);
  };

  const trackDownload = (fileName: string, fileType: string) => {
    analytics.trackDownload(fileName, fileType);
  };

  const trackExternalLink = (url: string, linkText?: string) => {
    analytics.trackExternalLink(url, linkText);
  };

  return {
    trackProjectView,
    trackFormSubmission,
    trackCustomEvent,
    trackDownload,
    trackExternalLink,
    currentPath: pathname,
  };
}
