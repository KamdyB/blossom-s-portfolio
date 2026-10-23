import { useEffect, useRef, useState, type ReactNode } from 'react'

type Project = {
  number: string
  name: string
  category: string
  status: string
  intro: string
  problem: string
  built: string
  stack: string[]
  repo: string
  live?: string
  visual: 'sinopia' | 'data' | 'focus'
}

const projects: Project[] = [
  {
    number: '01',
    name: 'Sinopia',
    category: 'SPORTS TECH · PRODUCT',
    status: 'Evolving MVP',
    intro: 'A coaching platform designed to bring athlete check-ins, training context, and pain reports into one clear workflow.',
    problem: 'Training information can end up scattered across messages, notes, and separate check-ins. Sinopia explores a more coherent place for coaches to understand what athletes report and what needs attention.',
    built: 'I have worked across the React interface, FastAPI integration, persistence, authentication flows, and deployment. It is an evolving MVP, not a claim of established adoption or measured outcomes.',
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
    repo: 'https://github.com/KamdyB/sinopia',
    live: 'https://sinopia-landing.vercel.app/',
    visual: 'sinopia',
  },
  {
    number: '02',
    name: 'Football Data Sentinel',
    category: 'DATA · VALIDATION',
    status: 'Project repository',
    intro: 'A Python data workflow for checking football-related records before using them for analysis.',
    problem: 'Analysis is only as dependable as the data behind it. This project focuses on making the cleaning and validation stage visible instead of quietly trusting every incoming row.',
    built: 'In one recorded run, the workflow started with 573 raw records and retained 551 valid records. Those numbers describe that dataset run, not a general performance benchmark.',
    stack: ['Python', 'Data cleaning', 'Validation'],
    repo: 'https://github.com/KamdyB/football-data-sentinel',
    visual: 'data',
  },
  {
    number: '03',
    name: 'Focus Wall',
    category: 'PRODUCT · FOCUS',
    status: 'In development',
    intro: 'A focus-oriented web app exploring a calmer way to structure work sessions and protect attention.',
    problem: 'Productivity interfaces can add as much noise as they promise to remove. Focus Wall explores a more deliberate, low-distraction space for getting into a work session.',
    built: 'The project is being developed with a React, TypeScript, and Vite frontend. Its status is intentionally labelled in progress so planned functionality is not presented as finished.',
    stack: ['React', 'TypeScript', 'Vite'],
    repo: 'https://github.com/KamdyB/focus-wall',
    live: 'https://focus-wall.vercel.app/',
    visual: 'focus',
  },
]

function Reveal({ children, className = '', delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <div ref={ref} className={['reveal', visible ? 'is-visible' : '', className].filter(Boolean).join(' ')} style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}>{children}</div>
}

function LetterHeading({ text, className = '' }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setVisible(true)
        observer.disconnect()
      }
    }, { threshold: 0.2 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  let index = 0
  return <h2 ref={ref} className={`letter-heading ${visible ? 'is-visible' : ''} ${className}`} aria-label={text}>{text.split(' ').map((word, wordIndex) => <span className="letter-word" key={word + wordIndex} aria-hidden="true">{Array.from(word).map((letter) => {
    const delay = index++ * 17
    return <span className="letter" key={delay} style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}>{letter}</span>
  })}{wordIndex < text.split(' ').length - 1 ? <span className="letter-space"> </span> : null}</span>)}</h2>
}

function ProjectVisual({ type }: { type: Project['visual'] }) {
  if (type === 'sinopia') return <div className="visual visual-sinopia" aria-label="Abstract blue sports product illustration"><div className="visual-grid" /><div className="visual-label">SINOPIA / COACH SPACE</div><div className="sinopia-orbit orbit-one" /><div className="sinopia-orbit orbit-two" /><div className="sinopia-letter">s<span>.</span></div><div className="visual-bottom"><span>ATHLETE CHECK-IN</span><span>01 — WORKFLOW</span></div></div>
  if (type === 'data') return <div className="visual visual-data" aria-label="Data validation illustration showing a recorded sample"><div className="visual-label">VALIDATION RUN / SAMPLE</div><div className="data-numbers"><span>573</span><i>→</i><strong>551</strong></div><div className="data-bars">{[34, 62, 45, 83, 56, 92, 48, 71, 39, 77, 54, 88].map((height, i) => <i key={i} style={{ height: `${height}%` }} />)}</div><div className="visual-bottom"><span>RAW RECORDS</span><span>VALID RECORDS</span></div></div>
  return <div className="visual visual-focus" aria-label="Abstract focus app illustration"><div className="visual-label">FOCUS WALL / WORK IN PROGRESS</div><div className="focus-circle"><span>focus<br /><b>wall</b></span></div><div className="focus-side-note">LESS NOISE<br />MORE INTENTION</div><div className="focus-lines"><i /><i /><i /></div><div className="visual-bottom"><span>SESSION DESIGN</span><span>03 — IN PROGRESS</span></div></div>
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <Reveal className="project-card" delay={index * 90}>
    <ProjectVisual type={project.visual} />
    <div className="project-content">
      <div className="project-meta"><span>{project.number} / {project.category}</span><span className="project-status">{project.status}</span></div>
      <h3>{project.name}</h3>
      <p className="project-intro">{project.intro}</p>
      <div className="project-detail"><h4>The question</h4><p>{project.problem}</p></div>
      <div className="project-detail"><h4>What I built</h4><p>{project.built}</p></div>
      <div className="tech-stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      <div className="project-actions"><a className="button button-primary" href={project.repo} target="_blank" rel="noreferrer">View repository <span aria-hidden="true">↗</span></a>{project.live && <a className="button button-secondary" href={project.live} target="_blank" rel="noreferrer">View live site <span aria-hidden="true">↗</span></a>}</div>
    </div>
  </Reveal>
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0)
    }
    updateProgress()
    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)
    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return <div className="site-shell">
    <div className="scroll-progress" style={{ transform: `scaleX(${scrollProgress / 100})` }} aria-hidden="true" />
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Blossom home"><span className="brand-mark">b.</span><span>Blossom Wosu-Ezi</span></a>
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? 'Close' : 'Menu'}<span aria-hidden="true">{menuOpen ? '−' : '+'}</span></button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
        <a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#writing" onClick={closeMenu}>Writing</a><a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>
    </header>

    <main id="top">
      <section className="hero section-wrap">
        <Reveal><p className="eyebrow"><span className="blue-dot" /> COMPUTER SCIENCE · SOFTWARE · DATA · WRITING</p></Reveal>
        <div className="hero-layout">
          <div className="hero-copy">
            <LetterHeading text="I build things." className="hero-title" />
            <Reveal delay={180}><p className="hero-subtitle">Then I make the hard parts make sense.</p></Reveal>
            <Reveal delay={260}><p className="hero-description">I’m Blossom, a Computer Science undergraduate at Babcock University. I build practical software, explore data problems, and write about technology with the same goal: make useful things easier to understand.</p></Reveal>
            <Reveal delay={340}><div className="hero-actions"><a className="button button-primary" href="#work">Explore my projects <span aria-hidden="true">↓</span></a><a className="text-link" href="https://github.com/KamdyB" target="_blank" rel="noreferrer">GitHub profile <span aria-hidden="true">↗</span></a></div></Reveal>
          </div>
          <Reveal className="hero-card" delay={220}>
            <div className="hero-card-top"><span>PERSONAL WORKSPACE</span><span>BW / 026</span></div>
            <div className="hero-monogram" aria-hidden="true">b<span>.</span></div>
            <p>Curious about systems.<br />Particular about details.</p>
            <div className="hero-card-bottom"><span>LAGOS, NIGERIA</span><span>UTC +1</span></div>
          </Reveal>
        </div>
        <div className="hero-footer"><span>SELECTED WORK</span><span>SCROLL AT YOUR OWN PACE ↓</span></div>
      </section>

      <section className="work section-wrap" id="work">
        <div className="section-heading"><div><Reveal><p className="eyebrow">01 / SELECTED WORK</p></Reveal><LetterHeading text="Things I’ve been building." /></div><Reveal className="section-intro"><p>Each project starts with a question. Here’s what I was trying to solve, what I built, and where the work stands now.</p></Reveal></div>
        <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}</div>
      </section>

      <section className="about section-wrap" id="about">
        <div className="section-heading"><div><Reveal><p className="eyebrow">02 / A LITTLE ABOUT ME</p></Reveal><LetterHeading text="Technical curiosity." /></div><Reveal className="section-intro"><p className="about-lead">Human-readable results.</p></Reveal></div>
        <div className="about-grid">
          <Reveal><p>I’m studying Computer Science at Babcock University, with interests across software engineering, data science, and the ways people use technical systems.</p><p>I enjoy the work around the code as much as the code itself: deciding what problem is worth solving, making a workflow understandable, documenting decisions, and being honest about what still needs work.</p></Reveal>
          <Reveal delay={100}><p>Outside my projects, I contribute to campus tech communities and technical writing. Explaining an idea clearly is one of the ways I test whether I understand it.</p><div className="about-links"><a className="button button-secondary" href="https://github.com/KamdyB" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a><a className="button button-secondary" href="https://www.linkedin.com/in/kamdirichukwu-wosu-ezi-850b15380/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></div></Reveal>
        </div>
        <div className="principles-grid"><Reveal><span>01 / BUILD</span><h3>Useful over ornamental.</h3><p>Start with a real task, then build a coherent system that helps.</p></Reveal><Reveal delay={90}><span>02 / UNDERSTAND</span><h3>Know what ships.</h3><p>Move efficiently without pretending unfinished work is finished.</p></Reveal><Reveal delay={180}><span>03 / EXPLAIN</span><h3>Make the hard parts legible.</h3><p>Clear writing and good interfaces are both forms of engineering care.</p></Reveal></div>
      </section>

      <section className="writing section-wrap" id="writing">
        <div className="section-heading"><div><Reveal><p className="eyebrow">03 / NOTES & WRITING</p></Reveal><LetterHeading text="Thinking it through." /></div><Reveal className="section-intro"><p>Writing is part of how I build: a way to test ideas, document what I learn, and explain technology without hiding behind jargon.</p></Reveal></div>
        <Reveal className="writing-card"><div className="writing-mark" aria-hidden="true">“</div><div><p className="eyebrow">BUILD WITH BLOSSOM</p><h3>Breaking down hard things until they finally make sense.</h3><p>Notes on technology, learning, and the questions worth taking time to understand.</p><a className="button button-primary" href="https://medium.com/@kamdirichukwuwosuezi" target="_blank" rel="noreferrer">Read my writing <span aria-hidden="true">↗</span></a></div></Reveal>
      </section>

      <section className="contact section-wrap" id="contact">
        <Reveal><p className="eyebrow">04 / GET IN TOUCH</p></Reveal>
        <LetterHeading text="Let’s make something useful." className="contact-title" />
        <Reveal><p className="contact-description">Interested in thoughtful teams, practical software, data problems, or collaborations where clear thinking matters? I’d like to hear about it.</p><div className="contact-actions"><a className="button button-primary" href="mailto:kamdirichukwuwosuezi@gmail.com">Email me <span aria-hidden="true">↗</span></a><a className="button button-secondary" href="https://github.com/KamdyB" target="_blank" rel="noreferrer">Find me on GitHub <span aria-hidden="true">↗</span></a></div></Reveal>
        <footer className="contact-footer"><a className="brand" href="#top"><span className="brand-mark">b.</span><span>Blossom Wosu-Ezi</span></a><span>SOFTWARE · DATA · WRITING</span><a href="#top">Back to top ↑</a></footer>
      </section>
    </main>
  </div>
}

export default App
