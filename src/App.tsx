import { useEffect, useState } from 'react'

type Mode = 'Founder' | 'Builder' | 'Designer'
type Project = { name: string; kind: string; summary: string; stack: string[]; href: string; live?: string; status: string; details: string }

const projects: Project[] = [
  { name: 'Sinopia', kind: 'PRODUCT · SPORTS TECH', summary: 'A coaching platform concept for keeping athlete check-ins, training context, and pain reports in one workflow.', stack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL'], href: 'https://github.com/KamdyB/sinopia', live: 'https://sinopia-landing.vercel.app/', status: 'Evolving MVP', details: 'I have worked across the frontend, API integration, persistence, authentication flows, and deployment. The project is still evolving; I do not claim user or performance metrics that I have not measured.' },
  { name: 'Football Data Sentinel', kind: 'DATA · VALIDATION', summary: 'A data workflow focused on collecting, validating, and cleaning football-related records before analysis.', stack: ['Python', 'Data validation', 'Data cleaning'], href: 'https://github.com/KamdyB/football-data-sentinel', status: 'Project repository', details: 'The recorded workflow processed 573 raw records and retained 551 valid records. That describes this dataset run, not a general production benchmark.' },
  { name: 'Focus Wall', kind: 'PRODUCT · FOCUS', summary: 'A focus-oriented web app exploring a calmer, more deliberate way to structure work sessions.', stack: ['React', 'TypeScript', 'Vite'], href: 'https://github.com/KamdyB/focus-wall', live: 'https://focus-wall.vercel.app/', status: 'In development', details: 'The repository documents an evolving project. I keep the status explicit rather than presenting planned functionality as finished.' },
]

const codeLines = [
  { id: 0, code: 'import { Blossom } from "identity";', label: 'Identity', status: 'READY' },
  { id: 1, code: 'const work = ["software", "data", "writing"];', label: 'What I do', status: 'COMPILE' },
  { id: 2, code: 'build("Sinopia", { care: true });', label: 'Featured work', status: 'COMPILE' },
  { id: 3, code: 'explain(the_hard_parts);', label: 'How I think', status: 'COMPILE' },
  { id: 4, code: 'export default keepBuilding;', label: 'Next', status: 'COMPILE' },
]

const modeDescriptions: Record<Mode, string> = {
  Founder: 'Product intent, the problem, and what is actually built.',
  Builder: 'Projects, implementation choices, repositories, and honest status.',
  Designer: 'Typography, composition, and a small interactive type study.',
}

function App() {
  const [mode, setMode] = useState<Mode>('Founder')
  const [activeLine, setActiveLine] = useState(0)
  const [typeScale, setTypeScale] = useState(64)
  const [menuOpen, setMenuOpen] = useState(false)
  const [clock, setClock] = useState('AVAILABLE FOR INTERESTING PROBLEMS')

  useEffect(() => {
    const hour = new Date().getHours()
    setClock(hour < 12 ? 'BUILDING BEFORE NOON' : hour < 18 ? 'IN THE WORKBENCH' : 'LATE SESSION · STILL LEARNING')
  }, [])

  const selectMode = (next: Mode) => {
    setMode(next)
    setActiveLine(next === 'Founder' ? 0 : next === 'Builder' ? 2 : 3)
  }

  return (
    <div className="site-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Blossom home"><span className="brand-mark">b.</span><span>Blossom Wosu-Ezi</span></a>
        <nav className={menuOpen ? 'nav-links nav-open' : 'nav-links'} aria-label="Main navigation">
          <a href="#work" onClick={() => setMenuOpen(false)}>Work <span>03</span></a>
          <a href="#about" onClick={() => setMenuOpen(false)}>About</a>
          <a href="#notes" onClick={() => setMenuOpen(false)}>Notes</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact <span className="nav-arrow">↗</span></a>
        </nav>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-label="Toggle navigation">{menuOpen ? 'Close' : 'Menu'} <span>{menuOpen ? '−' : '+'}</span></button>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-kicker"><span className="live-dot" /> COMPUTER SCIENCE · BUILDING IN PUBLIC <span className="kicker-index">[001—026]</span></div>
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">A developer who also cares about the words.</p>
              <h1>Make it work.<br /><span>Make it make sense.</span></h1>
              <p className="hero-description">I’m Blossom — a Computer Science undergraduate building practical software, exploring data, and writing about the parts that deserve a clearer explanation.</p>
              <div className="hero-actions"><a className="button button-primary" href="#work">Explore the work <span>↘</span></a><a className="text-link" href="https://github.com/KamdyB" target="_blank" rel="noreferrer">GitHub <span>↗</span></a><a className="text-link" href="https://raw.githubusercontent.com/KamdyB/blossom-s-portfolio/main/assets/Wosu-Ezi_Kamdirichukwu_Blossom_Resume.pdf" target="_blank" rel="noreferrer">Résumé <span>↗</span></a></div>
            </div>
            <aside className="hero-aside" aria-label="Portfolio status">
              <div className="aside-top"><span>FIELD NOTES / 01</span><span className="aside-cross">✳</span></div>
              <div className="monogram" aria-hidden="true"><span>B</span><i>.</i></div>
              <p className="aside-statement">Curious about systems.<br />Particular about details.</p>
              <div className="aside-bottom"><span>{clock}</span><span className="tiny-bars"><i /><i /><i /><i /><i /></span></div>
            </aside>
          </div>
          <div className="hero-foot"><span>LAGOS, NIGERIA · UTC+1</span><span>SOFTWARE / DATA / TECHNICAL WRITING</span><a href="#work">SCROLL TO EXPLORE ↓</a></div>
        </section>

        <section className="compiler section-wrap" aria-labelledby="compiler-title">
          <div className="section-heading"><div><p className="eyebrow">INTERACTIVE INDEX / 001</p><h2 id="compiler-title">A little about how I work.</h2></div><p className="section-note">Select a line. See what it<br className="desktop-break" /> compiles into.</p></div>
          <div className="compiler-window">
            <div className="window-bar"><div className="window-dots"><i /><i /><i /></div><div className="file-tab"><span>TS</span> portfolio.tsx <b>×</b></div><div className="window-meta">UTF-8&nbsp; · &nbsp;{mode.toUpperCase()} MODE</div></div>
            <div className="compiler-body">
              <div className="code-panel" aria-label="Interactive code index">
                <div className="code-panel-head"><span>EXPLORER</span><span>⌄</span></div>
                <div className="file-tree"><span className="tree-arrow">⌄</span> src <span className="tree-muted">/</span><br /><span className="tree-indent">└─ </span><span className="tree-active">portfolio.tsx</span><br /><span className="tree-indent">└─ </span><span>projects.ts</span><br /><span className="tree-indent">└─ </span><span>notes.md</span></div>
                <div className="code-lines">{codeLines.map((line, index) => <button key={line.id} className={activeLine === line.id ? 'code-line active' : 'code-line'} onMouseEnter={() => setActiveLine(line.id)} onFocus={() => setActiveLine(line.id)} onClick={() => setActiveLine(line.id)} aria-pressed={activeLine === line.id}><span className="line-number">{String(index + 1).padStart(2, '0')}</span><span className="line-code">{line.code}</span><span className="line-status">{activeLine === line.id ? '●' : '·'}</span></button>)}</div>
                <div className="code-legend"><span><i className="legend-green" /> selected</span><span><i className="legend-amber" /> interactive</span></div>
              </div>
              <div className="output-panel" aria-live="polite">
                <div className="output-top"><span><i /> OUTPUT PREVIEW</span><span>0{activeLine + 1} / 05</span></div>
                {activeLine === 0 && <div className="output-content identity-output"><p className="output-label">// IDENTITY RESOLVED</p><div className="output-monogram">b<span>.</span></div><h3>Blossom Wosu-Ezi</h3><p>CS student. Builder. Technical writer.</p><div className="output-tags"><span>CURIOUS BY DEFAULT</span><span>DETAILS MATTER</span></div></div>}
                {activeLine === 1 && <div className="output-content"><p className="output-label">// THREE CONNECTED INTERESTS</p><div className="interest-stack"><div><b>01</b><span>Software</span><small>Interfaces, APIs, product workflows</small></div><div><b>02</b><span>Data</span><small>Cleaning, analysis, useful signals</small></div><div><b>03</b><span>Writing</span><small>Documentation, explanation, clarity</small></div></div></div>}
                {activeLine === 2 && <div className="output-content"><p className="output-label">// PROJECT: SINOPIA</p><div className="mini-product"><div className="mini-product-head"><span>sinopia / coach space</span><span className="status-pill">EVOLVING MVP</span></div><div className="mini-product-lines"><i /><i /><i /></div><h3>Training context,<br />in one workflow.</h3><p>A sports-coaching platform concept for athlete check-ins, training context, and pain reports.</p><a href="https://github.com/KamdyB/sinopia" target="_blank" rel="noreferrer">Inspect the repository ↗</a></div></div>}
                {activeLine === 3 && <div className="output-content"><p className="output-label">// A WORKING PRINCIPLE</p><blockquote className="principle-quote">“If the code works but nobody can understand how to use it, the work isn’t finished.”</blockquote><p className="principle-note">A personal principle—not a benchmark. It informs how I approach interfaces, APIs, and technical writing.</p><div className="principle-rule"><span /> PRODUCT THINKING <span /> CLEAR EXPLANATION</div></div>}
                {activeLine === 4 && <div className="output-content"><p className="output-label">// CURRENT DIRECTION</p><h3 className="next-title">Build. Read. Explain.<br /><em>Repeat with intent.</em></h3><p className="next-copy">Currently growing through practical software projects, data workflows, university study, and writing.</p><a className="output-link" href="#contact">Have a useful problem? Say hello ↗</a></div>}
                <div className="output-footer"><span>COMPILE STATUS</span><span className="success-status"><i /> RENDERED LOCALLY</span></div>
              </div>
            </div>
            <div className="window-status"><span>main* <i>●</i></span><span>Ln {activeLine + 1}, Col 1</span><span>TypeScript React</span><span className="status-spacer" /><span>Ready</span></div>
          </div>
          <p className="interaction-hint"><span>↳</span> Try clicking different lines. The output changes; no page reload needed.</p>
        </section>

        <section className="work section-wrap" id="work">
          <div className="section-heading work-heading"><div><p className="eyebrow">SELECTED WORK / 002</p><h2>Built to answer a question.</h2></div><p className="section-note">Projects in different stages.<br />The status is part of the story.</p></div>
          <div className="mode-switch" role="group" aria-label="Project presentation mode"><span>VIEW AS</span>{(['Founder', 'Builder', 'Designer'] as Mode[]).map((item) => <button key={item} className={mode === item ? 'mode-button selected' : 'mode-button'} onClick={() => selectMode(item)} aria-pressed={mode === item}>{item}<span>{item === 'Founder' ? '↗' : item === 'Builder' ? '</>' : '✳'}</span></button>)}</div>
          <p className="mode-description">{modeDescriptions[mode]}</p>
          <div className={mode === 'Founder' ? 'project-grid founder-grid' : mode === 'Builder' ? 'project-grid builder-grid' : 'project-grid designer-grid'}>
            {projects.map((project, index) => <article className={'project-card project-' + (index + 1)} key={project.name}>
              <div className="project-visual"><div className="project-visual-top"><span>{String(index + 1).padStart(2, '0')} / 03</span><span className="project-kind">{project.kind}</span></div>
                {index === 0 ? <div className="visual-sinopia"><div className="visual-sinopia-mark">s<span>.</span></div><div className="visual-sinopia-title">A little more<br /><em>context.</em></div><div className="visual-sinopia-foot"><span>ATHLETE CHECK-IN</span><span>↗</span></div></div> : index === 1 ? <div className="visual-data"><div className="data-label">VALIDATION RUN / SAMPLE</div><div className="data-big">573<span> → </span><b>551</b></div><div className="data-bars"><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /><i /></div><div className="data-foot"><span>RAW RECORDS</span><span>VALID RECORDS</span></div></div> : <div className="visual-focus"><div className="focus-ring"><span>focus<br />wall</span></div><div className="focus-corner">LESS NOISE<br />MORE INTENTION</div><div className="focus-lines"><i /><i /><i /></div></div>}
              </div>
              <div className="project-info"><div className="project-meta"><span>{project.status}</span><span>↗</span></div><h3>{project.name}</h3><p>{mode === 'Builder' ? project.details : project.summary}</p>
                {mode === 'Designer' && <div className="design-note">DESIGN NOTE <span>{index === 0 ? 'Workflow before dashboard' : index === 1 ? 'Make data quality visible' : 'Reduce visual noise'}</span></div>}
                <div className="stack-list">{project.stack.map((tag) => <span key={tag}>{tag}</span>)}</div>
                <div className="project-links"><a href={project.href} target="_blank" rel="noreferrer">Repository <span>↗</span></a>{project.live && <a href={project.live} target="_blank" rel="noreferrer">Live site <span>↗</span></a>}</div>
              </div>
            </article>)}
          </div>
        </section>

        <section className="about section-wrap" id="about">
          <div className="about-index"><span>003</span><span>ABOUT THE BUILDER</span><span className="about-star">✳</span></div>
          <div className="about-grid"><h2>Technical curiosity.<br /><em>Human-readable results.</em></h2><div className="about-copy"><p>I’m a Computer Science undergraduate at Babcock University interested in software engineering, data science, and the ways people interact with technical systems.</p><p>I like the work around the code as much as the code itself: figuring out what problem is worth solving, making the system understandable, documenting decisions, and being honest about what still needs work.</p><p>Outside my projects, I contribute to campus tech communities and technical writing. Explaining an idea clearly is one of the ways I test whether I understand it.</p><div className="about-links"><a href="https://github.com/KamdyB" target="_blank" rel="noreferrer">Explore GitHub ↗</a><a href="https://www.linkedin.com/in/kamdirichukwu-wosu-ezi-850b15380/" target="_blank" rel="noreferrer">LinkedIn ↗</a></div></div></div>
          <div className="principles-grid"><div><span>01 / BUILD</span><h3>Useful over ornamental.</h3><p>Start with a real task, then build the smallest coherent system that helps.</p></div><div><span>02 / UNDERSTAND</span><h3>Know what ships.</h3><p>Use tools to move faster, while keeping the fundamentals and the responsibility.</p></div><div><span>03 / EXPLAIN</span><h3>Make the hard parts legible.</h3><p>Clear writing and good interfaces are both forms of engineering care.</p></div></div>
        </section>

        <section className="notes section-wrap" id="notes"><div className="notes-header"><div><p className="eyebrow">OPEN TABS / 004</p><h2>Thinking in public.</h2></div><span className="notes-symbol">↘</span></div><div className="notes-row"><span>01 / TECHNICAL WRITING</span><div><h3>Breaking down hard things until they finally make sense.</h3><p>My writing practice sits alongside building: documenting ideas, explaining technology, and making room for the questions that are easy to skip.</p></div><a href="https://medium.com/@kamdirichukwuwosuezi" target="_blank" rel="noreferrer" aria-label="Read writing on Medium">↗</a></div><div className="notes-row"><span>02 / LEARNING LOG</span><div><h3>Small, inspectable steps beat impressive-sounding claims.</h3><p>This portfolio is a workbench, not a finished monument. Projects change, understanding improves, and the notes should change with them.</p></div><span className="notes-static">IN PROGRESS</span></div></section>

        <section className="designer-playground section-wrap" aria-labelledby="type-play-title"><div className="playground-copy"><p className="eyebrow">TYPE STUDY / 005</p><h2 id="type-play-title">Words have weight.</h2><p>A tiny typographic playground. Change the scale and watch the layout respond.</p><label htmlFor="type-scale">TYPE SCALE <span>{typeScale}px</span></label><input id="type-scale" type="range" min="36" max="96" value={typeScale} onChange={(event) => setTypeScale(Number(event.target.value))} /><div className="scale-labels"><span>COMPACT</span><span>EXPRESSIVE</span></div></div><div className="type-canvas"><span className="canvas-label">SPECIMEN / A—Z</span><p className="type-specimen" style={{ fontSize: 'clamp(2.25rem, ' + (typeScale / 10) + 'vw, ' + typeScale + 'px)' }}>Make room<br /><em>for wonder.</em></p><span className="canvas-coordinate">BW—026 / TYPE</span></div></section>

        <section className="contact section-wrap" id="contact"><div className="contact-top"><p className="eyebrow">END OF FILE / BEGINNING OF SOMETHING</p><span>STATUS: OPEN</span></div><h2>Have a problem<br />worth <em>understanding?</em></h2><p className="contact-description">I’m interested in thoughtful teams, practical software, data problems, and collaborations where clear thinking matters.</p><div className="contact-actions"><a className="button button-primary" href="mailto:kamdirichukwuwosuezi@gmail.com">Email me <span>↗</span></a><a className="text-link" href="https://github.com/KamdyB" target="_blank" rel="noreferrer">Or find me on GitHub ↗</a></div><div className="contact-footer"><a className="brand" href="#top"><span className="brand-mark">b.</span><span>Blossom Wosu-Ezi</span></a><span>MADE WITH INTENTION · 2026</span><a href="#top">BACK TO TOP ↑</a></div></section>
      </main>
    </div>
  )
}

export default App
