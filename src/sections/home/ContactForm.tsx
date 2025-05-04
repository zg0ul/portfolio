"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, CheckCircle, Send, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Socials from "@/components/Socials";

interface FormData {
  name: string;
  email: string;
  message: string;
}

const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const email = "zg0ul.contact@gmail.com";

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully!");
        // Reset form after successful submission
        setFormData({ name: "", email: "", message: "" });
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.log("Error sending message:", error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setIsCopied(true);
    toast.success("Email copied to clipboard!");

    // Reset the copied state after animation
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-16 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Get In Touch</h2>
          <p className="mx-auto max-w-2xl text-lg text-gray-400">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </div>

        <div className="grid items-start gap-10 md:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/40 to-gray-800/40 p-8 shadow-xl backdrop-blur-sm">
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="focus:ring-primary focus:border-primary w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3"
                  placeholder="Your name"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="focus:ring-primary focus:border-primary w-full rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3"
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="focus:ring-primary focus:border-primary w-full resize-none rounded-lg border border-gray-700 bg-gray-800/50 px-4 py-3"
                  placeholder="Your message..."
                />
              </div>

              <Button
                type="submit"
                className="bg-primary hover:bg-primary/80 flex w-full items-center justify-center gap-2"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/40 to-gray-800/40 p-8 shadow-xl backdrop-blur-sm">
              <h3 className="mb-4 text-xl font-semibold">
                Contact Information
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="mb-1 text-sm font-medium text-gray-400">
                    Email
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="font-mono">{email}</p>
                    <Button
                      onClick={copyEmail}
                      size="icon"
                      variant="ghost"
                      className="relative h-8 w-8 transition-all"
                    >
                      {isCopied ? (
                        <CheckCircle className="animate-in fade-in h-4 w-4 text-green-500" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="sr-only">Copy email</span>

                      {/* Copy success animation */}
                      {isCopied && (
                        <span className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-20" />
                      )}
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="mb-1 text-sm font-medium text-gray-400">
                    Location
                  </p>
                  <p>Amman, Jordan</p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-700/50 bg-gradient-to-br from-gray-900/40 to-gray-800/40 p-8 shadow-xl backdrop-blur-sm">
              <h3 className="mb-4 text-xl font-semibold">Let&apos;s Connect</h3>
              <p className="mb-4 text-gray-400">
                Follow me on social media or check out my other profiles to see
                more of my work.
              </p>
              <div className="flex justify-center">
                <Socials />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
