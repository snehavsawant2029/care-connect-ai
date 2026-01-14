"use client"

import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Button } from "@/components/ui/button"
import { Heart, Target, Users, Lock, Zap } from "lucide-react"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
        <div className="container mx-auto max-w-4xl px-4 py-8">
          {/* Hero Section */}
          <section className="mb-16">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">About CareConnect AI</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Making it easier for people to find the care and support they need
              </p>
            </div>
          </section>

          {/* Mission Section */}
          <section className="mb-16">
            <div className="bg-card border border-border rounded-xl p-8 mb-8">
              <h2 className="text-3xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Target className="w-8 h-8 text-primary" />
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                CareConnect AI is dedicated to breaking down barriers to accessing essential support services. We
                believe that everyone deserves easy access to information about healthcare, food assistance, housing
                support, education, and community resources in their area. Our platform uses AI to provide personalized
                guidance and help people find the right services based on their unique needs.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <h2 className="text-3xl font-bold mb-4 text-foreground flex items-center gap-2">
                <Heart className="w-8 h-8 text-accent" />
                What We're Solving
              </h2>
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      1
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Information Fragmentation</h3>
                    <p className="text-muted-foreground">
                      Support services are scattered across different agencies and websites. We centralize this
                      information in one place.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      2
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Accessibility Barriers</h3>
                    <p className="text-muted-foreground">
                      Many people struggle to navigate complex systems to find help. Our AI assistant guides users
                      through the process.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      3
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Personalization Gap</h3>
                    <p className="text-muted-foreground">
                      Generic service lists don't account for individual circumstances. We provide AI-powered
                      personalized recommendations.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                      4
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Location Awareness</h3>
                    <p className="text-muted-foreground">
                      Finding nearby services should be simple. Our platform shows services closest to your location.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Core Values Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground text-center">Our Core Values</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4 mx-auto">
                  <Users className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-center">Community First</h3>
                <p className="text-muted-foreground text-center text-sm">
                  We prioritize the needs of the communities we serve and build with them in mind.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 text-accent mb-4 mx-auto">
                  <Lock className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-center">Privacy & Trust</h3>
                <p className="text-muted-foreground text-center text-sm">
                  Your data and privacy are paramount. We maintain the highest security standards.
                </p>
              </div>

              <div className="bg-card border border-border rounded-xl p-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-secondary/10 text-secondary mb-4 mx-auto">
                  <Zap className="w-7 h-7" />
                </div>
                <h3 className="font-bold text-lg mb-2 text-center">Continuous Improvement</h3>
                <p className="text-muted-foreground text-center text-sm">
                  We constantly evolve our platform based on user feedback and emerging needs.
                </p>
              </div>
            </div>
          </section>

          {/* Privacy & Disclaimer Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-foreground">Privacy & Important Disclaimers</h2>

            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-xl p-8 mb-6">
              <h3 className="font-bold text-lg text-blue-900 dark:text-blue-100 mb-4 flex items-center gap-2">
                <Lock className="w-5 h-5" />
                Privacy Practices
              </h3>
              <div className="space-y-3 text-blue-900 dark:text-blue-100 text-sm">
                <p>
                  <strong>Data Collection:</strong> We collect minimal personal data required to provide our services.
                  This includes your location and age category for personalization purposes.
                </p>
                <p>
                  <strong>Data Protection:</strong> All data is encrypted in transit and at rest. We do not share your
                  personal information with third parties without your explicit consent.
                </p>
                <p>
                  <strong>User Rights:</strong> You have the right to access, update, or delete your personal data at
                  any time. Contact us through our Contact page for privacy-related requests.
                </p>
                <p>
                  <strong>Compliance:</strong> We comply with applicable privacy laws and regulations including GDPR and
                  CCPA where applicable.
                </p>
              </div>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-950 border border-yellow-200 dark:border-yellow-800 rounded-xl p-8">
              <h3 className="font-bold text-lg text-yellow-900 dark:text-yellow-100 mb-4">Important Disclaimers</h3>
              <div className="space-y-3 text-yellow-900 dark:text-yellow-100 text-sm">
                <p>
                  <strong>Information Accuracy:</strong> All search results are aggregated from internet sources. While
                  we strive for accuracy, we cannot guarantee the completeness or current status of all services listed.
                  Please verify information directly with the service providers.
                </p>
                <p>
                  <strong>Not a Substitute for Emergency Services:</strong> In life-threatening emergencies, always call
                  911 or your local emergency number immediately. This platform is not intended for emergency response.
                </p>
                <p>
                  <strong>Professional Advice:</strong> Information provided is for informational purposes only and does
                  not constitute medical, legal, or professional advice. Always consult qualified professionals for
                  personalized guidance.
                </p>
                <p>
                  <strong>Service Availability:</strong> Service availability, hours, and eligibility requirements may
                  change. We recommend contacting services directly to confirm current information before visiting.
                </p>
                <p>
                  <strong>Third-Party Services:</strong> CareConnect AI is not responsible for the quality, accuracy, or
                  safety of services provided by third parties listed on our platform.
                </p>
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="text-center py-8">
            <h2 className="text-2xl font-bold mb-4 text-foreground">Ready to Find Help?</h2>
            <p className="text-muted-foreground mb-6">Start exploring services and support in your area.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/discover">
                <Button size="lg" className="bg-primary hover:bg-primary/90">
                  Discover Services
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline">
                  Get in Touch
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  )
}
