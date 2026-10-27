import { useEffect, useRef, useState, type CSSProperties } from 'react'

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
const signatureStrokes = [
  "M22 145 C25 115 31 70 43 24 C47 9 63 8 77 17 C94 28 77 50 45 61 C73 48 101 54 101 76 C101 104 65 111 38 91 C30 85 30 79 39 76",
  "M106 76 C114 50 116 27 120 14 C124 4 132 10 129 25 L115 91 C112 105 119 108 128 98",
  "M145 73 C145 54 169 49 180 65 C191 82 175 102 158 94 C143 87 144 73 157 64",
  "M213 62 C198 50 183 61 194 72 C205 81 221 78 219 91 C217 105 196 104 185 95",
  "M249 62 C234 50 219 61 230 72 C241 81 257 78 255 91 C253 105 232 104 221 95",
  "M270 73 C270 54 294 49 305 65 C316 82 300 102 283 94 C268 87 269 73 282 64",
  "M315 95 C319 81 322 66 323 59 C325 51 332 53 331 62 L325 90 C330 76 340 57 349 58 C360 59 344 86 348 92 C352 99 365 79 370 64 C375 50 380 56 377 67 L371 91 C368 104 376 105 386 93"
]
function BMark({ className = '' }: { className?: string }) {
  return <svg className={className} viewBox="0 0 42 42" aria-hidden="true"><path d="M14 36 C14 26 16 15 18 6 C23 4 29 8 27 13 C26 17 21 19 17 20 C24 17 33 21 31 28 C29 36 19 36 13 32 C11 30 12 28 15 28" /></svg>
}
function Signature({ className = '' }: { className?: string }) {
  return <svg className={'signature-drawing ' + className} viewBox="0 0 430 170" role="img" aria-label="Blossom, handwritten">
    <g>{signatureStrokes.map((d, index) => <path className="signature-stroke" d={d} pathLength="1" key={index} style={{ '--stroke-index': index } as CSSProperties} />)}</g>
  </svg>
}
function TypingHeading({ text }: { text: string }) {
  const headingRef = useRef<HTMLHeadingElement | null>(null)
  const [visibleText, setVisibleText] = useState('')
  const [started, setStarted] = useState(false)
  const [complete, setComplete] = useState(false)
  useEffect(() => {
    const heading = headingRef.current
    if (!heading || started) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisibleText(text)
      setStarted(true)
      setComplete(true)
      return
    }
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        setStarted(true)
        observer.disconnect()
      }
    }, { threshold: 0.35, rootMargin: '0px 0px -4% 0px' })
    observer.observe(heading)
    return () => observer.disconnect()
  }, [started, text])
  useEffect(() => {
    if (!started || complete) return
    let index = 0
    const timer = window.setInterval(() => {
      index += 1
      setVisibleText(text.slice(0, index))
      if (index >= text.length) {
        window.clearInterval(timer)
        setComplete(true)
      }
    }, 62)
    return () => window.clearInterval(timer)
  }, [started, complete, text])
  return <h2 ref={headingRef} className="typing-heading" aria-label={text}>
    <span className="typing-reserve" aria-hidden="true">{text}</span>
    <span className="typing-live" aria-hidden="true">{visibleText}{started && !complete && <span className="typing-caret" />}</span>
  </h2>
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
  if (type === 'data') return <div className="project-art art-data" aria-hidden="true"><span className="art-caption">VALIDATION RUN / SAMPLE</span><div className="data-count"><span>573</span><i>·</i><strong>551</strong></div><div className="data-bars">{[34, 62, 45, 83, 56, 92, 48, 71, 39, 77, 54, 88].map((height, i) => <i key={i} style={{ height: height + '%' }} />)}</div><div className="art-foot"><span>RAW RECORDS</span><span>VALID RECORDS</span></div></div>
  if (type === 'story') return <div className="project-art art-story" aria-hidden="true"><span className="art-caption">AFAX-P / DIGITAL STORYTELLING</span><div className="story-panels"><span><i>POST</i><b>01</b><em /></span><span><i>CONTEXT</i><b>02</b><em /></span><span><i>EVIDENCE</i><b>03</b><em /></span></div><div className="art-foot"><span>CONTEXT</span><span>CONSEQUENCE</span></div></div>
  return <div className="project-art art-focus" aria-hidden="true"><span className="art-caption">FOCUS WALL / IN PROGRESS</span><div className="focus-window"><span>focus<br /><b>wall</b></span></div><div className="focus-lines"><i /><i /><i /></div><div className="art-foot"><span>SESSION DESIGN</span><span>IN DEVELOPMENT</span></div></div>
}
function ProjectCard({ project }: { project: Project }) {
  return <article className="project-card"><ProjectArtwork type={project.visual} /><div className="project-copy"><div className="project-meta"><span>{project.kind}</span><span className="project-status">{project.status}</span></div><h3>{project.name}</h3><p className="project-description">{project.description}</p><p className="project-details">{project.details}</p><ul className="tech-list">{project.stack.map((item) => <li key={item}>{item}</li>)}</ul><div className="project-links"><a className="button button-primary" href={project.repo} target="_blank" rel="noreferrer">Repository <span className="link-mark" aria-hidden="true">•</span></a>{project.live && <a className="button button-quiet" href={project.live} target="_blank" rel="noreferrer">Live site <span aria-hidden="true">·</span></a>}</div></div></article>
}
function App() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light')
  const [menuOpen, setMenuOpen] = useState(false)
  const [intro, setIntro] = useState(() => document.documentElement.dataset.intro === 'true')
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    const themeColor = document.querySelector('meta[name="theme-color"]')
    if (themeColor) themeColor.setAttribute('content', theme === 'light' ? '#e8eaed' : '#1d2126')
  }, [theme])
  useEffect(() => {
    if (!intro) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { document.documentElement.dataset.intro = 'false'; setIntro(false); try { window.sessionStorage.setItem('blossom-intro-seen', '1') } catch { /* Storage may be unavailable. */ }; return }
    try { window.sessionStorage.setItem('blossom-intro-seen', '1') } catch { /* Storage may be unavailable. */ }
    const finishTimer = window.setTimeout(() => { document.documentElement.dataset.intro = 'false'; setIntro(false) }, 2250)
    return () => window.clearTimeout(finishTimer)
  }, [intro])
  const closeMenu = () => setMenuOpen(false)
  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light'
    try { window.localStorage.setItem('blossom-theme', next) } catch { /* Storage may be unavailable. */ }
    setTheme(next)
  }
  return <div className={'site-shell' + (intro ? ' is-intro' : '')}>
    {intro && <div className="intro-loader" role="status" aria-label="Opening Blossom's portfolio"><Signature className="loader-word" /></div>}
    <header className="topbar">
      <a className="brand" href="#top" aria-label="Blossom home" onClick={closeMenu}><span className="brand-mark"><BMark /></span><span className="brand-name">Blossom</span></a>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}><span className={'menu-glyph' + (menuOpen ? ' menu-glyph-open' : '')} aria-hidden="true"><i /><i /></span></button>
      <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation"><a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#writing" onClick={closeMenu}>Writing</a><a href="#contact" onClick={closeMenu}>Contact</a><a className="resume-link" href={import.meta.env.BASE_URL + 'resume.pdf'} target="_blank" rel="noreferrer" download>Resume <span aria-hidden="true">·</span></a></nav>
      <ThemeSwitch theme={theme} onToggle={toggleTheme} />
    </header>
    <main id="top">
      <section className="hero" aria-labelledby="hero-title">
        <svg className="wall-grain" aria-hidden="true" viewBox="0 0 100 100" preserveAspectRatio="none"><filter id="plaster-grain"><feTurbulence type="fractalNoise" baseFrequency=".82" numOctaves="3" stitchTiles="stitch" /></filter><rect width="100%" height="100%" filter="url(#plaster-grain)" opacity=".12" /></svg>
        <div className="hero-wall"><Signature className="wall-sign" /></div>
        <div className="hero-intro"><h1 id="hero-title">Wosu-Ezi Kamdirichukwu Blossom</h1><p className="hero-date">October 2026</p><p className="hero-diary">I’m studying Computer Science at Babcock University. I build software, explore data, and write about the parts I’m still learning to understand.</p><a className="hero-scroll" href="#work">Come in and look around <span className="scroll-mark" aria-hidden="true">⌁</span></a></div>
      </section>
      <section className="work room-section" id="work">
        <div className="section-heading"><div><p className="room-label">At the desk</p><TypingHeading text="Things I’ve been working on." /></div><p className="section-note">These are works in progress at different stages. I’ve left the status of each one where it actually stands.</p></div>
        <div className="project-grid">{projects.map((project) => <ProjectCard key={project.name} project={project} />)}</div>
      </section>
      <section className="about room-section" id="about"><div className="window-scene"><div className="window-pane" aria-hidden="true"><span /><span /><span /><span /></div><div className="window-copy"><p className="room-label">By the window</p><TypingHeading text="A little about me." /><p>I study Computer Science at Babcock University, and my interests keep crossing between software engineering, data science, AI, and sports analytics.</p><p>I like the work around the code as much as the code itself: deciding what problem is worth solving, making a workflow understandable, and being honest about what still needs work.</p><p>Outside my projects, I contribute to campus tech communities and technical writing. Explaining an idea clearly is one way I test whether I understand it.</p><div className="about-links"><a href="https://github.com/KamdyB" target="_blank" rel="noreferrer">GitHub</a><a href="https://www.linkedin.com/in/kamdirichukwu-wosu-ezi-850b15380/" target="_blank" rel="noreferrer">LinkedIn</a></div><div className="window-contact" id="contact"><h3>Have something in mind?</h3><p>I’m interested in thoughtful teams, practical software, data problems, and collaborations where clear thinking matters. If you’re working on something with a real problem behind it, I’d like to hear about it.</p><a className="button button-primary" href="mailto:kamdirichukwuwosuezi@gmail.com">Email me <span aria-hidden="true">·</span></a></div></div></div></section><section className="writing room-section" id="writing"><div className="section-heading"><div><p className="room-label">On the shelf</p><TypingHeading text="Notes I’ve put into words." /></div><p className="section-note">Writing helps me follow a question past the first easy answer and share what I learn along the way.</p></div><a className="writing-shelf" href="https://medium.com/@kamdirichukwuwosuezi" target="_blank" rel="noreferrer"><div className="book-stack" aria-hidden="true"><span /><span /><span /></div><div className="writing-copy"><p className="writing-name">Build With Blossom</p><h3>Breaking down hard things until they finally make sense.</h3><p>Notes on technology, data, and the questions that take more than a quick answer.</p><span className="writing-cta">Read my writing <span aria-hidden="true">·</span></span></div></a></section>
      <footer className="site-footer"><a className="brand footer-brand" href="#top"><span className="brand-mark"><BMark /></span><span className="brand-name">Blossom</span></a><span className="footer-focus">Software <i>·</i> Data <i>·</i> Writing</span><span className="footer-copyright">© Wosu-Ezi Kamdirichukwu Blossom 2026</span><a className="footer-top" href="#top">Back to the beginning</a></footer>
    </main>
  </div>
}
export default App
