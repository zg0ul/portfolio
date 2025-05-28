"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Copy,
  CheckCircle,
  Send,
  Loader2,
  AlertCircle,
  Mail,
} from "lucide-react";
import { toast } from "sonner";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import AnimatedUnderline from "@/components/ui/AnimatedUnderline";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const email = "zg0ul.contact@gmail.com";
  const { isCopied, copyToClipboard } = useCopyToClipboard({ timeout: 2000 });

  const MAX_MESSAGE_LENGTH = 1000;
  const MIN_MESSAGE_LENGTH = 10;

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation - more strict
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    } else if (formData.name.trim().length > 50) {
      newErrors.name = "Name must be less than 50 characters";
    } else if (!/^[a-zA-Z\s'-]+$/.test(formData.name.trim())) {
      newErrors.name =
        "Name can only contain letters, spaces, hyphens, and apostrophes";
    }

    // Email validation - enhanced
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    } else if (formData.email.length > 100) {
      newErrors.email = "Email must be less than 100 characters";
    }

    // Message validation - enhanced
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < MIN_MESSAGE_LENGTH) {
      newErrors.message = `Message must be at least ${MIN_MESSAGE_LENGTH} characters`;
    } else if (formData.message.length > MAX_MESSAGE_LENGTH) {
      newErrors.message = `Message must be less than ${MAX_MESSAGE_LENGTH} characters`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;

    // Prevent exceeding max length for message
    if (name === "message" && value.length > MAX_MESSAGE_LENGTH) {
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side rate limiting with localStorage persistence
    const STORAGE_KEY = "portfolio_contact_submissions";
    const rateLimitTime = 15 * 60 * 1000; // 15 minutes
    const now = Date.now();

    try {
      const storedSubmissions = localStorage.getItem(STORAGE_KEY);
      const submissions: number[] = storedSubmissions
        ? JSON.parse(storedSubmissions)
        : [];

      // Remove old submissions (older than 15 minutes)
      const recentSubmissions = submissions.filter(
        (timestamp) => now - timestamp < rateLimitTime,
      );

      if (recentSubmissions.length >= 3) {
        const oldestSubmission = Math.min(...recentSubmissions);
        const remainingTime = Math.ceil(
          (rateLimitTime - (now - oldestSubmission)) / (60 * 1000),
        );
        toast.error(
          `Please wait ${remainingTime} minutes before sending another message.`,
        );
        return;
      }
    } catch (error) {
      console.warn("Could not access localStorage for rate limiting:", error);
    }

    if (!validateForm()) {
      toast.error("Please fix the errors below");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        // Store successful submission timestamp
        try {
          const storedSubmissions = localStorage.getItem(STORAGE_KEY);
          const submissions: number[] = storedSubmissions
            ? JSON.parse(storedSubmissions)
            : [];
          submissions.push(now);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
        } catch (error) {
          console.warn("Could not store submission timestamp:", error);
        }

        toast.success("Message sent successfully! I'll get back to you soon.");
        // Reset form after successful submission
        setFormData({ name: "", email: "", message: "" });
        setErrors({});
      } else {
        if (response.status === 429) {
          toast.error(
            "Too many requests. Please wait 15 minutes before sending another message.",
          );
        } else {
          toast.error(
            result.error || "Failed to send message. Please try again.",
          );
        }
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = async () => {
    const success = await copyToClipboard(email);
    if (success) {
      toast.success("Email copied to clipboard!");
    } else {
      toast.error("Failed to copy email");
    }
  };

  const getCharacterCountColor = () => {
    const length = formData.message.length;
    const percentage = length / MAX_MESSAGE_LENGTH;

    if (percentage < 0.7) return "text-gray-500";
    if (percentage < 0.9) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <section id="contact" className="container mb-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h2 className="section-title:small relative inline-block text-center">
            Get In Touch
            <AnimatedUnderline />
          </h2>
          <p className="section-description:small mx-auto max-w-3xl text-center">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div>
          {/* Contact Form */}
          <div className="border-navy-500 from-navy-800 to-navy-700 rounded-2xl border bg-gradient-to-br p-8 shadow-xl backdrop-blur-sm">
            {/* Email section at top */}
            <div className="border-navy-500 bg-navy-800 mb-8 rounded-xl border p-4 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <div className="from-neon to-neon-4 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gradient-to-r">
                    <Mail className="text-neon-10 h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-navy-200 text-sm font-medium">
                      Direct Email
                    </p>
                    <p className="text-foreground truncate font-mono text-sm font-medium">
                      {email}
                    </p>
                  </div>
                </div>
                <Button
                  onClick={handleCopyEmail}
                  size="icon"
                  variant="ghost"
                  className="hover:bg-navy-700 relative h-9 w-9 flex-shrink-0 transition-all"
                >
                  {isCopied ? (
                    <CheckCircle className="text-neon h-4 w-4" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  {isCopied && (
                    <span className="bg-neon absolute inset-0 animate-ping rounded-full opacity-20" />
                  )}
                </Button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-medium"
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`bg-navy-700/50 w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:outline-none ${
                      errors.name
                        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                        : "border-navy-500 focus:border-neon focus:ring-neon/20"
                    }`}
                    placeholder="Your name"
                  />
                  {errors.name && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{errors.name}</span>
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`bg-navy-700/50 w-full rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:outline-none ${
                      errors.email
                        ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                        : "border-navy-500 focus:border-neon focus:ring-neon/20"
                    }`}
                    placeholder="your.email@example.com"
                  />
                  {errors.email && (
                    <div className="mt-2 flex items-center gap-2 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{errors.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Message Field */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className={`bg-navy-800/70 w-full resize-none rounded-lg border px-4 py-3 transition-all duration-200 focus:ring-2 focus:outline-none ${
                    errors.message
                      ? "border-red-500/50 focus:border-red-500 focus:ring-red-500/20"
                      : "border-navy-500 focus:border-neon focus:ring-neon/20"
                  }`}
                  placeholder="Tell me about your project, question, or just say hello..."
                />
                <div className="mt-2 flex items-center justify-between">
                  {errors.message ? (
                    <div className="flex items-center gap-2 text-sm text-red-400">
                      <AlertCircle className="h-4 w-4 flex-shrink-0" />
                      <span>{errors.message}</span>
                    </div>
                  ) : (
                    <div />
                  )}
                  <span className={`text-xs ${getCharacterCountColor()}`}>
                    {formData.message.length}/{MAX_MESSAGE_LENGTH}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                className="group from-neon to-neon-4 text-background hover:from-neon-4 hover:to-neon hover:shadow-neon-10 relative w-full overflow-hidden bg-gradient-to-r transition-all duration-300 hover:shadow-md"
                disabled={isSubmitting}
              >
                <div className="relative flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      <span>Send Message</span>
                    </>
                  )}
                </div>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
