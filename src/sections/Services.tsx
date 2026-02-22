import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Network,
  Shield,
  Wrench,
  GraduationCap,
  ArrowRight,
  Check,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    title: 'Network Setup & Design',
    description:
      'Professional network architecture design, implementation, and optimization for homes and small businesses.',
    icon: Network,
    color: '#0066CC',
    features: [
      'Network Architecture Design',
      'Router & Switch Configuration',
      'VLAN Implementation',
      'Network Troubleshooting',
    ],
  },
  {
    title: 'Cybersecurity Consultation',
    description:
      'Comprehensive security assessments and recommendations to protect your digital infrastructure.',
    icon: Shield,
    color: '#10B981',
    features: [
      'Security Audits',
      'Vulnerability Assessment',
      'Firewall Configuration',
      'Security Best Practices',
    ],
  },
  {
    title: 'PC Repair & Custom Builds',
    description:
      'Expert PC repair services and custom PC building tailored to your specific needs and budget.',
    icon: Wrench,
    color: '#F59E0B',
    features: [
      'Hardware Diagnostics',
      'Component Upgrades',
      'Custom PC Building',
      'System Optimization',
    ],
  },
  {
    title: 'IT Training & Teaching',
    description:
      'Personalized training sessions on networking basics, Cisco Packet Tracer, and IT fundamentals.',
    icon: GraduationCap,
    color: '#8B5CF6',
    features: [
      'Packet Tracer Training',
      'Networking Fundamentals',
      'CCNA Preparation',
      'One-on-One Tutoring',
    ],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Service cards orbit-in animation
      gsap.fromTo(
        '.service-card',
        { rotate: -15, opacity: 0, scale: 0.9 },
        {
          rotate: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )

      // SVG stroke animation on hover is handled by CSS
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-t from-[#0066CC]/5 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#E6F2FF] text-[#0066CC] mb-4">
              What I Offer
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              My <span className="gradient-text">Services</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional services tailored to meet your networking, cybersecurity, 
              and IT needs with expertise and dedication.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="service-card group relative"
              >
                <div className="glass-card p-8 h-full card-hover overflow-hidden">
                  {/* Background Glow */}
                  <div
                    className="absolute -top-20 -right-20 w-40 h-40 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur-2xl"
                    style={{ backgroundColor: service.color }}
                  />

                  {/* Icon */}
                  <div
                    className="relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${service.color}15` }}
                  >
                    <service.icon
                      className="w-8 h-8 transition-colors duration-300"
                      style={{ color: service.color }}
                    />
                    
                    {/* SVG Stroke Animation on Hover */}
                    <svg
                      className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity"
                      viewBox="0 0 64 64"
                    >
                      <rect
                        x="2"
                        y="2"
                        width="60"
                        height="60"
                        rx="14"
                        fill="none"
                        stroke={service.color}
                        strokeWidth="2"
                        strokeDasharray="240"
                        strokeDashoffset="240"
                        className="group-hover:animate-draw"
                      />
                    </svg>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-[#0066CC] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-center gap-2 text-sm text-foreground/80"
                      >
                        <Check
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: service.color }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    className="inline-flex items-center gap-2 text-sm font-medium transition-all group-hover:gap-3"
                    style={{ color: service.color }}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SVG Draw Animation */}
      <style>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        .group-hover\\:animate-draw {
          animation: draw 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  )
}
