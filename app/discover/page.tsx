"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { LocationPrompt } from "@/components/location-prompt"
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

  const handleLocationSelect = (selectedLocation: Location) => {
    setLocation(selectedLocation)
    setServices([])
    setHasSearched(false)
  }

  const handleCategoryChange = async (category: ServiceCategory) => {
    setSelectedCategory(category)
    if (location) {
      await searchServices(location, category)
    }
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

      if (!res.ok) {
        throw new Error("Failed to fetch services")
      }

      const data = await res.json()

      const mapped: Service[] = data.places.map((p: any, i: number) => ({
        id: String(i),
        name: p.name,
        category,
        address: p.address,
        distance_km: p.distance_km,
        phone: p.phone || null,
        rating: p.rating || null,
        reviews: p.reviews || null,
        open_now: p.open_now,
        maps_url: p.maps_url,
      }))

      setServices(mapped)
    } catch (err: any) {
      console.error(err)
      setError("Unable to load nearby services. Please try again.")
      setServices([])
    } finally {
      setLoading(false)
    }
  }

  const isSearchEnabled = location !== null && selectedCategory !== ""

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto max-w-4xl px-4 py-8">

          {/* Page Title */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2 text-foreground">Discover Services</h1>
            <p className="text-muted-foreground">Find nearby services and support in your area</p>
          </div>

          {/* Search Form */}
          <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-sm">
            <div className="space-y-6">

              {/* Location */}
              <div>
                <h3 className="font-bold mb-3 text-foreground">
                  {location ? "✓ Location Selected" : "Step 1: Select Your Location"}
                </h3>
                {!location ? (
                  <LocationPrompt onLocationSelect={handleLocationSelect} isLoading={loading} />
                ) : (
                  <div className="flex items-center justify-between bg-gradient-to-r from-primary/10 to-primary/5 p-4 rounded-lg border border-primary/20">
                    <span className="text-sm font-medium text-foreground">
                      Location set: {location.city || "Custom location"}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setLocation(null)
                        setServices([])
                        setHasSearched(false)
                      }}
                    >
                      Change
                    </Button>
                  </div>
                )}
              </div>

              {/* Category */}
              <div>
                <h3 className="font-bold mb-3 text-foreground">Step 2: What Help Do You Need?</h3>

                <div className="block md:hidden">
                  <CategoryDropdownMobile
                    value={selectedCategory}
                    onValueChange={handleCategoryChange}
                    disabled={!location}
                  />
                </div>

                <div className="hidden md:block">
                  <CategoryDropdownWithEmergency
                    value={selectedCategory}
                    onValueChange={handleCategoryChange}
                    disabled={!location}
                  />
                </div>
              </div>

              {/* Search Button for mobile */}
              <div className="md:hidden">
                <Button
                  onClick={() => location && selectedCategory && searchServices(location, selectedCategory)}
                  disabled={!isSearchEnabled || loading}
                >
                  {loading ? "Searching..." : "Search"}
                </Button>
              </div>
            </div>
          </div>

          {/* Results */}
          {hasSearched && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">
                Services Found ({services.length})
              </h2>

              {loading && <p className="text-muted-foreground">Loading services...</p>}

              {error && (
                <p className="text-red-600 mb-4">
                  {error}
                </p>
              )}

              {!loading && services.length > 0 && (
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <ServiceCard
                      key={service.id}
                      service={service}
                      hideLocation={selectedCategory === "EMERGENCY"}
                    />
                  ))}
                </div>
              )}

              {!loading && services.length === 0 && (
                <div className="text-center py-8 bg-card rounded-xl border border-border">
                  <p className="text-muted-foreground">No services found nearby.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

/* Dropdown Components */

function CategoryDropdownMobile({...args}) { return <DropdownBase {...args} /> }
function CategoryDropdownWithEmergency({...args}) { return <DropdownBase {...args} /> }

function DropdownBase({
  value,
  onValueChange,
  disabled,
}: {
  value: ServiceCategory | ""
  onValueChange: (value: ServiceCategory) => void
  disabled?: boolean
}) {
  const CATEGORIES: { value: ServiceCategory; label: string }[] = [
    { value: "FOOD", label: "Food & Nutrition" },
    { value: "SHELTER", label: "Shelter & Housing" },
    { value: "MEDICAL", label: "Medical Help" },
    { value: "MENTAL_HEALTH", label: "Mental Health Support" },
    { value: "COMMUNITY_NGOS", label: "Community NGOs" },
    { value: "RETIREMENT_HOMES", label: "Retirement Homes" },
    { value: "EDUCATION", label: "Education & Training" },
    { value: "FINANCIAL", label: "Financial Assistance" },
    { value: "LEGAL", label: "Legal & Administrative" },
    { value: "TRANSPORTATION", label: "Transportation & Mobility" },
    { value: "EMERGENCY", label: "🚨 Emergency" },
  ]

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((c) => (
        <Button
          key={c.value}
          onClick={() => onValueChange(c.value)}
          disabled={disabled}
          variant={value === c.value ? "default" : "outline"}
        >
          {c.label}
        </Button>
      ))}
    </div>
  )
}
