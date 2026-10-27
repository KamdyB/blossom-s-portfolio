import { useEffect, useRef, useState } from 'react'

type Project = {
  name: string; kind: string; status: string; description: string; details: string
  stack: string[]; repo: string; live?: string; visual: 'sinopia' | 'data' | 'focus' | 'story'
}
const projects: Project[] = [
  { name: 'Sinopia', kind: 'Sports tech · Product', status: 'Evolving MVP', description: 'A coaching platform designed to bring athlete check-ins, training context, and pain reports into one clear workflow.', details: 'I have worked across the React interface, FastAPI integration, persistence, authentication flows, and deployment. It is an evolving MVP, not a claim of established adoption or measured outcomes.', stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'], repo: 'https://github.com/KamdyB/sinopia', live: 'https://sinopia-landing.vercel.app/', visual: 'sinopia' },
  { name: 'Football Data Sentinel', kind: 'Data · Validation', status: 'Project repository', description: 'A Python data workflow for checking football-related records before using them for analysis.', details: 'In one recorded run, the workflow started with 573 raw records and retained 551 valid records. Those numbers describe that dataset run, not a general performance benchmark.', stack: ['Python', 'Data cleaning', 'Validation'], repo: 'https://github.com/KamdyB/football-data-sentinel', visual: 'data' },
  { name: 'Focus Wall', kind: 'Product · Focus', status: 'In development', description: 'A focus-oriented web app exploring a calmer way to structure work sessions and protect attention.', details: 'The project is being developed with a React, TypeScript, and Vite frontend. Its status is intentionally labelled in progress so planned functionality is not presented as finished.', stack: ['React', 'TypeScript', 'Vite'], repo: 'https://github.com/KamdyB/focus-wall', live: 'https://focus-wall.vercel.app/', visual: 'focus' },
  { name: 'AFAX-P — The Show That Didn’t Happen', kind: 'Interactive story · Media literacy', status: 'Published interactive story', description: 'An interactive digital story created for AfAX-P 2026: Digital Storytelling for Peacebuilding.', details: 'Posts, evidence, commentary, voice notes, and reconstructed online conversations show how a grievance changes as it moves across a border. Documented context is distinguished from reconstructed material.', stack: ['React', 'TypeScript', 'Vite', 'CSS'], repo: 'https://github.com/KamdyB/afax-story', live: 'https://kamdyb.github.io/afax-story/', visual: 'story' },
]
function BMark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 42 42" aria-hidden="true"><path d="M11 34 C10 27 12 16 13 7 C17 5 25 6 28 10 C31 14 27 19 20 20 C29 18 34 22 32 28 C30 35 19 36 11 34 Z" /></svg>
}
function ThemeSwitch({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) {
  const [pulling, setPulling] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  const toggle = () => { setPulling(true); window.clearTimeout(timer.current); timer.current = window.setTimeout(() => setPulling(false), 380); onToggle() }
  useEffect(() => () => window.clearTimeout(timer.current), [])
  return <button className={'theme-switch' + (pulling ? ' is-pulling' : '')} type="button" onClick={toggle} aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'} aria-pressed={theme === 'dark'}>
    <svg viewBox="0 0 42 58" aria-hidden="true"><path className="bulb-halo" d="M21 3 C11 3 5 10 5 19 C5 26 10 30 13 35 L13 39 L29 39 L29 35 C32 30 37 26 37 19 C37 10 31 3 21 3 Z" /><path className="bulb-outline" d="M21 5 C12.5 5 7.5 11.2 7.5 19 C7.5 25 11.4 28.8 14.2 33.6 L14.2 38.5 L27.8 38.5 L27.8 33.6 C30.6 28.8 34.5 25 34.5 19 C34.5 11.2 29.5 5 21 5 Z" /><path className="bulb-base" d="M14.5 42 H27.5 M16 46 H26 M18 50 H24" /><path className="bulb-filament" d="M16.5 25 C17.5 21 18 17 21 17 C24 17 24.5 21 25.5 25 M18 29 H24" /><path className="pull-cord" d="M21 50 V54" /><circle className="pull-knob" cx="21" cy="55" r="1.8" /></svg>
  </button>
}
function ProjectArtwork({ type }: { type: Project['visual'] }) {
  if (type === 'sinopia') return <div className="project-art art-sinopia" aria-hidden="true"><span className="art-caption">SINOPIA / COACH SPACE</span><div className="art-orbit orbit-a" /><div className="art-orbit orbit-b" /><span className="art-letter">s.</span><div className="art-foot"><span>ATHLETE CHECK-IN</span><span>WORKFLOW</span></div></div>
  if (type === 'data') return <div className="project-art art-data" aria-hidden="true"><span className="art-caption">VALIDATION RUN / SAMPLE</span><div className="data-count"><span>573</span><i>→</i><strong>551</strong></div><div className="data-bars">{[34, 62, 45, 83, 56, 92, 48, 71, 39, 77, 54, 88].map((height, i) => <i key={i} style={{ height: height + '%' }} />)}</div><div className="art-foot"><span>RAW RECORDS</span><span>VALID RECORDS</span></div></div>
  if (type === 'story') return <div className="project-art art-story" aria-hidden="true"><span className="art-caption">AFAX-P / DIGITAL STORYTELLING</span><div className="story-panels"><span><i>POST</i><b>01</b><em /></span><span><i>CONTEXT</i><b>02</b><em /></span><span><i>EVIDENCE</i><b>03</b><em /></span></div><div className="art-foot"><span>CONTEXT</span><span>CONSEQUENCE</span></div></div>
  return <div className="project-art art-focus" aria-hidden="true"><span className="art-caption">FOCUS WALL / IN PROGRESS</span><div className="focus-window"><span>focus<br /><b>wall</b></span></div><div className="focus-lines"><i /><i /><i /></div><div className="art-foot"><span>SESSION DESIGN</span><span>IN DEVELOPMENT</span></div></div>
}
function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card"><ProjectArtwork type={project.visual} /><div className="project-copy"><div className="project-meta"><span>{project.kind}</span><span className="project-status">{project.status}</span></div><h3>{project.name}</h3><p className="project-description">{project.description}</p><p className="project-details">{project.details}</p><ul className="tech-list">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul><div className="project-links"><a className="button button-primary" href={project.repo} target="_blank" rel="noreferrer">Repository <span aria-hidden="true">↗</span></a>{project.live && <a className="button button-quiet" href={project.live} target="_blank" rel="noreferrer">Live site <span aria-hidden="true">↗</span></a>}</div></div></article>
}
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [intro, setIntro] = useState(() => document.documentElement.dataset.intro === 'true')
  const logoRef = useRef<HTMLSpanElement>(null)
  const loaderBRef = useRef<SVGGElement>(null)
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) themeColor.setAttribute('content', theme === 'light' ? '#e8eaed' : '#1d2126')
  }, [theme])
  useEffect(() => {
    if (!intro) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { document.documentElement.dataset.intro = 'false'; setIntro(false); try { window.sessionStorage.setItem('blossom-intro-seen', '1') } catch { /* Storage may be unavailable. */ }; return }
    try { window.sessionStorage.setItem('blossom-intro-seen', '1') } catch { /* Storage may be unavailable. */ }
    const moveTimer = window.setTimeout(() => {
      const source = loaderBRef.current; const target = logoRef.current
      if (!source || !target) return
      source.style.transformOrigin = 'center center'
      const from = source.getBoundingClientRect(); const to = target.getBoundingClientRect()
      const dx = to.left + to.width / 2 - (from.left + from.width / 2); const dy = to.top + to.height / 2 - (from.top + from.height / 2)
      try { source.animate([{ transform: 'translate(0, 0) scale(1)', opacity: 1 }, { transform: 'translate(' + dx + 'px, ' + dy + 'px) scale(.22)', opacity: .94 }], { duration: 600, easing: 'cubic-bezier(.68, 0, .25, 1)', fill: 'forwards' }) } catch { /* The page still opens if Web Animations is unavailable. */ }
    }, 1150)
    const finishTimer = window.setTimeout(() => { document.documentElement.dataset.intro = 'false'; setIntro(false) }, 1780)
    return () => { window.clearTimeout(moveTimer); window.clearTimeout(finishTimer) }
  }, [intro])
  const closeMenu = () => setMenuOpen(false)
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    try { window.localStorage.setItem('blossom-theme', next) } catch { /* Storage may be unavailable. */ }
    setTheme(next)
  }
  return <div className={'site-shell' + (intro ? ' is-intro' : '')}>
    {intro && <div className="intro-loader" role="status" aria-label="Opening Blossom's portfolio"><svg className="loader-word" viewBox="0 0 560 150" aria-hidden="true"><g ref={loaderBRef} className="loader-b"><path d="M11 34 C10 27 12 16 13 7 C17 5 25 6 28 10 C31 14 27 19 20 20 C29 18 34 22 32 28 C30 35 19 36 11 34 Z" transform="translate(5 5) scale(3)" /></g><text className="loader-rest" x="130" y="108">lossom</text></svg></div>}
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Blossom home" onClick={closeMenu}><span className="brand-mark" ref={logoRef}><BMark /></span><span className="brand-name">Blossom</span></a>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}><span className={'menu-glyph' + (menuOpen ? ' menu-glyph-open' : '')} aria-hidden="true"><i /><i /></span></button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation"><a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#writing" onClick={closeMenu}>Writing</a><a href="#contact" onClick={closeMenu}>Contact</a><a className="resume-link" href={import.meta.env.BASE_URL + 'resume.pdf'} target="_blank" rel="noreferrer" download>Resume <span aria-hidden="true">↗</span></a></nav>
      <ThemeSwitch theme={theme} onToggle={toggleTheme} />
    </header>
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <svg className="wall-grain" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none"><filter id="plaster-grain"><feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="3" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#plaster-grain)" opacity=".12" /></svg>
        <div className="hero-wall"><p className="wall-sign">Blossom</p></div>
        <div className="hero-intro"><h1 id="hero-title">Wosu-Ezi Kamdirichukwu Blossom</h1><p className="hero-date">October 2026</p><p className="hero-diary">I’m studying Computer Science at Babcock University. I build software, explore data, and write about the parts I’m still learning to understand.</p><a className="hero-scroll" href="#work">Come in and look around <span aria-hidden="true">↓</span></a></div>
      </section>
      <section className="work room-section" id="work">
        <div className="section-heading"><div><p className="room-label">At the desk</p><h2>Things I’ve been working on.</h2></div><p className="section-note">These are works in progress at different stages. I’ve left the status of each one where it actually stands.</p></div>
        <div className="project-grid">{projects.map((project) => <ProjectCard key={project.name} project={project} />)}</div>
      </section>
      <section className="about room-section" id="about"><div className="window-scene"><div className="window-pane" aria-hidden="true"><span /><span /><span /><span /></div><div className="window-copy"><p className="room-label">By the window</p><h2>A little about me.</h2><p>I study Computer Science at Babcock University, and my interests keep crossing between software engineering, data science, AI, and sports analytics.</p><p>I like the work around the code as much as the code itself: deciding what problem is worth solving, making a workflow understandable, and being honest about what still needs work.</p><p>Outside my projects, I contribute to campus tech communities and technical writing. Explaining an idea clearly is one way I test whether I understand it.</p><div className="about-links"><a href="https://github.com/KamdyB" target="_blank" rel="noreferrer">GitHub <span aria-hidden="true">↗</span></a><a href="https://www.linkedin.com/in/kamdirichukwu-wosu-ezi-850b15380/" target="_blank" rel="noreferrer">LinkedIn <span aria-hidden="true">↗</span></a></div></div></div></section>
      <section className="writing room-section" id="writing"><div className="section-heading"><div><p className="room-label">On the shelf</p><h2>Notes I’ve put into words.</h2></div><p className="section-note">Writing helps me follow a question past the first easy answer and share what I learn along the way.</p></div><a className="writing-shelf" href="https://medium.com/@kamdirichukwuwosuezi" target="_blank" rel="noreferrer"><div className="book-stack" aria-hidden="true"><span /><span /><span /></div><div className="writing-copy"><p className="writing-name">Build With Blossom</p><h3>Breaking down hard things until they finally make sense.</h3><p>Notes on technology, data, and the questions that take more than a quick answer.</p><span className="writing-cta">Read my writing <span aria-hidden="true">↗</span></span></div></a></section>
      <section className="contact room-section" id="contact"><div className="contact-window"><p className="room-label">Before you go</p><h2>Have something in mind?</h2><p>I’m interested in thoughtful teams, practical software, data problems, and collaborations where clear thinking matters. If you’re working on something with a real problem behind it, I’d like to hear about it.</p><a className="button button-primary" href="mailto:kamdirichukwuwosuezi@gmail.com">Email me <span aria-hidden="true">↗</span></a></div><footer className="site-footer"><a className="brand" href="#top"><span className="brand-mark"><BMark /></span><span className="brand-name">Blossom</span></a><span>Software · Data · Writing</span><a href="#top">Back to the top ↑</a></footer></section>
    </main>
  </div>
}
export default App
