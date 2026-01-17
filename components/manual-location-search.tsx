"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

export function ManualLocationSearch({ onSelect }: { onSelect: (loc: any) => void }) {
  const [query, setQuery] = useState("")
  const [predictions, setPredictions] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  const handleSearch = (val: string) => {
    setQuery(val)

    if (typeof window === "undefined" || !window.google?.maps) return

    if (!val.trim()) {
      setPredictions([])
      return
    }

    const autocomplete = new window.google.maps.places.AutocompleteService()

    autocomplete.getPlacePredictions(
      {
        input: val,
        types: ["geocode"], // 🌍 GLOBAL
      },
      (res) => setPredictions(res || [])
    )
  }

  const handleSelect = (placeId: string) => {
    if (typeof window === "undefined" || !window.google?.maps) return

    setLoading(true)
    const service = new window.google.maps.places.PlacesService(document.createElement("div"))

    service.getDetails(
      {
        placeId,
        fields: ["geometry"], // we only need lat/lng
      },
      (detail) => {
        const loc = detail?.geometry?.location
        if (!loc) return

        onSelect({
          latitude: loc.lat(),
          longitude: loc.lng(),
        })

        setLoading(false)
      }
    )
  }

  return (
    <div className="space-y-3">
      <Input
        placeholder="Search a city, region, or address (global)"
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />

      {predictions.length > 0 && (
        <div className="border rounded-lg divide-y max-h-60 overflow-y-auto">
          {predictions.map((p) => (
            <button
              key={p.place_id}
              onClick={() => handleSelect(p.place_id)}
              className="p-2 text-left w-full hover:bg-muted"
            >
              {p.description}
            </button>
          ))}
        </div>
      )}

      {loading && <p className="text-xs text-muted-foreground">Loading...</p>}
    </div>
  )
}
