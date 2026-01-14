// Utility functions for age categorization and validation

import type { AgeCategory } from "./types"

/**
 * Determines the age category based on the user's age
 */
export function getAgeCategory(age: number): AgeCategory {
  if (age >= 0 && age <= 3) return "0-3"
  if (age >= 4 && age <= 9) return "4-9"
  if (age >= 10 && age <= 12) return "10-12"
  if (age >= 13 && age <= 17) return "13-17"
  return "18+"
}

/**
 * Checks if the user needs guardian verification
 */
export function needsGuardianVerification(age: number): boolean {
  return age < 18
}

/**
 * Gets age-appropriate service recommendations
 */
export function getAgeCategoryDescription(category: AgeCategory): string {
  const descriptions: Record<AgeCategory, string> = {
    "0-3": "Baby and toddler care services",
    "4-9": "Child care and school-age services",
    "10-12": "Pre-teen services and support",
    "13-17": "Teen support services and peer groups",
    "18+": "Adult services and resources",
  }
  return descriptions[category]
}

/**
 * Validates age input
 */
export function isValidAge(age: number): boolean {
  return age >= 0 && age <= 120
}
