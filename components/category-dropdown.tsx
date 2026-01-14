"use client"

import { Button } from "@/components/ui/button"
import type { ServiceCategory } from "@/lib/types"

interface CategoryButtonsProps {
  value: ServiceCategory | ""
  onValueChange: (value: ServiceCategory) => void
  disabled?: boolean
}

const CATEGORIES: { value: ServiceCategory; label: string }[] = [
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
]

export function CategoryDropdown({ value, onValueChange, disabled }: CategoryButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3">
      {CATEGORIES.map((category) => (
        <Button
          key={category.value}
          onClick={() => onValueChange(category.value)}
          disabled={disabled}
          variant={value === category.value ? "default" : "outline"}
          className={`${
            value === category.value ? "bg-primary hover:bg-primary/90" : "bg-card hover:bg-primary/10 border-border"
          }`}
        >
          {category.label}
        </Button>
      ))}
    </div>
  )
}
