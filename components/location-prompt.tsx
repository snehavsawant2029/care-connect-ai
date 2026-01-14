"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { getLocationFromBrowser } from "@/lib/location"
import type { Location } from "@/lib/types"

interface LocationPromptProps {
  onLocationSelect: (location: Location) => void
  isLoading?: boolean
}

export function LocationPrompt({ onLocationSelect, isLoading }: LocationPromptProps) {
  const [isLoadingLocation, setIsLoadingLocation] = useState(false)

  const handleBrowserLocation = async () => {
    setIsLoadingLocation(true)
    try {
      const location = await getLocationFromBrowser()
      if (location) {
        onLocationSelect(location)
      } else {
        alert("Unable to get your location. Please enable location services.")
      }
    } finally {
      setIsLoadingLocation(false)
    }
  }

  return (
    <div className="w-full space-y-4">
      <div className="text-center space-y-3">
        <p className="text-sm text-muted-foreground">We need your location to find nearby services</p>

        <Button onClick={handleBrowserLocation} disabled={isLoading || isLoadingLocation} className="w-full">
          {isLoadingLocation ? "Getting location..." : "Use My Location"}
        </Button>
      </div>
    </div>
  )
}
