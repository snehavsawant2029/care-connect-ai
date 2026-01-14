"use client"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { LocationPrompt } from "@/components/location-prompt"
import { ServiceCard } from "@/components/service-card"
import { Button } from "@/components/ui/button"
import type { Location, Service, ServiceCategory } from "@/lib/types"

const DUMMY_SERVICES: Service[] = [
  {
    id: "1",
    name: "City Food Bank",
    category: "FOOD",
    address: "123 Main Street, Downtown",
    distance_km: 2.3,
    availability: "AVAILABLE",
    phone: "(555) 123-4567",
    email: "info@cityfoodbank.org",
  },
  {
    id: "2",
    name: "Hope Shelter",
    category: "SHELTER",
    address: "456 Oak Avenue, Riverside",
    distance_km: 3.8,
    availability: "AVAILABLE",
    phone: "(555) 234-5678",
    email: "help@hopeshelter.org",
  },
  {
    id: "3",
    name: "Community Health Center",
    category: "MEDICAL",
    address: "789 Health Plaza, Midtown",
    distance_km: 1.5,
    availability: "LIMITED",
    phone: "(555) 345-6789",
    email: "services@commhealth.org",
  },
  {
    id: "4",
    name: "Mental Wellness Hub",
    category: "MENTAL_HEALTH",
    address: "321 Peace Lane, Westside",
    distance_km: 4.2,
    availability: "AVAILABLE",
    phone: "(555) 456-7890",
    email: "support@mentalwellness.org",
  },
]

export default function DiscoverPage() {
  const [location, setLocation] = useState<Location | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory | "">("")
  const [services, setServices] = useState<Service[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleLocationSelect = (selectedLocation: Location) => {
    setLocation(selectedLocation)
  }

  const handleCategoryChange = (category: ServiceCategory) => {
    setSelectedCategory(category)
    if (location) {
      const filtered = DUMMY_SERVICES.filter((service) => service.category === category)
      setServices(filtered.length > 0 ? filtered : DUMMY_SERVICES.slice(0, 2))
      setHasSearched(true)
    }
  }

  const handleSearchServices = () => {
    if (!location || !selectedCategory) {
      return
    }

    const filtered = DUMMY_SERVICES.filter((service) => service.category === selectedCategory)
    setServices(filtered.length > 0 ? filtered : DUMMY_SERVICES.slice(0, 2))
    setHasSearched(true)
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
              {/* Location Section */}
              <div>
                <h3 className="font-bold mb-3 text-foreground">
                  {location ? "✓ Location Selected" : "Step 1: Select Your Location"}
                </h3>
                {!location ? (
                  <LocationPrompt onLocationSelect={handleLocationSelect} isLoading={false} />
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

              {/* Category Selection */}
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
            </div>
          </div>

          {/* Results Section */}
          {hasSearched && (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Services Found ({services.length})</h2>
              {services.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-6">
                  {services.map((service) => (
                    <ServiceCard key={service.id} service={service} hideLocation={selectedCategory === "EMERGENCY"} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 bg-card rounded-xl border border-border">
                  <p className="text-muted-foreground">No services found. Try adjusting your search criteria.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  )
}

function CategoryDropdownMobile({
  value,
  onValueChange,
  disabled,
}: {
  value: ServiceCategory | ""
  onValueChange: (value: ServiceCategory | "EMERGENCY") => void
  disabled?: boolean
}) {
  const CATEGORIES: { value: ServiceCategory | "EMERGENCY"; label: string }[] = [
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
    <select
      value={value}
      onChange={(e) => onValueChange(e.target.value as ServiceCategory | "EMERGENCY")}
      disabled={disabled}
      className="w-full px-4 py-2 border border-border rounded-lg bg-card text-foreground disabled:opacity-50"
    >
      <option value="">Select a category...</option>
      {CATEGORIES.map((category) => (
        <option key={category.value} value={category.value}>
          {category.label}
        </option>
      ))}
    </select>
  )
}

function CategoryDropdownWithEmergency({
  value,
  onValueChange,
  disabled,
}: {
  value: ServiceCategory | ""
  onValueChange: (value: ServiceCategory | "EMERGENCY") => void
  disabled?: boolean
}) {
  const CATEGORIES: { value: ServiceCategory | "EMERGENCY"; label: string }[] = [
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
      {CATEGORIES.map((category) => (
        <Button
          key={category.value}
          onClick={() => onValueChange(category.value)}
          disabled={disabled}
          variant={value === category.value ? "default" : "outline"}
          className={`${
            value === category.value
              ? category.value === "EMERGENCY"
                ? "bg-orange-500 hover:bg-orange-600 border-orange-500"
                : "bg-orange-500 hover:bg-orange-600 border-orange-500"
              : "bg-card hover:bg-orange-100 border-border text-foreground"
          }`}
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}
