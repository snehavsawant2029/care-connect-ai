"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { ManualLocationSearch } from "@/components/manual-location-search"
import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import type { Location, Service, ServiceCategory } from "@/lib/types"

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL

export default function DiscoverPage() {
  const [location, setLocation] = useState<Location | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "">("")
  const [services, setServices] = useState<Service[]>([])
  const [hasSearched, setHasSearched] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

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
        setLocation({ ...data, latitude, longitude })
        setServices([])
        setHasSearched(false)
      },
      () => alert("Unable to fetch location. Enable GPS.")
    )
  }

  const searchServices = async (loc: Location, category: ServiceCategory) => {
    setLoading(true)
    setHasSearched(true)
    setError(null)

    try {
      const res = await fetch(`${API_BASE}/api/discover`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          latitude: loc.latitude,
          longitude: loc.longitude,
        }),
      })

      const data = await res.json()

      setServices(data.places.map((p: any, i:number) => ({
        id: String(i),
        name: p.name,
        category,
        address: p.address,
        distance_km: p.distance_km,
        phone: p.phone,
        rating: p.rating,
        reviews: p.reviews,
        open_now: p.open_now,
        maps_url: p.maps_url,
      })))
    } catch {
      setError("Unable to load services")
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  const ready = location && selectedCategory !== ""

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto max-w-4xl px-4 py-8">

          <h1 className="text-3xl font-bold mb-2">Discover Services</h1>
          <p className="text-muted-foreground mb-6">Find support near you</p>

          <div className="bg-card border rounded-xl p-6 mb-8 space-y-6">

            {!location && (
              <div className="space-y-4">
                <h3 className="font-bold">Step 1: Select your location</h3>

                <ManualLocationSearch onSelect={setLocation} />

                <div className="flex items-center gap-2">
                  <div className="flex-grow border-t border-border" />
                  <span className="text-xs text-muted-foreground">or</span>
                  <div className="flex-grow border-t border-border" />
                </div>

                <div className="flex justify-center">
                  <Button
                    variant="default"
                    onClick={useMyLocation}
                    className="w-auto h-11 font-medium px-6 shadow-sm"
                  >
                    📍 Use My Location
                  </Button>
                </div>
              </div>
            )}

            {location && (
              <div className="flex items-center justify-between p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <span className="font-medium">
                  📍 {location.city || location.full_address || "Custom location"}
                </span>
                <Button variant="outline" size="sm" onClick={() => {
                  setLocation(null)
                  setServices([])
                  setHasSearched(false)
                }}>
                  Change
                </Button>
              </div>
            )}

            <div>
              <h3 className="font-bold mb-2">Step 2: What do you need?</h3>
              <div className="flex flex-wrap gap-2">
                {[
                  "FOOD","SHELTER","MEDICAL","MENTAL_HEALTH","COMMUNITY_NGOS","RETIREMENT_HOMES",
                  "EDUCATION","FINANCIAL","LEGAL","TRANSPORTATION","EMERGENCY"
                ].map((c) => (
                  <Button
                    key={c}
                    variant={selectedCategory === c ? "default" : "outline"}
                    disabled={!location}
                    onClick={() => {
                      setSelectedCategory(c as ServiceCategory)
                      if (location) searchServices(location, c as ServiceCategory)
                    }}
                  >
                    {c.replace("_"," ")}
                  </Button>
                ))}
              </div>
            </div>

          </div>

          {hasSearched && (
            <>
              <h2 className="text-2xl font-semibold mb-3">Services Found ({services.length})</h2>
              {loading && <p className="text-muted-foreground">Loading...</p>}
              {error && <p className="text-red-600 mb-3">{error}</p>}

              {!loading && services.length === 0 && (
                <div className="text-center p-8 bg-card border rounded-lg text-muted-foreground">
                  No services found nearby.
                </div>
              )}

              {!loading && services.length > 0 && (
                <div className="grid md:grid-cols-2 gap-4">
                  {services.map((s) => (
                    <ServiceCard key={s.id} service={s} hideLocation={selectedCategory === "EMERGENCY"} />
                  ))}
                </div>
              )}
            </>
          )}

        </div>
      </main>
    </>
  )
}
