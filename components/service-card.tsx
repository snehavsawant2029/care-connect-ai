"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Map, Star, CheckCircle, XCircle, Clock } from "lucide-react"
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
    EDUCATION: "Education & Training",
    FINANCIAL: "Financial Assistance",
    LEGAL: "Legal & Administrative",
    TRANSPORTATION: "Transportation & Mobility",
    EMERGENCY: "Emergency Services",
    OTHER: "Other Services",
  }
  return labels[category] || category
}

export function ServiceCard({ service, hideLocation = false }: ServiceCardProps) {
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
        </div>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-4">
        
        {/* Location */}
        {!hideLocation && (
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2 text-muted-foreground">
              <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-foreground">{service.address}</p>
                {service.distance_km !== undefined && (
                  <p className="text-xs">{service.distance_km} km away</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Rating */}
        {service.rating && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Star className="text-yellow-500 w-4 h-4" />
            <span className="text-foreground font-medium">
              {service.rating.toFixed(1)}
            </span>
            {service.reviews && <span className="text-xs">({service.reviews} reviews)</span>}
          </div>
        )}

        {/* Open Status */}
        {service.open_now !== null && service.open_now !== undefined && (
          <div className="flex items-center gap-2 text-sm">
            {service.open_now ? (
              <>
                <CheckCircle className="text-green-500 w-4 h-4" />
                <span className="text-green-600 dark:text-green-400 text-xs">Open Now</span>
              </>
            ) : (
              <>
                <XCircle className="text-red-500 w-4 h-4" />
                <span className="text-red-600 dark:text-red-400 text-xs">Closed</span>
              </>
            )}
          </div>
        )}

        {/* Phone */}
        {service.phone && (
          <div className="flex items-center gap-2 text-sm">
            <Phone size={16} className="text-accent flex-shrink-0" />
            <a href={`tel:${service.phone}`} className="text-foreground font-medium hover:text-primary transition-colors">
              {service.phone}
            </a>
          </div>
        )}

        {/* Map Button */}
        {service.maps_url && (
          <a href={service.maps_url} target="_blank" rel="noopener noreferrer" className="mt-auto">
            <Button variant="default" className="w-full bg-primary hover:bg-primary/90 gap-2">
              <Map size={18} />
              Get Directions
            </Button>
          </a>
        )}
      </CardContent>
    </Card>
  )
}
