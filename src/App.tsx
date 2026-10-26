import { useEffect, useRef, useState, type ReactNode } from 'react'

type Project = {
  number: string
  name: string
  category: string
  audience: string
  built: string
  status: string
  statusDate: string
  stack: string[]
  repo: string
  live?: string
  imagePath?: string
  imageAlt?: string
}

const statusDate = '26 Oct 2026'

const projects: Project[] = [
  {
    number: '01',
    name: 'Football Data Sentinel',
    category: 'DATA · VALIDATION',
    audience: 'For football-data workflows that need cleaner records before analysis.',
    built: 'Analysis is only as dependable as the data behind it. I built a Python workflow that makes cleaning and validation visible instead of quietly trusting every incoming row. In one recorded run, it started with 573 raw records and retained 551 valid records; those figures describe that dataset run, not a general performance benchmark.',
    status: 'Project repository',
    statusDate,
    stack: ['Python', 'Data cleaning', 'Validation'],
    repo: 'https://github.com/KamdyB/football-data-sentinel',
  },
  {
    number: '02',
    name: 'Sinopia',
    category: 'SPORTS TECH · PRODUCT',
    audience: 'For coaches and teams keeping athlete check-ins, training context, and pain reports in view.',
    built: 'Training information can be scattered across messages, notes, and separate check-ins. I built an evolving coaching platform that brings those pieces into a more coherent workflow. My work spans the React interface, FastAPI integration, persistence, authentication flows, and deployment. This is an evolving MVP, not a claim of established adoption or measured outcomes.',
    status: 'Evolving MVP',
    statusDate,
    stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'],
    repo: 'https://github.com/KamdyB/sinopia',
    live: 'https://sinopia-landing.vercel.app/',
  },
  {
    number: '03',
    name: 'FOCUS//WALL',
    category: 'PRODUCT · FOCUS',
    audience: 'For people who want a calmer way to structure work sessions and protect attention.',
    built: 'Productivity interfaces can add as much noise as they promise to remove. Focus Wall explores a more deliberate, low-distraction space for getting into a work session. The current frontend is being developed with React, TypeScript, and Vite; planned functionality is not presented as finished.',
    status: 'In development',
    statusDate,
    stack: ['React', 'TypeScript', 'Vite'],
    repo: 'https://github.com/KamdyB/focus-wall',
    live: 'https://focus-wall.vercel.app/',
  },
  {
    number: '04',
    name: 'AFAX-P — The Show That Didn’t Happen',
    category: 'INTERACTIVE STORY · MEDIA LITERACY',
    audience: 'For viewers exploring how online criticism can shift into nationality-based generalisation and collective blame.',
    built: 'I built an interactive digital story for AfAX-P 2026: Digital Storytelling for Peacebuilding. A living wall of posts, evidence, commentary, voice notes, and reconstructed online conversations lets viewers follow how a grievance changes as it moves across a border. The experience distinguishes documented context from reconstructed material and leaves room for uncertainty.',
    status: 'Published interactive story',
    statusDate,
    stack: ['React', 'TypeScript', 'Vite', 'CSS'],
    repo: 'https://github.com/KamdyB/afax-story',
    live: 'https://kamdyb.github.io/afax-story/',
  },
]

const moreWork = [
  {
    name: 'Quantitative Football Analytics Pipeline',
    description: 'A football analytics project exploring match data.',
    url: 'https://github.com/KamdyB/football-analytics-project',
  },
  {
    name: 'Student Record Management System',
    description: 'A student-record system built in C.',
    url: 'https://github.com/KamdyB/student-record-management-system-c',
  },
  {
    name: 'Heart Disease Analysis Dashboard',
    description: 'A data-analysis dashboard exploring heart-disease data.',
    url: 'https://github.com/KamdyB/heart-disease-analysis-dashboard',
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
  const words = text.split(' ')
  return <h2 ref={ref} className={`letter-heading ${visible ? 'is-visible' : ''} ${className}`} aria-label={text}>{words.map((word, wordIndex) => <span className="letter-word" key={word + wordIndex} aria-hidden="true">{Array.from(word).map((letter) => {
    const delay = index++ * 17
    return <span className="letter" key={delay} style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}>{letter}</span>
  })}{wordIndex < words.length - 1 ? <span className="letter-space"> </span> : null}</span>)}</h2>
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return <Reveal className="project-card" delay={index * 65}>
    <div className="project-media">
      {project.imagePath
        ? <img src={project.imagePath} alt={project.imageAlt ?? `${project.name} screenshot`} loading="lazy" />
        : <div className="media-placeholder" aria-label={`${project.name} screenshot coming`}><span>Screenshot coming</span></div>}
    </div>
    <div className="project-content">
      <p className="project-category">{project.number} / {project.category}</p>
      <h3>{project.name}</h3>
      <p className="project-audience">{project.audience}</p>
      <div className="project-built"><h4>What I built</h4><p>{project.built}</p></div>
      <p className="project-status"><span className="status-dot" />{project.status}<span className="status-date">As of {project.statusDate}</span></p>
      <div className="tech-stack" aria-label="Technology stack">{project.stack.map((item) => <span key={item}>{item}</span>)}</div>
      <div className="project-actions">
        <a className="button button-primary" href={project.repo} target="_blank" rel="noreferrer">Repository <span aria-hidden="true">↗</span></a>
        {project.live && <a className="button button-secondary" href={project.live} target="_blank" rel="noreferrer">Live project <span aria-hidden="true">↗</span></a>}
      </div>
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
      <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}><span className={menuOpen ? 'menu-glyph menu-glyph-open' : 'menu-glyph'} aria-hidden="true"><i /><i /></span><span>{menuOpen ? 'Close' : 'Menu'}</span></button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
        <a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#writing" onClick={closeMenu}>Writing</a><a href="#contact" onClick={closeMenu}>Contact</a>
      </nav>
    </header>

    <main id="top">
      <section className="hero section-wrap">
        <Reveal><p className="eyebrow"><span className="status-dot" /> COMPUTER SCIENCE · SOFTWARE · DATA · WRITING</p></Reveal>
        <div className="hero-layout">
          <div className="hero-copy">
            <Reveal><p className="forward-line">Building toward 2027: better software, clearer data workflows, and tools that respect the people using them.</p></Reveal>
            <LetterHeading text="I build things." className="hero-title" />
            <Reveal delay={180}><p className="hero-subtitle">Then I make the hard parts make sense<span className="typed-cursor" aria-hidden="true">▍</span></p></Reveal>
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
        <div className="section-heading"><div><Reveal><p className="eyebrow">01 / SELECTED WORK</p></Reveal><LetterHeading text="Things I’ve been building." /></div><Reveal className="section-intro"><p>Four projects, different questions. Here’s what each one is for, what I built, and where the work stands.</p></Reveal></div>
        <div className="project-grid">{projects.map((project, index) => <ProjectCard key={project.name} project={project} index={index} />)}</div>
        <div className="more-work">
          <div className="more-heading"><Reveal><p className="eyebrow">MORE WORK</p></Reveal><p>A few other projects from the archive.</p></div>
          <ul className="more-list">{moreWork.map((item) => <li key={item.name}><div><h3>{item.name}</h3><p>{item.description}</p></div><a href={item.url} target="_blank" rel="noreferrer" aria-label={`View ${item.name} repository`}>Repository <span aria-hidden="true">↗</span></a></li>)}</ul>
        </div>
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
