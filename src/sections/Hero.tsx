import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ArrowDown, Shield, Network, Cpu, Trophy, Award } from 'lucide-react'

const tags = [
  { name: 'Cybersecurity', icon: Shield },
  { name: 'Networking', icon: Network },
  { name: 'IoT Developer', icon: Cpu },
  { name: 'WorldSkills Participant', icon: Trophy },
  { name: 'ITNSA Competitor', icon: Award },
]

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLHeadingElement>(null)
  const [displayName, setDisplayName] = useState('')
  const finalName = 'Qal'

  useEffect(() => {
    // Decoder effect for name
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let iteration = 0
    const maxIterations = 15

    const interval = setInterval(() => {
      setDisplayName(
        finalName
          .split('')
          .map((_, index) => {
            if (index < iteration / 3) {
              return finalName[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join('')
      )

      iteration += 1

      if (iteration >= maxIterations) {
        clearInterval(interval)
        setDisplayName(finalName)
      }
    }, 80)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(
        '.hero-title',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 0.4 }
      )

      // Subtitle animation
      gsap.fromTo(
        '.hero-subtitle',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out', delay: 0.6 }
      )

      // Tags animation
      gsap.fromTo(
        '.hero-tag',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.4,
          stagger: 0.08,
          ease: 'back.out(1.7)',
          delay: 0.8,
        }
      )

      // Buttons animation
      gsap.fromTo(
        '.hero-btn',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out', delay: 1 }
      )

      // Hero image animation
      gsap.fromTo(
        '.hero-image',
        { rotateY: 45, z: -500, opacity: 0 },
        { rotateY: 0, z: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.3 }
      )

      // Floating animation for image
      gsap.to('.hero-image', {
        y: -10,
        duration: 2,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      })
    }, heroRef)

    return () => ctx.revert()
  }, [])

  const handleScrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleScrollToContact = () => {
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* Background Grid Effect */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 102, 204, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 102, 204, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#0066CC]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#3399FF]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="order-2 lg:order-1 text-center lg:text-left">
              {/* Greeting */}
              <p className="hero-subtitle text-lg text-[#0066CC] font-medium mb-2">
                Hello, I'm
              </p>

              {/* Name with Decoder Effect */}
              <h1
                ref={nameRef}
                className="hero-title text-6xl sm:text-7xl lg:text-8xl font-bold mb-4 gradient-text"
              >
                {displayName || finalName}
              </h1>

              {/* Title */}
              <h2 className="hero-title text-2xl sm:text-3xl lg:text-4xl font-semibold text-foreground mb-4">
                Network & Cybersecurity Specialist
              </h2>

              {/* Subtitle */}
              <p className="hero-subtitle text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0">
                Network Student | Cybersecurity Enthusiast | ITNSA & WorldSkills Competitor
              </p>

              {/* Tags */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-3 mb-10">
                {tags.map((tag) => (
                  <span
                    key={tag.name}
                    className="hero-tag badge-tech flex items-center gap-2"
                  >
                    <tag.icon className="w-4 h-4" />
                    {tag.name}
                  </span>
                ))}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={handleScrollToProjects}
                  className="hero-btn btn-primary flex items-center justify-center gap-2"
                >
                  View My Projects
                  <ArrowDown className="w-4 h-4" />
                </button>
                <button
                  onClick={handleScrollToContact}
                  className="hero-btn btn-secondary"
                >
                  Contact Me
                </button>
              </div>
            </div>

            {/* Right Content - Hero Image */}
            <div className="order-1 lg:order-2 perspective-1000">
              <div className="hero-image relative preserve-3d">
                {/* Glow Effect Behind Image */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#0066CC]/30 to-[#3399FF]/30 rounded-3xl blur-2xl transform scale-110" />
                
                {/* Main Image Card */}
                <div className="relative glass-card overflow-hidden">
                  <img
                    src="/hero-logo.jpg"
                    alt="Qal Brand Logo"
                    className="w-full h-auto object-cover"
                  />
                  
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0066CC]/20 to-transparent" />
                </div>

                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 glass-card px-4 py-3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066CC] to-[#3399FF] flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Cybersecurity</p>
                      <p className="text-xs text-muted-foreground">Specialist</p>
                    </div>
                  </div>
                </div>

                {/* Another Floating Badge */}
                <div
                  className="absolute -top-4 -right-4 glass-card px-4 py-3 animate-float"
                  style={{ animationDelay: '1s' }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">WorldSkills</p>
                      <p className="text-xs text-muted-foreground">Competitor</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}
