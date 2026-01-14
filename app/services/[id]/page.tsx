"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { LoadingState } from "@/components/loading-state"
import { api } from "@/lib/api"
import type { Service } from "@/lib/types"

// Helper to get category display label
function getCategoryLabel(category: string): string {
  const labels: Record<string, string> = {
    FOOD: "Food & Nutrition",
    SHELTER: "Shelter & Housing",
    MEDICAL: "Medical Help",
    MENTAL_HEALTH: "Mental Health Support",
    COMMUNITY_NGOS: "Community NGOs",
    RETIREMENT_HOMES: "Retirement Homes",
    OTHER: "Other Services",
  }
  return labels[category] || category
}

export default function ServiceDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const serviceId = params.id as string

  const [service, setService] = useState<Service | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchService = async () => {
      try {
        console.log("[v0] Fetching service details for ID:", serviceId)
        const data = await api.get<Service>(`/api/services/${serviceId}`)
        setService(data)
      } catch (err) {
        console.error("[v0] Error fetching service:", err)
        setError("Failed to load service details. Please try again.")
      } finally {
        setIsLoading(false)
      }
    }

    fetchService()
  }, [serviceId])

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto max-w-4xl px-4 py-8">
            <LoadingState />
          </div>
        </main>
      </>
    )
  }

  if (error || !service) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-background">
          <div className="container mx-auto max-w-4xl px-4 py-8">
            <div className="text-center space-y-4">
              <p className="text-red-600">{error}</p>
              <Button onClick={() => router.back()}>Go Back</Button>
            </div>
          </div>
        </main>
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          {/* Back Button */}
          <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            ← Back
          </Button>

          {/* Service Information */}
          <div className="bg-card border border-border rounded-lg p-8 space-y-6">
            {/* Header */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{service.name}</h1>
              <p className="text-lg text-muted-foreground">{getCategoryLabel(service.category)}</p>
            </div>

            {/* Main Details Grid */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">DISTANCE</h3>
                  <p className="text-lg">{service.distance_km} km away</p>
                </div>

                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">AVAILABILITY</h3>
                  <p
                    className={`text-lg font-semibold ${
                      service.availability === "AVAILABLE"
                        ? "text-green-600"
                        : service.availability === "LIMITED"
                          ? "text-yellow-600"
                          : "text-gray-600"
                    }`}
                  >
                    {service.availability.replace("_", " ")}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-sm text-muted-foreground mb-1">ADDRESS</h3>
                  <p className="text-lg">{service.address}</p>
                </div>

                {service.contact && (
                  <div>
                    <h3 className="font-semibold text-sm text-muted-foreground mb-1">CONTACT</h3>
                    <p className="text-lg">{service.contact}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            {service.description && (
              <div className="pt-4 border-t border-border">
                <h3 className="font-semibold mb-2">About</h3>
                <p className="text-muted-foreground leading-relaxed">{service.description}</p>
              </div>
            )}

            {/* Disclaimer */}
            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-sm text-yellow-800 dark:text-yellow-100">
                <strong>Note:</strong> Service availability may change and should be confirmed directly before visiting.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button onClick={() => router.back()} variant="outline" className="flex-1">
                Back to Results
              </Button>
              <Button onClick={() => router.push("/chat")} className="flex-1">
                Get More Help
              </Button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
