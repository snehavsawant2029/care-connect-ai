// Type definitions for CareConnect AI

export interface Location {
  latitude: number
  longitude: number
}

export type ServiceCategory =
  | "FOOD"
  | "SHELTER"
  | "MEDICAL"
  | "MENTAL_HEALTH"
  | "COMMUNITY_NGOS"
  | "RETIREMENT_HOMES"
  | "OTHER"

export type ServiceAvailability = "AVAILABLE" | "LIMITED" | "UNKNOWN"

export type AgeCategory = "0-3" | "4-9" | "10-12" | "13-17" | "18+"

export interface UserAgeInfo {
  age: number
  ageCategory: AgeCategory
  hasGuardian?: boolean // Only applicable for users under 18
}
// </CHANGE>

export interface Service {
  id: string
  name: string
  category: ServiceCategory
  distance_km: number
  availability: ServiceAvailability
  address: string
  contact?: string
  description?: string
}

export interface ChatMessage {
  role: "user" | "assistant"
  content: string
  timestamp?: Date
}

export interface DiscoverParams {
  category: ServiceCategory
  latitude: number
  longitude: number
  radius_km?: number
}
