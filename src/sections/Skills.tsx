import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  Network, 
  Shield, 
  Cpu, 
  Router, 
  Server, 
  Lock,
  Target,
  ShieldCheck,
  Microchip,
  Thermometer,
  Home
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const skillCategories = [
  {
    title: 'Networking',
    icon: Network,
    color: '#0066CC',
    skills: [
      { name: 'Cisco Routing', level: 85, icon: Router },
      { name: 'Switch Configuration', level: 80, icon: Server },
      { name: 'Subnetting', level: 90, icon: Network },
      { name: 'Packet Tracer', level: 95, icon: Target },
    ],
  },
  {
    title: 'Cybersecurity',
    icon: Shield,
    color: '#10B981',
    skills: [
      { name: 'Network Security', level: 75, icon: Lock },
      { name: 'Basic Penetration Testing', level: 70, icon: Target },
      { name: 'Threat Awareness', level: 80, icon: Shield },
      { name: 'Firewall Configuration', level: 65, icon: ShieldCheck },
    ],
  },
  {
    title: 'Hardware/IoT',
    icon: Cpu,
    color: '#F59E0B',
    skills: [
      { name: 'ESP32 Development', level: 88, icon: Microchip },
      { name: 'Sensor Integration', level: 85, icon: Thermometer },
      { name: 'Smart Automation', level: 82, icon: Home },
      { name: 'Circuit Design', level: 70, icon: Cpu },
    ],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards flip in animation
      gsap.fromTo(
        '.skill-card',
        { rotateX: 90, opacity: 0 },
        {
          rotateX: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )

      // Progress bars animation
      const progressBars = sectionRef.current?.querySelectorAll('.progress-fill')
      progressBars?.forEach((bar) => {
        const level = (bar as HTMLElement).dataset.level
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${level}%`,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: bar,
              start: 'top 85%',
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#0066CC]/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#E6F2FF] text-[#0066CC] mb-4">
              My Expertise
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Skills & <span className="gradient-text">Technologies</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A comprehensive set of skills in networking, cybersecurity, and IoT development 
              gained through competitions, projects, and continuous learning.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid lg:grid-cols-3 gap-8 perspective-1000">
            {skillCategories.map((category) => (
              <div
                key={category.title}
                className="skill-card glass-card p-6 lg:p-8 card-hover animate-border-glow"
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Card Header */}
                <div className="flex items-center gap-4 mb-8">
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${category.color}15` }}
                  >
                    <category.icon
                      className="w-7 h-7"
                      style={{ color: category.color }}
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {category.skills.length} skills
                    </p>
                  </div>
                </div>

                {/* Skills List */}
                <div className="space-y-6">
                  {category.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <skill.icon className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium text-foreground">
                            {skill.name}
                          </span>
                        </div>
                        <span className="text-sm font-semibold" style={{ color: category.color }}>
                          {skill.level}%
                        </span>
                      </div>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          data-level={skill.level}
                          style={{
                            background: `linear-gradient(90deg, ${category.color}, ${category.color}88)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
