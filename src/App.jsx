import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Sun, ArrowUpRight, Phone, Mail, MapPin, Menu, X,
  ChevronRight, Zap, Building2, Home, Factory, Warehouse,
  ArrowDown, CheckCircle2, Clock, Award, Shield, Users,
  TrendingUp, Calendar, FileText, Sparkles
} from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

// =======================
// NAVBAR COMPONENT
// =======================
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Solutions', href: '#solutions' },
    { label: 'How We Work', href: '#process' },
    { label: 'Projects', href: '#projects' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ${
      scrolled ? 'w-[calc(100%-2rem)] max-w-5xl' : 'w-[calc(100%-2rem)] max-w-6xl'
    }`}>
      <div className={`rounded-full px-6 py-3 transition-all duration-300 ${
        scrolled ? 'glass shadow-xl' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-3">
            <img src="/logo.png" alt="Sumeru Solution" className="w-10 h-10 rounded-xl object-cover" />
            <span className={`font-display font-bold text-lg ${scrolled ? 'text-ink' : 'text-white'}`}>Sumeru Solution</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className={`font-body text-sm ${scrolled ? 'text-ink/70' : 'text-white/70'} hover:text-primary transition-colors`}>
                {link.label}
              </a>
            ))}
            <a href="#contact" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-semibold text-sm shadow-lg shadow-primary/30">
              Free Site Survey <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className={`lg:hidden p-2 ${scrolled ? 'text-ink' : 'text-white'}`}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 top-20 bg-deep/95 backdrop-blur-2xl lg:hidden z-40">
          <div className="flex flex-col items-center gap-8 pt-12">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display text-2xl text-white"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-full font-semibold">
              Free Site Survey <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}
    </nav>
  )
}

// =======================
// COUNTUP COMPONENT
// =======================
function CountUp({ end, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const hasStarted = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted.current) {
          hasStarted.current = true
          const startTime = performance.now()
          const animate = (currentTime) => {
            const elapsed = currentTime - startTime
            const progress = Math.min(elapsed / duration, 1)
            const easeOut = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(easeOut * end))
            if (progress < 1) requestAnimationFrame(animate)
          }
          requestAnimationFrame(animate)
        }
      },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [end, duration])

  return <span ref={ref}>{count}{suffix}</span>
}

// =======================
// HERO COMPONENT
// =======================
function Hero() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-line-1', { y: 40, opacity: 0, duration: 1, delay: 0.3, ease: 'power3.out' })
      gsap.from('.hero-line-2', { y: 40, opacity: 0, duration: 1, delay: 0.5, ease: 'power3.out' })
      gsap.from('.hero-cta', { y: 24, opacity: 0, duration: 0.8, delay: 0.8, ease: 'power3.out' })
      gsap.from('.hero-stats', { y: 30, opacity: 0, duration: 0.8, delay: 1.2, ease: 'power3.out' })
    }, ref)
    return () => ctx.revert()
  }, [])

  const stats = [
    { value: '3000+', label: 'kW Installed' },
    { value: 'Since 2022', label: 'Established' },
    { value: 'End-to-end', label: 'Survey to O&M' },
    { value: 'PM-Surya Ghar', label: 'Subsidy Support' },
  ]

  return (
    <section id="home" ref={ref} className="relative min-h-[100dvh] overflow-hidden">
      {/* Background Image - Rooftop Solar */}
      <img
        src="https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80"
        alt="Rooftop solar panels"
        className="absolute inset-0 h-full w-full object-cover brightness-[0.45]"
      />
      <div className="absolute inset-0 bg-gradient-to-br from-deep/80 via-deep/40 to-deep/70" />
      <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-deep to-transparent" />

      {/* Floating solar particles */}
      <div className="absolute top-32 right-10 z-10 hidden lg:block">
        <div className="animate-float" style={{ animationDelay: '0s' }}>
          <div className="w-3 h-3 rounded-full bg-primary/60 blur-sm" />
        </div>
        <div className="animate-float mt-4" style={{ animationDelay: '1s' }}>
          <div className="w-2 h-2 rounded-full bg-primary/40 blur-sm" />
        </div>
        <div className="animate-float mt-4" style={{ animationDelay: '2s' }}>
          <div className="w-4 h-4 rounded-full bg-primary/50 blur-sm" />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-40 pb-20 min-h-[100dvh] flex flex-col justify-end">
        <p className="hero-line-1 font-mono text-xs uppercase tracking-[0.2em] text-white/60 mb-6">
          Gujarat Solar EPC · Channel Partner — PM Surya Gujarat
        </p>
        <h1 className="hero-line-2 font-serif text-5xl sm:text-6xl lg:text-7xl font-semibold text-white tracking-tight leading-[1.1] max-w-4xl">
          We make going <span className="italic text-primary">solar simple.</span>
        </h1>
        <p className="hero-cta mt-8 max-w-xl text-white/70 text-base sm:text-lg leading-relaxed font-body">
          From your first site survey to long-term maintenance, Sumeru Solution helps homes, apartments, and businesses across Gujarat switch to clean solar power—with clear guidance on subsidies.
        </p>
        <div className="hero-cta mt-10 flex flex-wrap gap-4">
          <a href="#contact" className="magnetic-btn inline-flex items-center gap-2 bg-primary text-white px-7 py-3.5 rounded-full font-semibold shadow-lg shadow-primary/30">
            Book a free site survey <ArrowUpRight className="h-4 w-4" />
          </a>
          <a href="#projects" className="magnetic-btn inline-flex items-center gap-2 glass-dark text-white px-7 py-3.5 rounded-full font-semibold border border-white/15">
            See our work
          </a>
        </div>

        {/* Stats */}
        <div className="hero-stats grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 pt-8 border-t border-white/10">
          {stats.map((stat, i) => (
            <div key={i} className="text-white">
              <p className="font-display text-2xl lg:text-3xl font-bold text-primary">{stat.value}</p>
              <p className="text-white/60 text-sm mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =======================
// WHO WE ARE SECTION
// =======================
function WhoWeAre() {
  return (
    <section id="about" className="py-16 lg:py-20 bg-surface border-b border-divider">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Content */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-primary" />
              <span className="text-primary text-xs font-bold tracking-[0.15em] uppercase">Who We Are</span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl text-ink leading-tight mb-6">
              Your preferred solar <em className="italic text-primary">partner in Gujarat</em>
            </h2>
            <div className="space-y-5">
              <p className="text-muted text-[15.5px] leading-relaxed">
                <strong className="text-ink">Sumeru Solution</strong> is a <strong className="text-ink">solar EPC company</strong> based in Vadodara, built by engineers and business professionals with deep experience in rooftop solar.
              </p>
              <p className="text-muted text-[15.5px] leading-relaxed">
                We design, install, and support systems for <strong className="text-ink">homes, apartment societies, and commercial &amp; industrial buildings</strong> across Gujarat.
              </p>
              <p className="text-muted text-[15.5px] leading-relaxed">
                Proud channel partner <strong className="text-ink">PM-Surya Ghar: Muft Bijli Yojana</strong>.
              </p>
            </div>
            <p className="font-serif italic text-xl text-ink mt-8">"Indeed, energy matters."</p>
          </div>

          {/* Right Features */}
          <div className="lg:col-span-5">
            <div className="border-t border-divider">
              <div className="py-6 border-b border-divider">
                <span className="text-primary text-xs font-bold mb-2 block">01</span>
                <h3 className="text-base font-bold text-ink mb-2">Long-term partnership</h3>
                <p className="text-muted text-sm leading-relaxed">We focus on relationships, reliable quality, and solutions that fit your site—not one-size-fits-all sales.</p>
              </div>
              <div className="py-6 border-b border-divider">
                <span className="text-primary text-xs font-bold mb-2 block">02</span>
                <h3 className="text-base font-bold text-ink mb-2">Technical &amp; business expertise</h3>
                <p className="text-muted text-sm leading-relaxed">Qualified engineers and graduates who understand both your roof and your return on investment.</p>
              </div>
              <div className="py-6 border-b border-divider">
                <span className="text-primary text-xs font-bold mb-2 block">03</span>
                <h3 className="text-base font-bold text-ink mb-2">Full project ownership</h3>
                <p className="text-muted text-sm leading-relaxed">One team from feasibility and design to commissioning and after-sales O&amp;M support.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// =======================
// SOLUTIONS GRID
// =======================
function Solutions() {
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.solution-card', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const solutions = [
    { icon: Home, label: 'Residential Rooftop', desc: 'Solar systems for individual homes and villas', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&q=80' },
    { icon: Building2, label: 'Commercial & Industrial', desc: 'Large-scale solar for offices and factories', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80' },
    { icon: Zap, label: 'CAPEX', desc: 'Own your plant - buy solar system upfront', img: 'https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?w=600&q=80' },
    { icon: TrendingUp, label: 'OPEX / RESCO', desc: 'Pay per unit - lease your roof to solar developer', img: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&q=80' },
    { icon: Warehouse, label: 'Ground-mounted & Farms', desc: 'Utility-scale solar for open spaces', img: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80' },
  ]

  return (
    <section id="solutions" ref={ref} className="py-24 lg:py-32 bg-deep">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <h2 className="font-display text-4xl lg:text-5xl font-bold text-white tracking-tight text-center mb-16">
          Our <span className="font-serif italic text-primary">Solutions</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {solutions.map((sol, i) => (
            <div key={i} className="solution-card group relative bg-deep p-8 sm:p-10 min-h-[320px] flex flex-col justify-end overflow-hidden">
              {/* Image overlay */}
              <img src={sol.img} alt={sol.label} className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-20 transition-opacity duration-500" />

              <div className="relative z-10">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <sol.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="font-mono text-xs text-primary uppercase tracking-wider mb-2">{sol.label}</p>
                <h3 className="font-display text-xl text-white font-semibold">{sol.desc}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =======================
// HOW WE WORK PROCESS
// =======================
function HowWeWork() {
  return (
    <section id="process" className="py-16 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left - Image */}
          <div className="lg:col-span-5">
            <div className="relative rounded-xl overflow-hidden h-[340px]">
              <img src="/images/how-we-work.jpg" alt="Solar installation process" className="w-full h-full object-cover" />
              <div className="absolute left-4 right-4 bottom-4 bg-black/70 text-white p-4 rounded-lg text-sm leading-relaxed">
                Whether you own a home, manage a society, or run a factory—we guide you from first visit to commissioning.
              </div>
            </div>
          </div>

          {/* Right - Steps */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-6 h-px bg-primary" />
              <span className="text-primary text-xs font-bold tracking-[0.15em] uppercase">How We Work</span>
            </div>
            <h2 className="font-serif text-4xl text-ink leading-tight mb-5 max-w-md">
              From first visit to <em className="italic text-primary">years of clean power</em>
            </h2>
            <p className="text-muted text-[15px] leading-relaxed mb-8 max-w-md">
              You do not need to be a solar expert. We handle the details and keep you informed at every step.
            </p>

            <div className="relative pl-11">
              <div className="absolute left-[15px] top-3 bottom-3 w-px bg-divider" />
              {[
                { num: '01', title: 'Free site survey', desc: 'We assess your roof, shading, consumption, and subsidy eligibility.' },
                { num: '02', title: 'Custom design & quote', desc: 'System size, equipment, timeline, and projected savings—in plain language.' },
                { num: '03', title: 'Approvals & installation', desc: 'Permits, net metering, and safe installation by our experienced site team.' },
                { num: '04', title: 'Commissioning & handover', desc: 'Grid connection, testing, and training on how your system works.' },
                { num: '05', title: 'O&M support', desc: 'Monitoring and maintenance so your plant keeps performing for years.' },
              ].map((step, i) => (
                <div key={i} className="relative pb-7 last:pb-0">
                  <div className="absolute left-[-44px] top-0 w-[30px] h-[30px] rounded-full border border-primary text-primary text-[11px] font-bold flex items-center justify-center bg-surface">
                    {step.num}
                  </div>
                  <h3 className="text-[15.5px] font-bold text-ink mb-1.5">{step.title}</h3>
                  <p className="text-muted text-sm leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// =======================
// STATS BAND
// =======================
function StatsBand() {
  return (
    <section className="py-16 lg:py-20 bg-primary">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-3 gap-8 lg:gap-12">
          {[
            { value: '3000+', label: 'kW Installed Capacity' },
            { value: '2022', label: 'Founded' },
            { value: '500 ++', label: 'kW Largest C&I project' },
          ].map((stat, i) => (
            <div key={i} className="text-center flex flex-col items-center justify-center">
              <p className="font-display text-4xl lg:text-5xl font-bold text-white">{stat.value}</p>
              <p className="text-white/80 mt-2 font-body">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// =======================
// OUR JOURNEY TIMELINE
// =======================
function OurJourney() {
  return (
    <section className="py-14 lg:py-20" style={{ background: '#fff5f0' }}>
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between lg:items-end mb-14">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-6 h-px bg-primary" />
              <span className="text-primary text-xs font-bold tracking-[0.15em] uppercase">Our Journey</span>
            </div>
            <h2 className="font-serif text-4xl text-ink leading-tight">
              A track record you <em className="italic text-primary">can verify</em>
            </h2>
          </div>
          <p className="text-muted italic text-sm mt-4 lg:mt-0 lg:whitespace-nowrap">Numbers from our project history.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <div className="text-center">
            <div className="w-5 h-5 rounded-full border border-primary bg-transparent mx-auto mb-4"></div>
            <p className="text-primary font-bold text-lg">2022–23</p>
            <h3 className="font-bold text-ink">Leap of progress</h3>
            <p className="text-muted text-sm">1.5 MW residential Surya Gujarat, 100+ kW commercial & industrial.</p>
          </div>
          <div className="text-center">
            <div className="w-5 h-5 rounded-full border border-primary bg-transparent mx-auto mb-4"></div>
            <p className="text-primary font-bold text-lg">2024–2026</p>
            <h3 className="font-bold text-ink">PM-Surya Ghar</h3>
            <p className="text-muted text-sm">3,000+ kW residential under PM-Surya Ghar: Muft Bijli Yojana. 300+ kW C&I.</p>
          </div>
          <div className="text-center">
            <div className="w-5 h-5 rounded-full border border-primary bg-transparent mx-auto mb-4"></div>
            <p className="text-primary font-bold text-lg">2026</p>
            <h3 className="font-bold text-ink">Growing forward</h3>
            <p className="text-muted text-sm">Target 3,000+ kW residential and 2,000+ kW</p>
          </div>
          <div className="text-center">
            <div className="w-5 h-5 rounded-full border border-primary bg-transparent mx-auto mb-4"></div>
            <p className="text-primary font-bold text-lg">2027</p>
            <h3 className="font-bold text-ink">Surya Gujarat scheme</h3>
            <p className="text-muted text-sm">All Gandhi Center</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// =======================
// PROJECTS GRID
// =======================
function Projects() {
  const [showAll, setShowAll] = useState(false)

  const projects = [
    { img: '/images/projects/project-13.jpg', title: 'Commercial Solar Carport', loc: '📍 Gujarat' },
    { img: '/images/projects/project-14.jpg', title: 'Village Rooftop Installation', loc: '📍 Gujarat' },
    { img: '/images/projects/project-15.jpg', title: 'Residential Rooftop Array', loc: '📍 Gujarat' },
    { img: '/images/projects/project-16.jpg', title: 'Two-Tier Rooftop System', loc: '📍 Gujarat' },
    { img: '/images/projects/74gj-society.jpg', title: 'Residential Rooftop', loc: '📍 Vadodara' },
    { img: '/images/projects/jitpura-bustop.jpg', title: 'Bus Top Installation', loc: '📍 Jitpura, Gujarat' },
    { img: '/images/projects/murlidhar-tenement.jpg', title: 'Murlidhar Tenement', loc: '📍 Kendranagar, Vadodara' },
    { img: '/images/projects/e11-235.jpg', title: 'Residential Rooftop', loc: '📍 Vadodara' },
    { img: '/images/projects/vaishnav-kutir.jpg', title: 'Vaishnav Kutir', loc: '📍 Soma Talav, Vadodara' },
    { img: '/images/projects/gokul-nagar.jpg', title: 'Gokul Nagar', loc: '📍 Vadodara' },
    { img: '/images/projects/om-shree-residency.jpg', title: 'Om Shree Residency', loc: '📍 Kendranagar, Vadodara' },
    { img: '/images/projects/shiv-dham-society.jpg', title: 'Shiv Dham Society', loc: '📍 Tarsali, Vadodara' },
    { img: '/images/projects/ghanghretia.jpg', title: 'Residential Rooftop', loc: '📍 Ghanghretia, Vadodara' },
    { img: '/images/projects/gayatri-nagar.jpg', title: 'Gayatri Nagar Society', loc: '📍 Kishanwadi, Vadodara' },
    { img: '/images/projects/dabhoi.jpg', title: 'Residential Rooftop', loc: '📍 Dabhoi, Gujarat' },
  ]

  const visibleProjects = showAll ? projects : projects.slice(0, 4)

  return (
    <section id="projects" className="py-20" style={{ padding: '80px 60px', background: '#fafafa' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ color: '#f97316', fontWeight: '600', fontSize: '14px', letterSpacing: '1px' }}>— OUR PROJECTS</div>
          <h2 style={{ fontSize: '32px', fontWeight: '500', color: '#1a1a1a', marginTop: '8px' }}>
            Projects across <span style={{ color: '#f97316', fontStyle: 'italic' }}>Gujarat</span>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
          {visibleProjects.map((project, i) => (
            <div key={i} style={{ borderRadius: '14px', overflow: 'hidden', background: '#fff', boxShadow: '0 4px 16px rgba(0,0,0,0.08)' }}>
              <img src={project.img} alt={project.title} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <div style={{ fontWeight: '600', color: '#1a1a1a' }}>{project.title}</div>
                <div style={{ fontSize: '14px', color: '#777', marginTop: '4px' }}>{project.loc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '32px' }}>
          <button onClick={() => setShowAll(!showAll)} style={{ background: '#f97316', color: '#fff', border: 'none', padding: '12px 28px', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '15px' }}>
            {showAll ? 'Show Less' : 'Show More'}
          </button>
        </div>
      </div>
    </section>
  )
}

// =======================
// AFFILIATIONS
// =======================
function Affiliations() {
  return (
    <section className="py-14 lg:py-14" style={{ background: '#fff5f0' }}>
      <div className="max-w-[1160px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-between lg:items-start gap-10 mb-9">
          <div>
            <div className="flex items-center gap-3 mb-3.5">
              <div className="w-5 h-px bg-primary" />
              <span className="text-primary text-[12.5px] font-bold tracking-[0.15em] uppercase">Affiliations</span>
            </div>
            <h2 className="font-serif text-2xl text-ink">Scheme-aligned</h2>
          </div>
          <p className="text-muted text-[13px] leading-relaxed max-w-[320px] mt-1">We work within Gujarat and national programs so you can access subsidies through compliant, registered installations.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="border-l-2 border-primary pl-3.5">
            <h3 className="text-[13px] font-bold text-ink mb-1">Surya Gujarat</h3>
            <p className="text-primary text-[10.5px] font-bold tracking-[0.3px] leading-relaxed mb-2">GUVNL SUBSIDY ROOFTOP PROGRAM</p>
            <p className="text-muted text-[12px] leading-relaxed">Channel partner for subsidized residential installations under Gujarat government.</p>
          </div>
          <div className="border-l-2 border-primary pl-3.5">
            <h3 className="text-[13px] font-bold text-ink mb-1">PM-Surya Ghar</h3>
            <p className="text-primary text-[10.5px] font-bold tracking-[0.3px] leading-relaxed mb-2">MUFT BIJLI YOJANA</p>
            <p className="text-muted text-[12px] leading-relaxed">Registered installer under the national household solar rooftop scheme.</p>
          </div>
          <div className="border-l-2 border-primary pl-3.5">
            <h3 className="text-[13px] font-bold text-ink mb-1">GEDA</h3>
            <p className="text-primary text-[10.5px] font-bold tracking-[0.3px] leading-relaxed mb-2">GUJARAT ENERGY DEVELOPMENT AGENCY</p>
            <p className="text-muted text-[12px] leading-relaxed">Part of the Gujarat rooftop solar ecosystem since the program's inception.</p>
          </div>
          <div className="border-l-2 border-primary pl-3.5">
            <h3 className="text-[13px] font-bold text-ink mb-1">GUVNL</h3>
            <p className="text-primary text-[10.5px] font-bold tracking-[0.3px] leading-relaxed mb-2">GUJARAT URJA VIKAS NIGAM LTD.</p>
            <p className="text-muted text-[12px] leading-relaxed">Net metering and scheme documentation aligned with GUVNL processes.</p>
          </div>
        </div>
      </div>
    </section>
  )
}

// Star icon component
function Star({ className, fill }) {
  return (
    <svg className={className} fill={fill || 'none'} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}

// =======================
// CONTACT SECTION
// =======================
function ContactSection() {
  const [formState, setFormState] = useState('idle')
  const ref = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-content', {
        scrollTrigger: { trigger: ref.current, start: 'top 80%', once: true },
        y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power3.out',
      })
    }, ref)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setFormState('sending')
    setTimeout(() => setFormState('sent'), 1500)
  }

  return (
    <section id="contact" ref={ref} className="py-24 lg:py-32" style={{ background: '#fef6f0' }}>
      <div className="max-w-[1160px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Contact Info */}
          <div className="contact-left">
            <div className="contact-content flex items-center gap-3 mb-5" style={{ color: '#FF6D00' }}>
              <div style={{ width: '24px', height: '1px', background: '#FF6D00' }} />
              <span style={{ fontSize: '13px', fontWeight: 700, letterSpacing: '1.5px' }}>CONTACT</span>
            </div>
            <h2 className="font-serif text-[42px] text-ink leading-tight mb-5" style={{ fontFamily: 'Georgia, "Times New Roman", serif', fontWeight: 400, lineHeight: 1.15 }}>
              Ready to explore solar <em style={{ color: '#FF6D00', fontStyle: 'italic' }}>for your property?</em>
            </h2>
            <p className="text-muted text-[14.5px] leading-relaxed mb-9" style={{ maxWidth: '380px' }}>
              Call or email us for a free site survey. We serve homes, housing societies, and businesses across Gujarat.
            </p>

            <div className="space-y-0">
              <div className="contact-content py-[18px]" style={{ borderTop: '1px solid #f0d9c7' }}>
                <p className="text-[11px] font-bold tracking-[0.8px] text-ink mb-1.5">ADDRESS</p>
                <p className="text-muted text-[13.5px] leading-relaxed">
                  1st Floor, A/9, Karelibaug Industrial Estate,<br />
                  Near Jalaram Temple, Karelibaug,<br />
                  Vadodara, Gujarat — 390002
                </p>
              </div>
              <div className="contact-content py-[18px]" style={{ borderTop: '1px solid #f0d9c7' }}>
                <p className="text-[11px] font-bold tracking-[0.8px] text-ink mb-1.5">MR. AKASH PARMAR</p>
                <p className="text-muted text-[13.5px]">8866426625 · 9274756625</p>
              </div>
              <div className="contact-content py-[18px]" style={{ borderTop: '1px solid #f0d9c7', borderBottom: '1px solid #f0d9c7' }}>
                <p className="text-[11px] font-bold tracking-[0.8px] text-ink mb-1.5">EMAIL</p>
                <p className="text-muted text-[13.5px]">Sumerusolution22@gmail.com</p>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="contact-right">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-5">
              <div className="field">
                <label className="block text-[11px] font-bold tracking-[0.8px] text-ink mb-2.5">NAME</label>
                <input type="text" className="w-full border-0 border-b focus:border-b-2 focus:border-orange-500 focus:ring-0 outline-none transition-all pb-2" style={{ borderBottom: '1px solid #f0d9c7', paddingBottom: '10px' }} placeholder="Your name" />
              </div>
              <div className="field">
                <label className="block text-[11px] font-bold tracking-[0.8px] text-ink mb-2.5">PHONE</label>
                <input type="tel" className="w-full border-0 border-b focus:border-b-2 focus:border-orange-500 focus:ring-0 outline-none transition-all pb-2" style={{ borderBottom: '1px solid #f0d9c7', paddingBottom: '10px' }} placeholder="+91 98765 43210" />
              </div>
            </div>
            <div className="field mb-6">
              <label className="block text-[11px] font-bold tracking-[0.8px] text-ink mb-2.5">EMAIL</label>
              <input type="email" className="w-full border-0 border-b focus:border-b-2 focus:border-orange-500 focus:ring-0 outline-none transition-all pb-2" style={{ borderBottom: '1px solid #f0d9c7', paddingBottom: '10px' }} placeholder="you@email.com" />
            </div>
            <div className="field mb-6">
              <label className="block text-[11px] font-bold tracking-[0.8px] text-ink mb-2.5">PROPERTY TYPE</label>
              <select className="w-full border-0 border-b focus:border-b-2 focus:border-orange-500 focus:ring-0 outline-none transition-all pb-2" style={{ borderBottom: '1px solid #f0d9c7', paddingBottom: '10px', background: 'transparent' }}>
                <option>Home</option>
                <option>Housing Society</option>
                <option>Commercial</option>
                <option>Industrial</option>
              </select>
            </div>
            <div className="field mb-6">
              <label className="block text-[11px] font-bold tracking-[0.8px] text-ink mb-2.5">MESSAGE <span className="text-gray-400 font-normal tracking-normal">(OPTIONAL)</span></label>
              <textarea rows={3} className="w-full border-0 border-b focus:border-b-2 focus:border-orange-500 focus:ring-0 outline-none transition-all pb-2 resize-none" style={{ borderBottom: '1px solid #f0d9c7', paddingBottom: '10px' }} placeholder="Tell us about your property or electricity bill..." />
            </div>
            <button
              type="button"
              className="magnetic-btn inline-flex items-center justify-center gap-2 text-white px-6 py-3.5 rounded-lg font-semibold text-sm"
              style={{ background: '#FF6D00' }}
            >
              Request free site survey →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

// =======================
// FOOTER
// =======================
function Footer() {
  return (
    <footer className="bg-deep text-white py-16">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 mb-12">
          {/* Logo & Tagline */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img src="/logo.png" alt="Sumeru Solution" className="w-12 h-12 rounded-xl object-cover" />
              <span className="font-display font-bold text-xl">Sumeru Solution</span>
            </div>
            <p className="text-white/60 mb-4 max-w-xs">Powering Your Tomorrow with clean, sustainable solar energy solutions across Gujarat.</p>
            <div className="flex items-center gap-2 text-sm text-white/60">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              System Operational
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-semibold mb-4">Services</h4>
            <ul className="space-y-3">
              <li><a href="#solutions" className="text-white/60 hover:text-white transition-colors">Residential Rooftop</a></li>
              <li><a href="#solutions" className="text-white/60 hover:text-white transition-colors">Commercial & Industrial</a></li>
              <li><a href="#solutions" className="text-white/60 hover:text-white transition-colors">CAPEX</a></li>
              <li><a href="#solutions" className="text-white/60 hover:text-white transition-colors">OPEX / RESCO</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-display font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              <li><a href="#about" className="text-white/60 hover:text-white transition-colors">About Us</a></li>
              <li><a href="#process" className="text-white/60 hover:text-white transition-colors">How We Work</a></li>
              <li><a href="#projects" className="text-white/60 hover:text-white transition-colors">Our Projects</a></li>
              <li><a href="#contact" className="text-white/60 hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-white/60">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> +91 8866426625
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> Sumerusolution22@gmail.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> Vadodara, Gujarat
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">© 2026 Sumeru Solution. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

// =======================
// MAIN APP
// =======================
export default function App() {
  useEffect(() => {
    const id = setTimeout(() => ScrollTrigger.refresh(), 200)
    return () => clearTimeout(id)
  }, [])

  return (
    <div className="relative">
      <div className="noise-overlay" />
      <Navbar />
      <main>
        <Hero />
        <WhoWeAre />
        <Solutions />
        <HowWeWork />
        <Projects />
        <StatsBand />
        <OurJourney />
        <Affiliations />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}