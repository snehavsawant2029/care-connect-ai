"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, CheckCircle, AlertCircle, Map } from "lucide-react"
import type { Service } from "@/lib/types"

interface ServiceCardProps {
  service: Service
  hideLocation?: boolean
}

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

export function ServiceCard({ service, hideLocation = false }: ServiceCardProps) {
  const isAvailable = service.availability === "AVAILABLE"

  const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(service.address)}`

  return (
    <Card className="flex flex-col h-full border-border hover:shadow-lg hover:border-primary/30 transition-all">
      <CardHeader className="pb-3 bg-gradient-to-br from-primary/5 to-transparent">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-foreground">{service.name}</CardTitle>
            <CardDescription className="text-accent font-medium mt-1">
              {getCategoryLabel(service.category)}
            </CardDescription>
          </div>
          {isAvailable ? (
            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
          ) : (
            <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
          )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-4">
        <div className="space-y-3 text-sm">
          {!hideLocation && (
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{service.address}</p>
                <p className="text-xs">{service.distance_km} km away</p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 text-muted-foreground">
            <Phone size={18} className="text-accent flex-shrink-0" />
            <a
              href={`tel:${service.phone}`}
              className="font-medium text-foreground hover:text-primary transition-colors"
            >
              {service.phone}
            </a>
          </div>

          <div
            className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${
              isAvailable
                ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
            }`}
          >
            {service.availability === "AVAILABLE" ? "Available Now" : "Limited Availability"}
          </div>
        </div>
        <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-auto">
          <Button variant="default" className="w-full bg-primary hover:bg-primary/90 gap-2">
            <Map size={18} />
            View on Maps
          </Button>
        </a>
      </CardContent>
    </Card>
  )
}
