"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Heart, Menu, X } from "lucide-react"
import { useState } from "react"

export function Navbar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const isActive = (path: string) => pathname === path

  return (
    <nav className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link
          href="/"
          className="flex items-center gap-2 font-bold text-lg text-primary hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary text-primary-foreground">
            <Heart size={20} />
          </div>
          <span className="hidden sm:inline">CareConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-1">
          <Link href="/">
            <Button variant={isActive("/") ? "default" : "ghost"} size="sm">
              Home
            </Button>
          </Link>
          <Link href="/discover">
            <Button variant={isActive("/discover") ? "default" : "ghost"} size="sm">
              Discover
            </Button>
          </Link>
          <Link href="/chat">
            <Button variant={isActive("/chat") ? "default" : "ghost"} size="sm">
              Chat
            </Button>
          </Link>
          <Link href="/about">
            <Button variant={isActive("/about") ? "default" : "ghost"} size="sm">
              About
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant={isActive("/contact") ? "default" : "ghost"} size="sm">
              Contact
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 hover:bg-primary/10 rounded-lg transition-colors"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden border-t border-border bg-card">
          <div className="flex flex-col p-2">
            <Link href="/" onClick={() => setIsOpen(false)}>
              <Button variant={isActive("/") ? "default" : "ghost"} size="sm" className="w-full justify-start">
                Home
              </Button>
            </Link>
            <Link href="/discover" onClick={() => setIsOpen(false)}>
              <Button variant={isActive("/discover") ? "default" : "ghost"} size="sm" className="w-full justify-start">
                Discover
              </Button>
            </Link>
            <Link href="/chat" onClick={() => setIsOpen(false)}>
              <Button variant={isActive("/chat") ? "default" : "ghost"} size="sm" className="w-full justify-start">
                Chat
              </Button>
            </Link>
            <Link href="/about" onClick={() => setIsOpen(false)}>
              <Button variant={isActive("/about") ? "default" : "ghost"} size="sm" className="w-full justify-start">
                About
              </Button>
            </Link>
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button variant={isActive("/contact") ? "default" : "ghost"} size="sm" className="w-full justify-start">
                Contact
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
