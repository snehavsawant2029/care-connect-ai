"use client"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { ChatMessage } from "@/components/chat-message"
import { LocationPrompt } from "@/components/location-prompt"
import { AgeVerification } from "@/components/age-verification"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"
import type { ChatMessage as ChatMessageType, Location, UserAgeInfo } from "@/lib/types"

export default function ChatPage() {
  // Chat state
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [ageInfo, setAgeInfo] = useState<UserAgeInfo | null>(null)
  const [showAgePrompt, setShowAgePrompt] = useState(true)
  const [showLocationPrompt, setShowLocationPrompt] = useState(false)

  // Location state
  const [location, setLocation] = useState<Location | null>(null)

  // Refs for auto-scrolling
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleAgeVerified = (verifiedAgeInfo: UserAgeInfo) => {
    setAgeInfo(verifiedAgeInfo)
    setShowAgePrompt(false)
    setShowLocationPrompt(true)
  }

  const handleLocationSelect = (selectedLocation: Location) => {
    setLocation(selectedLocation)
    setShowLocationPrompt(false)

    // Add a system message
    const systemMessage: ChatMessageType = {
      role: "assistant",
      content:
        "Great! I can now help you find nearby services. I can assist you with finding food, shelter, medical, or community support services. What kind of help are you looking for?",
    }
    setMessages([systemMessage])
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !location) {
      return
    }

    // Add user message
    const userMessage: ChatMessageType = {
      role: "user",
      content: inputValue,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)
    setError(null)

    try {
      // Call the chat API
      const response = await api.post<{ reply: string }>("/api/chat", {
        message: inputValue,
        latitude: location.latitude,
        longitude: location.longitude,
      })

      // Add assistant message
      const assistantMessage: ChatMessageType = {
        role: "assistant",
        content: response.reply,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      console.error("Error sending chat message:", err)
      setError("Failed to send message. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background flex flex-col">
        <div className="flex-1 container mx-auto max-w-4xl px-4 py-8 flex flex-col">
          {/* Page Title */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2">AI Assistant</h1>
            <p className="text-muted-foreground">Get personalized help finding nearby services</p>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col gap-4">
            {showAgePrompt && (
              <div className="bg-card border border-border rounded-lg p-6 mb-4 w-full">
                <h2 className="font-semibold mb-4">Before We Start</h2>
                <AgeVerification onAgeVerified={handleAgeVerified} />
              </div>
            )}

            {showLocationPrompt && (
              <div className="bg-card border border-border rounded-lg p-6 mb-4">
                <h2 className="font-semibold mb-4">Set Your Location</h2>
                <LocationPrompt onLocationSelect={handleLocationSelect} isLoading={isLoading} />
              </div>
            )}

            {/* Messages Container */}
            {!showLocationPrompt && !showAgePrompt && (
              <div className="flex-1 bg-card border border-border rounded-lg p-6 overflow-y-auto min-h-96">
                {/* System Message */}
                {messages.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p className="mb-4">How can I help you today?</p>
                    <p className="text-sm">
                      I can help you find food, shelter, medical, or community support services nearby.
                    </p>
                  </div>
                )}

                {/* Chat Messages */}
                {messages.map((msg, idx) => (
                  <ChatMessage key={idx} message={msg} />
                ))}

                {/* Loading State */}
                {isLoading && (
                  <div className="flex justify-start mb-4">
                    <div className="max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg bg-muted text-muted-foreground">
                      <div className="flex gap-2 items-center">
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Display */}
                {error && (
                  <div className="mb-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-800 dark:text-red-100 rounded text-sm">
                    {error}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>
            )}

            {/* Input Area */}
            {!showLocationPrompt && !showAgePrompt && (
              <div className="flex gap-2">
                <Input
                  placeholder="Ask me anything about nearby services..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  disabled={isLoading}
                />
                <Button size="md" onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
                  Send
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  )
}
