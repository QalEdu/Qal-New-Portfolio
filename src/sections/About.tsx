import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { MapPin, Mail, User, CheckCircle } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { value: 5, suffix: '+', label: 'Projects Completed' },
  { value: 3, suffix: '+', label: 'Competitions Joined' },
  { value: 2, suffix: '+', label: 'Years Experience' },
]

const details = [
  { icon: User, label: 'Name', value: 'Qal' },
  { icon: Mail, label: 'Email', value: 'qal@example.com' },
  { icon: MapPin, label: 'Location', value: 'Malaysia' },
  { icon: CheckCircle, label: 'Availability', value: 'Open to Work' },
]

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section entrance
      gsap.fromTo(
        '.about-card',
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      )

      // Image reveal
      gsap.fromTo(
        '.about-image',
        { clipPath: 'circle(0% at 50% 50%)', opacity: 0 },
        {
          clipPath: 'circle(100% at 50% 50%)',
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )

      // Stats counter animation
      const statElements = statsRef.current?.querySelectorAll('.stat-value')
      statElements?.forEach((el, index) => {
        const targetValue = stats[index].value
        gsap.fromTo(
          el,
          { innerText: 0 },
          {
            innerText: targetValue,
            duration: 2,
            ease: 'power2.out',
            snap: { innerText: 1 },
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
            },
          }
        )
      })

      // Details stagger
      gsap.fromTo(
        '.about-detail',
        { x: -20, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#E6F2FF] text-[#0066CC] mb-4">
              About Me
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get to Know <span className="gradient-text">Qal</span>
            </h2>
          </div>

          {/* Main Content Card */}
          <div className="about-card glass-card overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">
              {/* Left - Image */}
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <div className="about-image absolute inset-0">
                  <img
                    src="/about-profile.jpg"
                    alt="Qal Profile"
                    className="w-full h-full object-cover"
                  />
                  {/* Scanning Line Effect */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div
                      className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0066CC] to-transparent opacity-50"
                      style={{
                        animation: 'scan 3s linear infinite',
                      }}
                    />
                  </div>
                </div>
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-background/20 lg:bg-gradient-to-l" />
              </div>

              {/* Right - Content */}
              <div className="p-8 lg:p-12">
                {/* Bio */}
                <div className="mb-8">
                  <h3 className="text-2xl font-bold text-foreground mb-4">
                    Passionate About Technology & Security
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    A passionate network and cybersecurity student who participates in ITNSA and 
                    WorldSkills competitions, teaches networking basics, and builds innovative IoT 
                    systems like smart room automation. Constantly learning and pushing boundaries 
                    in the tech world.
                  </p>
                </div>

                {/* Details Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {details.map((detail) => (
                    <div
                      key={detail.label}
                      className="about-detail flex items-center gap-3 p-3 rounded-xl bg-foreground/5"
                    >
                      <div className="w-10 h-10 rounded-lg bg-[#0066CC]/10 flex items-center justify-center">
                        <detail.icon className="w-5 h-5 text-[#0066CC]" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{detail.label}</p>
                        <p className="text-sm font-medium text-foreground">{detail.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stats */}
                <div
                  ref={statsRef}
                  className="grid grid-cols-3 gap-4 pt-6 border-t border-border"
                >
                  {stats.map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="text-3xl lg:text-4xl font-bold gradient-text">
                        <span className="stat-value">0</span>
                        {stat.suffix}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scan Animation Keyframes */}
      <style>{`
        @keyframes scan {
          0% { top: 0; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  )
}
