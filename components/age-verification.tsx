"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { getAgeCategory } from "@/lib/age-utils"
import type { UserAgeInfo } from "@/lib/types"

interface AgeVerificationProps {
  onAgeVerified: (ageInfo: UserAgeInfo) => void
}

interface AgeOption {
  ageRange: string
  category: string
  description: string
}

const AGE_OPTIONS: AgeOption[] = [
  { ageRange: "0-3", category: "BABY_CARE", description: "Baby care" },
  { ageRange: "4-9", category: "CHILD_SERVICES", description: "Child services" },
  { ageRange: "10-12", category: "PRETEEN", description: "Pre-teen" },
  { ageRange: "13-17", category: "TEEN_SUPPORT", description: "Teen support" },
  { ageRange: "18+", category: "ADULT_SERVICES", description: "Adult services" },
]

export function AgeVerification({ onAgeVerified }: AgeVerificationProps) {
  const [selectedAge, setSelectedAge] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleAgeSelect = (option: AgeOption) => {
    setSelectedAge(option.ageRange)
    setError(null)

    let age: number
    if (option.ageRange === "18+") {
      age = 18
    } else {
      const [min] = option.ageRange.split("-").map(Number)
      age = min
    }

    const ageCategory = getAgeCategory(age)
    onAgeVerified({ age, ageCategory })
  }

  return (
    <div className="w-full space-y-4">
      <div className="space-y-2">
        <p className="text-base font-medium text-foreground">Select Your Age Category</p>
        <p className="text-sm text-muted-foreground">
          We use your age to provide relevant services and support tailored to your needs.
        </p>
      </div>

      {error && (
        <div className="flex items-start gap-2 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        {AGE_OPTIONS.map((option) => (
          <Button
            key={option.ageRange}
            onClick={() => handleAgeSelect(option)}
            variant={selectedAge === option.ageRange ? "default" : "outline"}
            size="lg"
            className={`transition-all px-6 py-3 min-w-fit font-semibold text-base ${
              selectedAge === option.ageRange
                ? "bg-green-600 hover:bg-green-700 text-white"
                : "bg-card hover:bg-orange-400 border-border text-foreground"
            }`}
          >
            <span>{option.ageRange}</span>
          </Button>
        ))}
      </div>
    </div>
  )
}
