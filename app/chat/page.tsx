"use client"

import { useState, useRef, useEffect } from "react"
import { Navbar } from "@/components/navbar"
import { ChatMessage } from "@/components/chat-message"
import { ManualLocationSearch } from "@/components/manual-location-search"
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

  const handleLocationSelect = (loc: Location) => {
    setLocation(loc)
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

  const useMyLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords

        const res = await fetch(`${API_BASE}/api/reverse_geocode`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ latitude, longitude }),
        })

        const data = await res.json()
        handleLocationSelect({ ...data, latitude, longitude })
      },
      () => alert("Unable to fetch location. Please enable GPS.")
    )
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
      const res = await fetch(`${API_BASE}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: messages.concat(userMessage).map(({ role, content }) => ({ role, content })),
          latitude: location.latitude,
          longitude: location.longitude,
          age_group: ageInfo.ageCategory,
        }),
      })

      const data = await res.json()

      setMessages((prev) => [...prev, {
        role: "assistant",
        content: data.reply,
        timestamp: new Date()
      }])
    } catch {
      setError("Something went wrong. Try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col bg-background">
        <div className="container mx-auto max-w-4xl flex-1 px-4 py-6">

          {/* Header */}
          <div className="mb-4">
            <h1 className="text-3xl font-bold">AI Assistant</h1>
            <p className="text-muted-foreground">Find nearby support & services instantly</p>
          </div>

          {/* Age */}
          {showAgePrompt && (
            <div className="bg-card border rounded-lg p-6 mb-4">
              <h2 className="font-semibold mb-3">Before we start</h2>
              <AgeVerification onAgeVerified={handleAgeVerified} />
            </div>
          )}

          {/* Location */}
          {showLocationPrompt && (
            <div className="bg-card border rounded-lg p-6 mb-4 space-y-4">
              <h2 className="font-semibold">Set your location</h2>

              <ManualLocationSearch onSelect={handleLocationSelect} />

              <div className="flex items-center gap-2">
                <div className="flex-grow border-t border-border" />
                <span className="text-xs text-muted-foreground">or</span>
                <div className="flex-grow border-t border-border" />
              </div>

              <div className="flex justify-center">
                <Button
                  variant="default"
                  onClick={useMyLocation}
                  className="w-full md:w-auto h-11 font-medium px-6 shadow-sm"
                >
                  📍 Use My Location
                </Button>
              </div>
            </div>
          )}

          {/* Chat */}
          {!showAgePrompt && !showLocationPrompt && (
            <>
              <div className="flex-1 bg-card border rounded-lg p-4 overflow-y-auto mb-3"
                style={{ maxHeight: "calc(100vh - 260px)" }}>
                {messages.map((msg, i) => <ChatMessage key={i} message={msg} />)}
                {isLoading && <div className="text-muted-foreground animate-pulse mt-2">Typing...</div>}
                {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
                <div ref={messagesEndRef} />
              </div>

              <div className="sticky bottom-0 bg-background pb-3 pt-2">
                <div className="flex gap-2 bg-card border rounded-xl p-3 shadow-sm">
                  <Input
                    placeholder="Ask something..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                  />
                  <Button onClick={handleSendMessage} disabled={!inputValue.trim()}>
                    Send
                  </Button>
                </div>
              </div>
            </>
          )}

        </div>
      </main>
    </>
  )
}
