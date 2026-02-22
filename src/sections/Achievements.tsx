import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Trophy,
  Award,
  Shield,
  Network,
  GraduationCap,
  Cpu,
  Calendar,
  ChevronRight,
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const achievements = [
  {
    title: 'ITNSA Competition Participant',
    description:
      'Participated in the IT Network Systems Administration competition, demonstrating expertise in network configuration, system administration, and troubleshooting.',
    year: '2024',
    icon: Trophy,
    color: '#0066CC',
    highlight: true,
  },
  {
    title: 'WorldSkills Malaysia Competitor',
    description:
      'Represented Malaysia in the WorldSkills competition, showcasing advanced networking and cybersecurity skills on an international platform.',
    year: '2023',
    icon: Award,
    color: '#F59E0B',
    highlight: true,
  },
  {
    title: 'Cybersecurity Student Specialist',
    description:
      'Recognized for exceptional skills in cybersecurity fundamentals, threat analysis, and security implementation.',
    year: '2023',
    icon: Shield,
    color: '#10B981',
    highlight: false,
  },
  {
    title: 'Networking Competition Participant',
    description:
      'Competed in various networking competitions, mastering Cisco technologies, routing protocols, and network design.',
    year: '2022',
    icon: Network,
    color: '#8B5CF6',
    highlight: false,
  },
  {
    title: 'Cisco Packet Tracer Training Experience',
    description:
      'Completed advanced training in Cisco Packet Tracer, creating complex network simulations and training materials.',
    year: '2022',
    icon: GraduationCap,
    color: '#0066CC',
    highlight: false,
  },
  {
    title: 'IoT Smart Room Project Developer',
    description:
      'Developed an innovative IoT smart room system featuring NFC authentication, environmental monitoring, and automated controls.',
    year: '2023',
    icon: Cpu,
    color: '#EC4899',
    highlight: true,
  },
]

export default function Achievements() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const cardsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline line animation
      gsap.fromTo(
        '.timeline-progress',
        { height: '0%' },
        {
          height: '100%',
          duration: 1.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
          },
        }
      )

      // Achievement cards animation
      gsap.fromTo(
        '.achievement-card',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 70%',
          },
        }
      )

      // 3D tilt effect on hover
      const cards = document.querySelectorAll('.achievement-card-inner')
      cards.forEach((card) => {
        card.addEventListener('mousemove', (e: Event) => {
          const mouseEvent = e as MouseEvent
          const rect = (card as HTMLElement).getBoundingClientRect()
          const x = mouseEvent.clientX - rect.left
          const y = mouseEvent.clientY - rect.top
          const centerX = rect.width / 2
          const centerY = rect.height / 2
          const rotateX = (y - centerY) / 10
          const rotateY = (centerX - x) / 10

          gsap.to(card, {
            rotateX: rotateX,
            rotateY: rotateY,
            duration: 0.3,
            ease: 'power2.out',
          })
        })

        card.addEventListener('mouseleave', () => {
          gsap.to(card, {
            rotateX: 0,
            rotateY: 0,
            duration: 0.5,
            ease: 'power2.out',
          })
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="achievements"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#0066CC]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-[#3399FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#E6F2FF] text-[#0066CC] mb-4">
              Track Record
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Achievements & <span className="gradient-text">Recognition</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A journey of continuous growth through competitions, certifications, 
              and innovative projects in networking and cybersecurity.
            </p>
          </div>

          {/* Timeline */}
          <div ref={cardsRef} className="relative">
            {/* Timeline Line */}
            <div className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 top-0 bottom-0 w-0.5 bg-border">
              <div className="timeline-progress absolute top-0 left-0 w-full bg-gradient-to-b from-[#0066CC] to-[#3399FF]" />
            </div>

            {/* Achievement Cards */}
            <div className="space-y-8 lg:space-y-12">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.title}
                  className={`achievement-card relative flex items-start gap-6 lg:gap-0 ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-6 lg:left-1/2 lg:-translate-x-1/2 z-10">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-4 border-background transition-all duration-300 ${
                        achievement.highlight ? 'animate-pulse-glow' : ''
                      }`}
                      style={{ backgroundColor: achievement.color }}
                    >
                      <achievement.icon className="w-5 h-5 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className={`ml-20 lg:ml-0 lg:w-5/12 ${
                      index % 2 === 0 ? 'lg:pr-12 lg:text-right' : 'lg:pl-12'
                    }`}
                  >
                    <div
                      className="achievement-card-inner glass-card p-6 card-hover perspective-1000"
                      style={{ transformStyle: 'preserve-3d' }}
                    >
                      {/* Year Badge */}
                      <div
                        className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-3 ${
                          index % 2 === 0 ? 'lg:ml-auto' : ''
                        }`}
                        style={{
                          backgroundColor: `${achievement.color}15`,
                          color: achievement.color,
                        }}
                      >
                        <Calendar className="w-4 h-4" />
                        {achievement.year}
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        {achievement.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4">
                        {achievement.description}
                      </p>

                      {/* Read More */}
                      <button
                        className={`inline-flex items-center gap-1 text-sm font-medium transition-colors hover:gap-2`}
                        style={{ color: achievement.color }}
                      >
                        Learn More
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Empty Space for Other Side */}
                  <div className="hidden lg:block lg:w-5/12" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
