"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/navbar"
import { Activity, MapPin, MessageSquare, Heart } from "lucide-react"

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-col min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        {/* Hero Section */}
        <section className="flex-1 flex items-center justify-center px-4 py-16 md:py-24">
          <div className="w-full max-w-3xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex md:hidden items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-3">
                    <Heart size={16} />
                    Your care companion
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-pretty text-foreground">CareConnect AI</h1>
                  <p className="text-xl text-muted-foreground text-pretty">
                    Find food, shelter, and community support near you
                  </p>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <div className="flex flex-col sm:flex-row gap-3 w-full">
                    <Link href="/discover" className="flex-1">
                      <Button
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                      >
                        <MapPin size={20} className="mr-2" />
                        Find Services
                      </Button>
                    </Link>
                    <Link href="/chat" className="flex-1">
                      <Button
                        size="lg"
                        className="w-full bg-primary hover:bg-primary/90 shadow-lg hover:shadow-xl transition-all"
                      >
                        <MessageSquare size={20} className="mr-2" />
                        Ask AI
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="hidden md:flex items-center justify-center">
                <img
                  src="/healthcare-professionals-helping-people.jpg"
                  alt="Healthcare assistance"
                  className="rounded-2xl shadow-lg w-full max-w-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 md:py-20 px-4 bg-card/50">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">How It Works</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* Step 1: Location */}
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/30">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  1
                </div>
                <h3 className="font-bold text-lg">Share Your Location</h3>
                <p className="text-muted-foreground">Allow access to your location or enter your city manually</p>
              </div>

              {/* Step 2: Enter Help Type */}
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/30">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  2
                </div>
                <h3 className="font-bold text-lg">Select Help Type</h3>
                <p className="text-muted-foreground">Choose the type of help you need from food to medical support</p>
              </div>

              {/* Step 3: Get Recommendations */}
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/20 border border-primary/30">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                  3
                </div>
                <h3 className="font-bold text-lg">Get Recommendations</h3>
                <p className="text-muted-foreground">Discover nearby services with AI-powered personalized guidance</p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="py-16 md:py-20 px-4">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 md:gap-6">
              <div className="p-4 md:p-6 border border-border rounded-xl hover:shadow-lg hover:border-primary/30 transition-all bg-card">
                <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">Location-Based Discovery</h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      Find services specifically near your current location
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6 border border-border rounded-xl hover:shadow-lg hover:border-primary/30 transition-all bg-card">
                <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-accent/10 text-accent flex-shrink-0">
                    <Activity size={24} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">AI-Assisted Recommendations</h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      Get personalized guidance through our conversational AI
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6 border border-border rounded-xl hover:shadow-lg hover:border-primary/30 transition-all bg-card">
                <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-secondary/10 text-secondary flex-shrink-0">
                    <Heart size={24} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">Easy-to-Use Interface</h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      Accessible design that works for everyone
                    </p>
                  </div>
                </div>
              </div>
              <div className="p-4 md:p-6 border border-border rounded-xl hover:shadow-lg hover:border-primary/30 transition-all bg-card">
                <div className="flex flex-col sm:flex-row items-start gap-3 md:gap-4">
                  <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <MessageSquare size={24} />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-bold text-base md:text-lg mb-1 md:mb-2">Scalable Platform</h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      Built to grow with new data sources and services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Help Section */}
        <section className="py-16 md:py-20 px-4 bg-gradient-to-br from-primary/5 via-transparent to-accent/5">
          <div className="container mx-auto max-w-5xl">
            <h2 className="text-3xl font-bold mb-4 text-center">What Help We Connect You With</h2>
            <p className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
              CareConnect AI helps you find various types of support services available in your area
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Food Assistance */}
              <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center text-white text-xl">
                    🍽️
                  </div>
                  <h3 className="font-bold text-lg">Food Assistance</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Food banks, community meal programs, food pantries, and meal delivery services for those in need
                </p>
              </div>

              {/* Healthcare */}
              <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-11 rounded-lg bg-gradient-to-br from-red-400 to-red-600 flex items-center justify-center text-white text-xl">
                    🏥
                  </div>
                  <h3 className="font-bold text-lg">Healthcare Services</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Clinics, medical centers, dental care, mental health support, and telehealth services
                </p>
              </div>

              {/* Housing & Shelter */}
              <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-xl">
                    🏠
                  </div>
                  <h3 className="font-bold text-lg">Housing & Shelter</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Shelters, affordable housing programs, homelessness prevention, and transitional housing
                </p>
              </div>

              {/* Education & Training */}
              <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-white text-xl">
                    📚
                  </div>
                  <h3 className="font-bold text-lg">Education & Training</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Job training programs, skill development courses, literacy classes, and educational support
                </p>
              </div>

              {/* Financial Assistance */}
              <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center text-white text-xl">
                    💰
                  </div>
                  <h3 className="font-bold text-lg">Financial Assistance</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Emergency funds, bill payment assistance, credit counseling, and financial planning services
                </p>
              </div>

              {/* Community Support */}
              <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-white text-xl">
                    👥
                  </div>
                  <h3 className="font-bold text-lg">Community Support</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Social groups, mentorship programs, support networks, community centers, and recreational activities
                </p>
              </div>

              {/* Legal & Administrative */}
              <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-white text-xl">
                    ⚖️
                  </div>
                  <h3 className="font-bold text-lg">Legal & Administrative</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Legal aid, document assistance, immigration support, and bureaucratic guidance services
                </p>
              </div>

              {/* Mental Health & Wellness */}
              <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center text-white text-xl">
                    🧘
                  </div>
                  <h3 className="font-bold text-lg">Mental Health & Wellness</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Counseling, therapy, wellness programs, addiction recovery, and mental health resources
                </p>
              </div>

              {/* Transportation & Mobility */}
              <div className="group p-6 rounded-xl border border-border bg-card hover:shadow-lg hover:border-primary/50 transition-all hover:scale-105">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center text-white text-xl">
                    🚌
                  </div>
                  <h3 className="font-bold text-lg">Transportation & Mobility</h3>
                </div>
                <p className="text-muted-foreground text-sm">
                  Public transit assistance, ride programs, car repair services, and mobility support
                </p>
              </div>
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center">
              <p className="text-lg text-muted-foreground mb-6">Ready to find the help you need?</p>
              <Link href="/discover" className="inline-block">
                <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:shadow-lg">
                  <MapPin size={18} className="mr-2" />
                  Start Exploring Services
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-auto border-t border-border bg-card/50 py-8 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-4">
              <div className="text-center sm:text-left">
                <p className="text-foreground font-semibold mb-1">CareConnect AI</p>
                <p className="text-muted-foreground text-sm">Helping you find the support you need</p>
              </div>
              <Link href="https://paypal.me/" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="sm" className="bg-primary/10 hover:bg-primary/20">
                  Support Our Mission
                </Button>
              </Link>
            </div>
            <div className="border-t border-border pt-4 text-center text-muted-foreground text-xs">
              <p>
                Disclaimer: All search results are aggregated from internet sources. We do not guarantee the accuracy,
                availability, or current status of services listed.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </>
  )
}
