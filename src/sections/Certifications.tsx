import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Award,
  BadgeCheck,
  FileBadge,
  Star,
  Trophy,
  Medal,
  Shield,
  Network,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const certifications = [
  {
    name: 'Cisco CCNA',
    issuer: 'Cisco',
    icon: Network,
    color: '#0066CC',
  },
  {
    name: 'CompTIA Security+',
    issuer: 'CompTIA',
    icon: Shield,
    color: '#10B981',
  },
  {
    name: 'Wireshark Certified',
    issuer: 'Wireshark',
    icon: Network,
    color: '#8B5CF6',
  },
  {
    name: 'ITNSA Participant',
    issuer: 'WorldSkills',
    icon: Trophy,
    color: '#F59E0B',
  },
  {
    name: 'WorldSkills Competitor',
    issuer: 'WorldSkills Malaysia',
    icon: Medal,
    color: '#EC4899',
  },
  {
    name: 'Cisco Packet Tracer',
    issuer: 'Cisco Networking Academy',
    icon: FileBadge,
    color: '#0066CC',
  },
  {
    name: 'Network Security Fundamentals',
    issuer: 'Cisco',
    icon: Shield,
    color: '#10B981',
  },
  {
    name: 'IoT Fundamentals',
    issuer: 'Various',
    icon: Award,
    color: '#F59E0B',
  },
]

// Duplicate for seamless loop
const row1 = [...certifications, ...certifications]
const row2 = [...certifications.slice().reverse(), ...certifications.slice().reverse()]

export default function Certifications() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance
      gsap.fromTo(
        '.certifications-header',
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="certifications"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0066CC]/5 to-transparent" />
      </div>

      <div className="relative z-10">
        {/* Section Header */}
        <div className="certifications-header text-center mb-16 section-padding">
          <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#E6F2FF] text-[#0066CC] mb-4">
            Credentials
          </span>
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Certifications & <span className="gradient-text">Awards</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Professional certifications and competition achievements that validate 
            expertise in networking and cybersecurity.
          </p>
        </div>

        {/* Marquee Container */}
        <div className="marquee-container space-y-6">
          {/* Row 1 - Left */}
          <div className="relative">
            <div className="marquee-left flex gap-6 whitespace-nowrap">
              {row1.map((cert, index) => (
                <div
                  key={`row1-${index}`}
                  className="flex-shrink-0 glass-card px-6 py-4 flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${cert.color}15` }}
                  >
                    <cert.icon
                      className="w-6 h-6"
                      style={{ color: cert.color }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{cert.name}</p>
                      <BadgeCheck className="w-4 h-4 text-[#0066CC]" />
                    </div>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Row 2 - Right */}
          <div className="relative">
            <div className="marquee-right flex gap-6 whitespace-nowrap">
              {row2.map((cert, index) => (
                <div
                  key={`row2-${index}`}
                  className="flex-shrink-0 glass-card px-6 py-4 flex items-center gap-4 hover:scale-105 transition-transform cursor-pointer"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${cert.color}15` }}
                  >
                    <cert.icon
                      className="w-6 h-6"
                      style={{ color: cert.color }}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{cert.name}</p>
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    </div>
                    <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Featured Certs Grid - Desktop */}
        <div className="section-padding mt-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {certifications.slice(0, 4).map((cert) => (
                <div
                  key={cert.name}
                  className="glass-card p-4 text-center card-hover"
                >
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-3"
                    style={{ backgroundColor: `${cert.color}15` }}
                  >
                    <cert.icon
                      className="w-7 h-7"
                      style={{ color: cert.color }}
                    />
                  </div>
                  <p className="font-semibold text-foreground text-sm">{cert.name}</p>
                  <p className="text-xs text-muted-foreground">{cert.issuer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
