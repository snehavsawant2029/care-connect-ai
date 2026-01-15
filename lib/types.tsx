// ============================
// Type definitions for ConnectCare AI
// ============================

// Location
export interface Location {
  latitude: number
  longitude: number
  city?: string | null
  state?: string | null
  country?: string | null
}

// Categories supported
export type ServiceCategory =
  | "FOOD"
  | "SHELTER"
  | "MEDICAL"
  | "MENTAL_HEALTH"
  | "COMMUNITY_NGOS"
  | "RETIREMENT_HOMES"
  | "EDUCATION"
  | "FINANCIAL"
  | "LEGAL"
  | "TRANSPORTATION"
  | "EMERGENCY"
  | "OTHER"

// Age categories for chat safety
export type AgeCategory = "0-3" | "4-9" | "10-12" | "13-17" | "18+"

// Age info from UI
export interface UserAgeInfo {
  age: number
  ageCategory: AgeCategory
  hasGuardian?: boolean // For minors if applicable
}

// Chat message structure including context
export interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp?: Date
}

// Discover API param shape
export interface DiscoverParams {
  category: ServiceCategory
  latitude: number
  longitude: number
  radius_km?: number
}

// Final normalized service type for frontend rendering
export interface Service {
  id: string
  name: string
  category: ServiceCategory
  address: string
  distance_km: number

  // Optional enhanced metadata
  phone?: string | null
  rating?: number | null
  reviews?: number | null
  open_now?: boolean | null

  // Direct Google Maps directions link
  maps_url?: string | null
}
