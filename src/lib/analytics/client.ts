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

interface EventData {
  event_name: string;
  properties?: Record<string, any>;
  visitor_id: string;
  session_id: string;
  page_path: string;
}

class EnhancedAnalyticsClient {
  private sessionId: string;
  private visitorId: string;
  private startTime: number;
  private isTracking: boolean = false;
  private performanceData: Record<string, any> = {};

  constructor() {
    // Only initialize if we're in the browser
    if (typeof window !== "undefined") {
      this.sessionId = this.getOrCreateSessionId();
      this.visitorId = this.getOrCreateVisitorId();
      this.startTime = Date.now();

      // Track page exit and performance
      this.setupPageExitTracking();
      this.setupPerformanceTracking();
      this.setupErrorTracking();
      this.setupScrollTracking();
      this.setupClickTracking();
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

  private getScreenResolution(): string {
    if (typeof window === "undefined") return "unknown";
    return `${window.screen.width}x${window.screen.height}`;
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
      const response = await fetch("https://ipapi.co/json/");
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

  private setupPerformanceTracking(): void {
    if (typeof window === "undefined") return;

    // Track page load performance
    window.addEventListener("load", () => {
      setTimeout(() => {
        if (window.performance && window.performance.timing) {
          const timing = window.performance.timing;
          const loadTime = timing.loadEventEnd - timing.navigationStart;

          this.performanceData = {
            loadTime,
            domContentLoaded:
              timing.domContentLoadedEventEnd - timing.navigationStart,
            firstPaint: timing.responseStart - timing.navigationStart,
            dnsLookup: timing.domainLookupEnd - timing.domainLookupStart,
          };

          // Track slow page loads
          if (loadTime > 3000) {
            this.trackEvent("slow_page_load", {
              loadTime,
              page: window.location.pathname,
            });
          }
        }
      }, 0);
    });
  }

  private setupErrorTracking(): void {
    if (typeof window === "undefined") return;

    // Track JavaScript errors
    window.addEventListener("error", (event) => {
      this.trackEvent("javascript_error", {
        message: event.message,
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        page: window.location.pathname,
      });
    });

    // Track unhandled promise rejections
    window.addEventListener("unhandledrejection", (event) => {
      this.trackEvent("unhandled_promise_rejection", {
        reason: event.reason?.toString() || "Unknown reason",
        page: window.location.pathname,
      });
    });
  }

  private setupScrollTracking(): void {
    if (typeof window === "undefined") return;

    let scrollDepth = 0;
    const scrollCheckpoints = [25, 50, 75, 90, 100];
    const trackedCheckpoints: number[] = [];

    const trackScrollDepth = () => {
      const windowHeight = window.innerHeight;
      const documentHeight =
        document.documentElement.scrollHeight - windowHeight;
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;

      scrollDepth = Math.round((scrollTop / documentHeight) * 100);

      // Track scroll checkpoints
      scrollCheckpoints.forEach((checkpoint) => {
        if (
          scrollDepth >= checkpoint &&
          !trackedCheckpoints.includes(checkpoint)
        ) {
          trackedCheckpoints.push(checkpoint);
          this.trackEvent("scroll_depth", {
            depth: checkpoint,
            page: window.location.pathname,
          });
        }
      });
    };

    // Throttled scroll tracking
    let scrollTimeout: NodeJS.Timeout;
    window.addEventListener("scroll", () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(trackScrollDepth, 100);
    });
  }

  private setupClickTracking(): void {
    if (typeof window === "undefined") return;

    document.addEventListener("click", (event) => {
      const target = event.target as HTMLElement;

      // Track button clicks
      if (target.tagName === "BUTTON" || target.closest("button")) {
        const button =
          target.tagName === "BUTTON" ? target : target.closest("button");
        this.trackEvent("button_click", {
          buttonText: button?.textContent?.trim() || "Unknown",
          buttonId: button?.id || undefined,
          page: window.location.pathname,
        });
      }

      // Track navigation clicks
      const link = target.closest("a");
      if (link && link.href) {
        const isExternal = !link.href.startsWith(window.location.origin);
        const isDownload =
          link.hasAttribute("download") ||
          [".pdf", ".doc", ".docx", ".zip", ".rar", ".exe", ".dmg"].some(
            (ext) => link.href.toLowerCase().includes(ext),
          );

        if (isExternal) {
          this.trackEvent("external_link_click", {
            url: link.href,
            text: link.textContent?.trim() || "Unknown",
            domain: new URL(link.href).hostname,
            page: window.location.pathname,
          });
        } else if (isDownload) {
          const fileName = link.href.split("/").pop() || "unknown";
          const fileType = fileName.split(".").pop() || "unknown";
          this.trackEvent("download", {
            fileName,
            fileType,
            url: link.href,
            page: window.location.pathname,
          });
        } else {
          this.trackEvent("internal_link_click", {
            url: link.href,
            text: link.textContent?.trim() || "Unknown",
            page: window.location.pathname,
          });
        }
      }
    });
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
            performance: this.performanceData,
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
          screen_resolution: this.getScreenResolution(),
        }),
      });

      // Track page view as an event too
      this.trackEvent("page_view", {
        page: pageViewData.page_path,
        referrer: pageViewData.referrer,
        device_type: this.getDeviceType(),
        browser: this.getBrowser(),
        os: this.getOS(),
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

      // Also track as a custom event
      this.trackEvent("project_view", {
        project_slug: projectSlug,
        project_title: projectTitle,
        referrer: document.referrer,
      });
    } catch (error) {
      console.warn("Project view tracking failed:", error);
    }
  }

  // Enhanced event tracking
  async trackEvent(
    eventName: string,
    properties?: Record<string, any>,
  ): Promise<void> {
    if (typeof window === "undefined") return;

    try {
      const eventData: EventData = {
        event_name: eventName,
        properties: {
          ...properties,
          timestamp: Date.now(),
          user_agent: navigator.userAgent,
          device_type: this.getDeviceType(),
          browser: this.getBrowser(),
          os: this.getOS(),
          screen_resolution: this.getScreenResolution(),
          viewport_size: `${window.innerWidth}x${window.innerHeight}`,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        visitor_id: this.visitorId,
        session_id: this.sessionId,
        page_path: window.location.pathname,
      };

      await fetch("/api/analytics/event", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      });
    } catch (error) {
      console.warn("Event tracking failed:", error);
    }
  }

  // Enhanced form tracking
  trackFormSubmission(
    formName: string,
    success: boolean,
    formData?: Record<string, any>,
  ): void {
    this.trackEvent("form_submission", {
      form_name: formName,
      success,
      form_fields: formData ? Object.keys(formData) : undefined,
      field_count: formData ? Object.keys(formData).length : undefined,
    });
  }

  // Enhanced download tracking
  trackDownload(fileName: string, fileType: string, fileSize?: number): void {
    this.trackEvent("download", {
      file_name: fileName,
      file_type: fileType,
      file_size: fileSize,
    });
  }

  // Enhanced external link tracking
  trackExternalLink(url: string, linkText?: string): void {
    try {
      const domain = new URL(url).hostname;
      this.trackEvent("external_link_click", {
        url,
        domain,
        link_text: linkText,
      });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      this.trackEvent("external_link_click", {
        url,
        domain: "unknown",
        link_text: linkText,
      });
    }
  }

  // New tracking methods
  trackSearch(query: string, results?: number): void {
    this.trackEvent("search", {
      query: query.toLowerCase(), // Normalize for privacy
      query_length: query.length,
      has_results: results !== undefined ? results > 0 : undefined,
      result_count: results,
    });
  }

  trackVideoPlay(videoTitle: string, videoType?: string): void {
    this.trackEvent("video_play", {
      video_title: videoTitle,
      video_type: videoType || "unknown",
    });
  }

  trackNewsletterSignup(source?: string): void {
    this.trackEvent("newsletter_signup", {
      source: source || "unknown",
    });
  }

  trackSocialShare(platform: string, content?: string): void {
    this.trackEvent("social_share", {
      platform,
      content_type: content || "page",
    });
  }

  trackFeatureUsage(feature: string, action?: string): void {
    this.trackEvent("feature_usage", {
      feature,
      action: action || "use",
    });
  }

  trackPerformanceMark(markName: string, duration?: number): void {
    this.trackEvent("performance_mark", {
      mark_name: markName,
      duration,
      page: window.location.pathname,
    });
  }

  trackUserEngagement(engagementType: string, value?: number): void {
    this.trackEvent("user_engagement", {
      engagement_type: engagementType,
      value,
      session_duration: Math.round((Date.now() - this.startTime) / 1000),
    });
  }

  // Real-time tracking for admin dashboard
  async trackRealTimeActivity(): Promise<void> {
    if (typeof window === "undefined") return;

    try {
      await fetch("/api/analytics/realtime", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          visitor_id: this.visitorId,
          session_id: this.sessionId,
          page_path: window.location.pathname,
          timestamp: Date.now(),
          is_active: !document.hidden,
        }),
      });
    } catch (error) {
      console.warn("Real-time tracking failed:", error);
    }
  }

  // A/B testing support
  trackExperiment(experimentName: string, variant: string): void {
    this.trackEvent("experiment_view", {
      experiment_name: experimentName,
      variant,
    });
  }

  trackConversion(conversionType: string, value?: number): void {
    this.trackEvent("conversion", {
      conversion_type: conversionType,
      value,
    });
  }

  // Heatmap data collection
  trackMouseClick(x: number, y: number, element?: string): void {
    this.trackEvent("mouse_click", {
      x,
      y,
      element,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
    });
  }

  // User feedback tracking
  trackFeedback(rating: number, feedback?: string, context?: string): void {
    this.trackEvent("user_feedback", {
      rating,
      feedback_length: feedback?.length,
      context,
    });
  }

  // Advanced ecommerce tracking (if applicable)
  trackPurchase(transactionId: string, value: number, items?: any[]): void {
    this.trackEvent("purchase", {
      transaction_id: transactionId,
      value,
      item_count: items?.length,
      currency: "USD", // or dynamic
    });
  }

  // Get visitor insights for personalization
  getVisitorInsights(): Record<string, any> {
    return {
      visitor_id: this.visitorId,
      session_id: this.sessionId,
      device_type: this.getDeviceType(),
      browser: this.getBrowser(),
      os: this.getOS(),
      screen_resolution: this.getScreenResolution(),
      timezone:
        typeof window !== "undefined"
          ? Intl.DateTimeFormat().resolvedOptions().timeZone
          : "unknown",
      session_duration: Math.round((Date.now() - this.startTime) / 1000),
    };
  }
}

// Create a singleton instance
export const enhancedAnalytics = new EnhancedAnalyticsClient();

// Hook for React components with enhanced features
export function useEnhancedAnalytics() {
  return {
    trackPageView: enhancedAnalytics.trackPageView.bind(enhancedAnalytics),
    trackProjectView:
      enhancedAnalytics.trackProjectView.bind(enhancedAnalytics),
    trackEvent: enhancedAnalytics.trackEvent.bind(enhancedAnalytics),
    trackDownload: enhancedAnalytics.trackDownload.bind(enhancedAnalytics),
    trackExternalLink:
      enhancedAnalytics.trackExternalLink.bind(enhancedAnalytics),
    trackFormSubmission:
      enhancedAnalytics.trackFormSubmission.bind(enhancedAnalytics),
    trackSearch: enhancedAnalytics.trackSearch.bind(enhancedAnalytics),
    trackVideoPlay: enhancedAnalytics.trackVideoPlay.bind(enhancedAnalytics),
    trackNewsletterSignup:
      enhancedAnalytics.trackNewsletterSignup.bind(enhancedAnalytics),
    trackSocialShare:
      enhancedAnalytics.trackSocialShare.bind(enhancedAnalytics),
    trackFeatureUsage:
      enhancedAnalytics.trackFeatureUsage.bind(enhancedAnalytics),
    trackPerformanceMark:
      enhancedAnalytics.trackPerformanceMark.bind(enhancedAnalytics),
    trackUserEngagement:
      enhancedAnalytics.trackUserEngagement.bind(enhancedAnalytics),
    trackExperiment: enhancedAnalytics.trackExperiment.bind(enhancedAnalytics),
    trackConversion: enhancedAnalytics.trackConversion.bind(enhancedAnalytics),
    trackFeedback: enhancedAnalytics.trackFeedback.bind(enhancedAnalytics),
    trackPurchase: enhancedAnalytics.trackPurchase.bind(enhancedAnalytics),
    getVisitorInsights:
      enhancedAnalytics.getVisitorInsights.bind(enhancedAnalytics),
  };
}

// Backward compatibility
export const analytics = enhancedAnalytics;
export const useAnalytics = useEnhancedAnalytics;
