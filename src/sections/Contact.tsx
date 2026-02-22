import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Mail,
  MapPin,
  Github,
  Linkedin,
  Send,
  CheckCircle,
  Loader2,
  Terminal,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'qal@example.com',
    href: 'mailto:qal@example.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Malaysia',
    href: '#',
  },
]

const socialLinks = [
  { icon: Github, label: 'GitHub', href: 'https://github.com' },
  { icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com' },
]

const terminalLines = [
  '> Initializing contact protocol...',
  '> Establishing secure connection...',
  '> Ready to receive your message.',
]

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [terminalText, setTerminalText] = useState('')

  useEffect(() => {
    // Typewriter effect for terminal
    let lineIndex = 0
    let charIndex = 0
    let currentText = ''

    const typeInterval = setInterval(() => {
      if (lineIndex < terminalLines.length) {
        const currentLine = terminalLines[lineIndex]
        if (charIndex < currentLine.length) {
          currentText += currentLine[charIndex]
          setTerminalText(currentText)
          charIndex++
        } else {
          currentText += '\n'
          lineIndex++
          charIndex = 0
        }
      } else {
        clearInterval(typeInterval)
      }
    }, 50)

    return () => clearInterval(typeInterval)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Form entrance
      gsap.fromTo(
        '.contact-form',
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
          },
        }
      )

      // Terminal entrance
      gsap.fromTo(
        '.contact-terminal',
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false)
      setFormState({ name: '', email: '', message: '' })
    }, 3000)
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-[#004C99]/10" />

      <div className="relative z-10 section-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#E6F2FF] text-[#0066CC] mb-4">
              Get In Touch
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Let's <span className="gradient-text">Connect</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or want to collaborate? Feel free to reach out 
              and let's discuss how we can work together.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Left - Terminal Style Info */}
            <div className="contact-terminal space-y-6">
              {/* Terminal Window */}
              <div className="glass-card overflow-hidden">
                {/* Terminal Header */}
                <div className="bg-foreground/5 px-4 py-3 flex items-center gap-2">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">terminal — contact.exe</span>
                </div>
                {/* Terminal Content */}
                <div className="p-6 font-mono text-sm">
                  <pre className="text-foreground whitespace-pre-wrap">
                    {terminalText}
                    <span className="animate-pulse">_</span>
                  </pre>
                </div>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                {contactInfo.map((info) => (
                  <a
                    key={info.label}
                    href={info.href}
                    className="glass-card p-4 flex items-center gap-4 card-hover"
                  >
                    <div className="w-12 h-12 rounded-xl bg-[#0066CC]/10 flex items-center justify-center">
                      <info.icon className="w-5 h-5 text-[#0066CC]" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{info.label}</p>
                      <p className="font-medium text-foreground">{info.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              {/* Social Links */}
              <div>
                <p className="text-sm text-muted-foreground mb-4">Follow me on</p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-[#0066CC] hover:text-white transition-all group"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className="contact-form">
              <div className="glass-card p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Terminal className="w-5 h-5 text-[#0066CC]" />
                  <h3 className="text-xl font-bold text-foreground">Send Message</h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-foreground">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="Your name"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      required
                      className="bg-background/50 border-border focus:border-[#0066CC] focus:ring-[#0066CC]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      required
                      className="bg-background/50 border-border focus:border-[#0066CC] focus:ring-[#0066CC]/20"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      value={formState.message}
                      onChange={(e) =>
                        setFormState({ ...formState, message: e.target.value })
                      }
                      required
                      rows={4}
                      className="bg-background/50 border-border focus:border-[#0066CC] focus:ring-[#0066CC]/20 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting || isSubmitted}
                    className={`w-full btn-primary $ {
                      isSubmitted ? 'bg-green-500 hover:bg-green-600' : ''
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : isSubmitted ? (
                      <>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Message Sent!
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
