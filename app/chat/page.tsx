"use client"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { ChatMessage } from "@/components/chat-message"
import { LocationPrompt } from "@/components/location-prompt"
import { AgeVerification } from "@/components/age-verification"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { ChatMessage as ChatMessageType, Location, UserAgeInfo } from "@/lib/types"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessageType[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [ageInfo, setAgeInfo] = useState<UserAgeInfo | null>(null)
  const [showAgePrompt, setShowAgePrompt] = useState(true)
  const [showLocationPrompt, setShowLocationPrompt] = useState(false)

  const [location, setLocation] = useState<Location | null>(null)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollToBottom = () => messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  useEffect(scrollToBottom, [messages])

  const handleAgeVerified = (info: UserAgeInfo) => {
    setAgeInfo(info)
    setShowAgePrompt(false)
    setShowLocationPrompt(true)
  }

  const handleLocationSelect = (selectedLocation: Location) => {
    setLocation(selectedLocation)
    setShowLocationPrompt(false)

    setMessages([
      {
        role: "assistant",
        content:
          "Location set! I can help you find **food**, **shelter**, **medical**, or **community** services nearby. What do you need?",
        timestamp: new Date(),
      },
    ])
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim() || !location || !ageInfo) return

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
      const response = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map(({ role, content }) => ({ role, content })),
          latitude: location.latitude,
          longitude: location.longitude,
          age_group: ageInfo.ageCategory,
        }),
      })

      if (!response.ok) throw new Error("Chat request failed")
      const data = await response.json()

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply, timestamp: new Date() },
      ])
    } catch (err) {
      console.error(err)
      setError("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col bg-background">
        <div className="flex flex-col flex-1 container mx-auto max-w-4xl px-4 py-6">

          {/* Title */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">Find nearby resources & services instantly</p>
          </div>

          {/* Age Prompt */}
          {showAgePrompt && (
            <div className="bg-card border border-border rounded-lg p-6 mb-4">
              <h2 className="font-semibold mb-3">Before We Start</h2>
              <AgeVerification onAgeVerified={handleAgeVerified} />
            </div>
          )}

          {/* Location Prompt */}
          {showLocationPrompt && (
            <div className="bg-card border border-border rounded-lg p-6 mb-4">
              <h2 className="font-semibold mb-3">Set Your Location</h2>
              <LocationPrompt onLocationSelect={handleLocationSelect} />
            </div>
          )}

          {/* Chat Messages */}
          {!showAgePrompt && !showLocationPrompt && (
            <div
              className="flex-1 bg-card border border-border rounded-lg p-4 overflow-y-auto"
              style={{ maxHeight: "calc(100vh - 260px)" }}
            >
              {messages.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">
                  <p className="mb-2">How can I help you today?</p>
                  <p className="text-sm">Ask me about nearby food, shelter, or medical services.</p>
                </div>
              )}

              {messages.map((msg, idx) => (
                <ChatMessage key={idx} message={msg} />
              ))}

              {isLoading && (
                <div className="flex gap-2 text-muted-foreground mt-2">
                  <span className="animate-bounce">●</span>
                  <span className="animate-bounce delay-100">●</span>
                  <span className="animate-bounce delay-200">●</span>
                </div>
              )}

              {error && <div className="text-sm text-red-600 mt-2">{error}</div>}

              <div ref={messagesEndRef} />
            </div>
          )}

          {/* Input */}
          {!showAgePrompt && !showLocationPrompt && (
            <div className="flex gap-2 sticky bottom-0 bg-background pt-3 pb-3">
              <Input
                placeholder="Ask something..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={isLoading || !inputValue.trim()}>
                Send
              </Button>
            </div>
          )}

        </div>
      </main>
    </>
  )
}
