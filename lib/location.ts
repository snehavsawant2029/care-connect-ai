// Utility functions for geolocation handling

import type { Location } from "./types"

/**
 * Requests browser geolocation permission and returns coordinates
 * @returns Promise resolving to Location object or null if permission denied
 */
export async function getLocationFromBrowser(): Promise<Location | null> {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      console.error("[v0] Geolocation not supported")
      resolve(null)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => {
        console.error("[v0] Geolocation error:", error)
        resolve(null)
      },
    )
  })
}

/**
 * Calculates approximate distance between two coordinates
 * Uses simple Haversine formula for realistic distance
 */
export function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2)

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}
