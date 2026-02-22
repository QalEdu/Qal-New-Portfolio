import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github, Cpu, Network, Shield } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'Sense-Plugin Smart Room System',
    description:
      'An IoT smart room prototype using ESP32, NFC authentication, DHT22 temperature monitoring, OLED display, and automated AC & plug control. Features real-time monitoring and smart automation.',
    image: '/project-smart-room.jpg',
    tags: ['IoT', 'ESP32', 'NFC', 'Automation'],
    categories: ['IoT', 'Networking', 'Cybersecurity'],
    link: '#',
    github: '#',
    featured: true,
  },
  {
    title: 'Network Security Audit Tool',
    description:
      'A comprehensive security audit tool for network vulnerability assessment. Includes port scanning, threat detection, and detailed reporting features.',
    image: '/project-security.jpg',
    tags: ['Security', 'Python', 'Networking'],
    categories: ['Cybersecurity', 'Networking'],
    link: '#',
    github: '#',
    featured: false,
  },
  {
    title: 'Cisco Packet Tracer Labs',
    description:
      'Collection of advanced networking labs created for educational purposes. Includes VLAN configuration, OSPF routing, and network troubleshooting scenarios.',
    image: '/project-network.jpg',
    tags: ['Cisco', 'Networking', 'Education'],
    categories: ['Networking'],
    link: '#',
    github: '#',
    featured: false,
  },
]

const categoryIcons: Record<string, React.ElementType> = {
  IoT: Cpu,
  Networking: Network,
  Cybersecurity: Shield,
}

const categoryColors: Record<string, string> = {
  IoT: '#F59E0B',
  Networking: '#0066CC',
  Cybersecurity: '#10B981',
}

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Project cards animation
      gsap.fromTo(
        '.project-card',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      <div className="section-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#E6F2FF] text-[#0066CC] mb-4">
              Portfolio
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Featured <span className="gradient-text">Projects</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Showcasing innovative projects in IoT, networking, and cybersecurity 
              developed through competitions and personal learning.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.title}
                className={`project-card group relative ${
                  project.featured ? 'lg:col-span-2 xl:col-span-1' : ''
                }`}
              >
                <div className="glass-card overflow-hidden h-full card-hover">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                    
                    {/* Category Badges */}
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {project.categories.map((cat) => {
                        const Icon = categoryIcons[cat]
                        return (
                          <span
                            key={cat}
                            className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-black/50 backdrop-blur-sm text-white"
                          >
                            <Icon className="w-3 h-3" style={{ color: categoryColors[cat] }} />
                            {cat}
                          </span>
                        )
                      })}
                    </div>

                    {/* Featured Badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#0066CC] text-white">
                          Featured
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-[#0066CC] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md text-xs font-medium bg-foreground/5 text-foreground/70"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-3 pt-4 border-t border-border">
                      <a
                        href={project.link}
                        className="flex items-center gap-2 text-sm font-medium text-[#0066CC] hover:underline"
                      >
                        <ExternalLink className="w-4 h-4" />
                        View Project
                      </a>
                      <a
                        href={project.github}
                        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <Github className="w-4 h-4" />
                        Source
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
