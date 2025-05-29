/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

interface PageViewData {
  page_path: string;
  referrer?: string;
  user_agent: string;
  session_id: string;
  visitor_id: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
}

interface ProjectViewData {
  project_slug: string;
  project_title: string;
  visitor_id: string;
  session_id: string;
  referrer?: string;
  user_agent: string;
}

class AnalyticsClient {
  private sessionId: string;
  private visitorId: string;
  private startTime: number;
  private isTracking: boolean = false;

  constructor() {
    // Only initialize if we're in the browser
    if (typeof window !== "undefined") {
      this.sessionId = this.getOrCreateSessionId();
      this.visitorId = this.getOrCreateVisitorId();
      this.startTime = Date.now();

      // Track page exit
      this.setupPageExitTracking();
    } else {
      // Fallback values for server-side rendering
      this.sessionId = "ssr-session";
      this.visitorId = "ssr-visitor";
      this.startTime = Date.now();
    }
  }

  private getOrCreateSessionId(): string {
    if (typeof window === "undefined") return "ssr-session";

    let sessionId = sessionStorage.getItem("portfolio_session_id");
    if (!sessionId) {
      sessionId = this.generateId();
      sessionStorage.setItem("portfolio_session_id", sessionId);
    }
    return sessionId;
  }

  private getOrCreateVisitorId(): string {
    if (typeof window === "undefined") return "ssr-visitor";

    let visitorId = localStorage.getItem("portfolio_visitor_id");
    if (!visitorId) {
      visitorId = this.generateId();
      localStorage.setItem("portfolio_visitor_id", visitorId);
    }
    return visitorId;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  private getDeviceType(): string {
    if (typeof window === "undefined") return "unknown";

    const width = window.innerWidth;
    if (width < 768) return "mobile";
    if (width < 1024) return "tablet";
    return "desktop";
  }

  private getBrowser(): string {
    if (typeof window === "undefined") return "unknown";

    const userAgent = navigator.userAgent;
    if (userAgent.includes("Chrome")) return "Chrome";
    if (userAgent.includes("Firefox")) return "Firefox";
    if (userAgent.includes("Safari")) return "Safari";
    if (userAgent.includes("Edge")) return "Edge";
    return "Other";
  }

  private getOS(): string {
    if (typeof window === "undefined") return "unknown";

    const userAgent = navigator.userAgent;
    if (userAgent.includes("Windows")) return "Windows";
    if (userAgent.includes("Mac")) return "macOS";
    if (userAgent.includes("Linux")) return "Linux";
    if (userAgent.includes("Android")) return "Android";
    if (userAgent.includes("iOS")) return "iOS";
    return "Other";
  }

  private getUtmParameters(): {
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_content?: string;
    utm_term?: string;
  } {
    if (typeof window === "undefined") return {};

    const urlParams = new URLSearchParams(window.location.search);
    return {
      utm_source: urlParams.get("utm_source") || undefined,
      utm_medium: urlParams.get("utm_medium") || undefined,
      utm_campaign: urlParams.get("utm_campaign") || undefined,
      utm_content: urlParams.get("utm_content") || undefined,
      utm_term: urlParams.get("utm_term") || undefined,
    };
  }

  private async getLocationData() {
    try {
      // Using a free IP geolocation service
      const response = await fetch("/api/location");
      if (response.ok) {
        const data = await response.json();
        return {
          country: data.country_name,
          city: data.city,
          region: data.region,
          timezone: data.timezone,
        };
      }
    } catch (error) {
      console.warn("Failed to get location data:", error);
    }
    return {};
  }

  async trackPageView(customPath?: string): Promise<void> {
    if (this.isTracking) return; // Prevent duplicate tracking
    this.isTracking = true;
    this.startTime = Date.now();

    try {
      const locationData = await this.getLocationData();
      const utmParams = this.getUtmParameters();

      const pageViewData: PageViewData = {
        page_path: customPath || window.location.pathname,
        referrer: document.referrer || undefined,
        user_agent: navigator.userAgent,
        session_id: this.sessionId,
        visitor_id: this.visitorId,
        ...utmParams,
      };

      // Send to your API endpoint
      await fetch("/api/analytics/page-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...pageViewData,
          ...locationData,
          device_type: this.getDeviceType(),
          browser: this.getBrowser(),
          os: this.getOS(),
        }),
      });
    } catch (error) {
      console.warn("Analytics tracking failed:", error);
    }
  }

  async trackProjectView(
    projectSlug: string,
    projectTitle: string,
  ): Promise<void> {
    try {
      const projectViewData: ProjectViewData = {
        project_slug: projectSlug,
        project_title: projectTitle,
        visitor_id: this.visitorId,
        session_id: this.sessionId,
        referrer: document.referrer || undefined,
        user_agent: navigator.userAgent,
      };

      await fetch("/api/analytics/project-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectViewData),
      });
    } catch (error) {
      console.warn("Project view tracking failed:", error);
    }
  }

  private setupPageExitTracking(): void {
    if (typeof window === "undefined") return;

    const trackPageExit = () => {
      if (!this.isTracking) return;

      const duration = Math.round((Date.now() - this.startTime) / 1000);
      const isBounce = duration < 10; // Less than 10 seconds is considered a bounce

      // Use sendBeacon for reliable tracking on page exit
      if (navigator.sendBeacon) {
        navigator.sendBeacon(
          "/api/analytics/page-exit",
          JSON.stringify({
            session_id: this.sessionId,
            visitor_id: this.visitorId,
            duration,
            is_bounce: isBounce,
          }),
        );
      }
    };

    // Track on page unload
    window.addEventListener("beforeunload", trackPageExit);
    window.addEventListener("pagehide", trackPageExit);

    // Track on visibility change (tab switching)
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        trackPageExit();
      }
    });
  }

  // Track custom events
  async trackEvent(
    eventName: string,
    properties?: Record<string, any>,
  ): Promise<void> {
    if (typeof window === "undefined") return;

    try {
      await fetch("/api/analytics/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          event_name: eventName,
          properties,
          visitor_id: this.visitorId,
          session_id: this.sessionId,
          page_path: window.location.pathname,
        }),
      });
    } catch (error) {
      console.warn("Event tracking failed:", error);
    }
  }

  // Track downloads
  trackDownload(fileName: string, fileType: string): void {
    this.trackEvent("download", {
      file_name: fileName,
      file_type: fileType,
    });
  }

  // Track external link clicks
  trackExternalLink(url: string, linkText?: string): void {
    this.trackEvent("external_link_click", {
      url,
      link_text: linkText,
    });
  }

  // Track form submissions
  trackFormSubmission(formName: string, success: boolean): void {
    this.trackEvent("form_submission", {
      form_name: formName,
      success,
    });
  }
}

// Create a singleton instance
export const analytics = new AnalyticsClient();

// Hook for React components
export function useAnalytics() {
  return {
    trackPageView: analytics.trackPageView.bind(analytics),
    trackProjectView: analytics.trackProjectView.bind(analytics),
    trackEvent: analytics.trackEvent.bind(analytics),
    trackDownload: analytics.trackDownload.bind(analytics),
    trackExternalLink: analytics.trackExternalLink.bind(analytics),
    trackFormSubmission: analytics.trackFormSubmission.bind(analytics),
  };
}
