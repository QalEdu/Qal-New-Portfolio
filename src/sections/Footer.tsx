import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react'

const quickLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
]

const socialLinks = [
  { icon: Github, href: 'https://github.com', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:qal@example.com', label: 'Email' },
]

export default function Footer() {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer className="relative py-16 overflow-hidden">
      {/* Background Watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="text-[20rem] font-bold text-foreground/[0.02] select-none">
          Qal
        </span>
      </div>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background to-transparent" />

      <div className="relative z-10 section-padding">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0066CC] to-[#3399FF] flex items-center justify-center text-white font-bold text-xl shadow-lg">
                  Q
                </div>
                <span className="font-bold text-2xl text-foreground">Qal</span>
              </div>
              <p className="text-muted-foreground max-w-md mb-6">
                Network & Cybersecurity Specialist passionate about building secure 
                systems and sharing knowledge through competitions and innovative projects.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-foreground/5 flex items-center justify-center text-muted-foreground hover:bg-[#0066CC] hover:text-white transition-all"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link.href)}
                      className="text-muted-foreground hover:text-[#0066CC] transition-colors"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-semibold text-foreground mb-4">Contact</h4>
              <ul className="space-y-3 text-muted-foreground">
                <li>qal@example.com</li>
                <li>Malaysia</li>
                <li className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Available for work
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              {/* Copyright */}
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                © {new Date().getFullYear()} Qal. Made with
                <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                All rights reserved.
              </p>

              {/* Back to Top */}
              <button
                onClick={scrollToTop}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-[#0066CC] transition-colors group"
              >
                Back to top
                <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center group-hover:bg-[#0066CC] group-hover:text-white transition-all">
                  <ArrowUp className="w-4 h-4" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
