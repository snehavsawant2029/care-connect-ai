"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MessageSquare, ExternalLink } from "lucide-react"
import Link from "next/link"

interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      setSubmitMessage({
        type: "error",
        text: "Please fill in all fields",
      })
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate form submission (replace with actual API call)
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitMessage({
          type: "success",
          text: "Thank you! Your message has been sent successfully. We'll get back to you soon.",
        })
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        setSubmitMessage({
          type: "error",
          text: "Failed to send message. Please try again or contact us directly.",
        })
      }
    } catch (error) {
      setSubmitMessage({
        type: "error",
        text: "An error occurred. Please try again later or contact us directly.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          {/* Header */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">Get in Touch</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                We'd love to hear from you. Send us your questions, feedback, or inquiries.
              </p>
            </div>
          </section>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Contact Methods */}
            <div className="md:col-span-1">
              <h2 className="text-2xl font-bold mb-6 text-foreground">Connect With Us</h2>

              {/* Email */}
              <div className="mb-6 p-6 bg-card border border-border rounded-xl hover:shadow-lg transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                    <Mail className="w-5 h-5" />
                  </div>
                  <h3 className="font-semibold text-foreground">Email</h3>
                </div>
                <a href="mailto:contact@careconnectai.com" className="text-primary hover:underline text-sm break-all">
                  contact@careconnectai.com
                </a>
              </div>

              {/* Social Media */}
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Follow Us</h3>
                <div className="space-y-3">
                  {/* Twitter/X */}
                  <a
                    href="https://x.com/careconnectai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:bg-primary/10 hover:border-primary/30 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.694L2.658 21.75H.37l7.73-8.835L.516 2.25h6.635l4.622 6.122L18.244 2.25zM17.474 19.589h1.829L6.368 3.862H4.41l13.064 15.727z" />
                    </svg>
                    <div>
                      <p className="font-medium text-sm">X (Twitter)</p>
                      <p className="text-xs text-muted-foreground">@careconnectai</p>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
                  </a>

                  {/* Instagram */}
                  <a
                    href="https://instagram.com/careconnectai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:bg-pink-50 dark:hover:bg-pink-950 hover:border-pink-300 dark:hover:border-pink-700 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <rect
                        x="2"
                        y="2"
                        width="20"
                        height="20"
                        rx="5"
                        ry="5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      />
                      <path d="M12 7a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM17.5 6.5h.01" fill="currentColor" />
                    </svg>
                    <div>
                      <p className="font-medium text-sm">Instagram</p>
                      <p className="text-xs text-muted-foreground">@careconnectai</p>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
                  </a>

                  {/* YouTube */}
                  <a
                    href="https://youtube.com/careconnectai"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-card border border-border rounded-lg hover:bg-red-50 dark:hover:bg-red-950 hover:border-red-300 dark:hover:border-red-700 transition-all"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                    </svg>
                    <div>
                      <p className="font-medium text-sm">YouTube</p>
                      <p className="text-xs text-muted-foreground">@careconnectai</p>
                    </div>
                    <ExternalLink className="w-4 h-4 ml-auto text-muted-foreground" />
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-card border border-border rounded-xl p-8">
                <h2 className="text-2xl font-bold mb-6 text-foreground flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-primary" />
                  Send us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name */}
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm font-medium text-foreground">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm font-medium text-foreground">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Subject */}
                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-foreground">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      type="text"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={6}
                      required
                    />
                  </div>

                  {/* Submit Message */}
                  {submitMessage && (
                    <div
                      className={`p-4 rounded-lg text-sm ${
                        submitMessage.type === "success"
                          ? "bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 text-green-800 dark:text-green-100"
                          : "bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-100"
                      }`}
                    >
                      {submitMessage.text}
                    </div>
                  )}

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
