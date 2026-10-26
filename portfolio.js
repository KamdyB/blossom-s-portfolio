const projects = [
  {
    number: '01', name: 'Football Data Sentinel', category: 'DATA / VALIDATION',
    audience: 'For football-data workflows that need cleaner records before analysis.',
    built: 'I built a Python workflow that makes cleaning and validation visible instead of quietly trusting every incoming row. In one recorded run, 573 raw records went in and 551 valid records remained. Those figures describe that dataset run, not a general performance benchmark.',
    status: 'Recorded data workflow', statusDate: '26 Oct 2026', stack: ['Python','Data cleaning','Validation'],
    repo: 'https://github.com/KamdyB/football-data-sentinel', mark: '573 → 551', label: 'ONE RECORDED RUN'
  },
  {
    number: '02', name: 'Sinopia', category: 'SPORTS TECH / PRODUCT',
    audience: 'For coaches and teams keeping athlete check-ins, training context, and pain reports in view.',
    built: 'I built an evolving coaching platform to bring training information, check-ins, and athlete reports into a more coherent workflow. My work spans the React interface, FastAPI integration, persistence, authentication flows, and deployment. This remains an evolving MVP; I am not claiming established adoption or measured outcomes.',
    status: 'Evolving MVP', statusDate: '26 Oct 2026', stack: ['React','TypeScript','FastAPI','PostgreSQL'],
    repo: 'https://github.com/KamdyB/sinopia', live: 'https://sinopia-landing.vercel.app/', mark: 'S /', label: 'COACHING, IN CONTEXT'
  },
  {
    number: '03', name: 'FOCUS//WALL', category: 'PRODUCT / FOCUS',
    audience: 'For people who want a calmer way to structure work sessions and protect attention.',
    built: 'Focus Wall explores a quieter, low-distraction space for getting into a work session. The current frontend is being developed with React, TypeScript, and Vite; planned functionality is not presented as finished.',
    status: 'In development', statusDate: '26 Oct 2026', stack: ['React','TypeScript','Vite'],
    repo: 'https://github.com/KamdyB/focus-wall', live: 'https://focus-wall.vercel.app/', mark: 'FOCUS', label: 'ONE THING AT A TIME'
  },
  {
    number: '04', name: 'AFAX-P — The Show That Didn’t Happen', category: 'INTERACTIVE STORY / MEDIA LITERACY',
    audience: 'For viewers exploring how online criticism can shift into nationality-based generalisation and collective blame.',
    built: 'An interactive digital story created for AfAX-P 2026: Digital Storytelling for Peacebuilding. Posts, evidence, commentary, voice notes, and reconstructed online conversations show how a grievance changes as it moves across a border. Documented context is distinguished from reconstructed material.',
    status: 'Published interactive story', statusDate: '26 Oct 2026', stack: ['React','TypeScript','Vite','CSS'],
    repo: 'https://github.com/KamdyB/afax-story', live: 'https://kamdyb.github.io/afax-story/', mark: 'THE STORY', label: 'CONTEXT / CONSEQUENCE'
  }
]
const grid = document.querySelector('#project-grid')
const menuButton = document.querySelector('.menu-toggle')
const menu = document.querySelector('#site-menu')
const progress = document.querySelector('.reading-progress')
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
const heading = document.querySelector('.type-heading')
let typingTimer = null

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[character])
}

function projectCard(project) {
  const media = project.imagePath
    ? `<img src="./${escapeHTML(project.imagePath.replace(/^\/+/, ''))}" alt="${escapeHTML(project.imageAlt || project.name + ' screenshot')}" loading="lazy">`
    : `<div class="media-placeholder" role="img" aria-label="${escapeHTML(project.name)} preview slot; screenshot can be added later"><span class="media-mark">${escapeHTML(project.mark)}</span><span class="media-label">${escapeHTML(project.label)}</span></div>`
  const links = [
    `<a class="pill pill-blue" href="${escapeHTML(project.repo)}" target="_blank" rel="noreferrer">Repository <span aria-hidden="true">↗</span></a>`,
    project.live ? `<a class="pill pill-outline" href="${escapeHTML(project.live)}" target="_blank" rel="noreferrer">Live project <span aria-hidden="true">↗</span></a>` : ''
  ].join('')
  return `<article class="project-card reveal">
    <div class="project-media">${media}</div>
    <div class="project-content">
      <p class="project-category">${escapeHTML(project.number)} &nbsp;/&nbsp; ${escapeHTML(project.category)}</p>
      <h3>${escapeHTML(project.name)}</h3>
      <p class="project-audience">${escapeHTML(project.audience)}</p>
      <div class="project-built"><h4>What I made</h4><p>${escapeHTML(project.built)}</p></div>
      <p class="project-status"><span class="status-dot" aria-hidden="true"></span><span>${escapeHTML(project.status)}</span><span class="status-date">As of ${escapeHTML(project.statusDate)}</span></p>
      <div class="tech-stack" aria-label="Technology stack">${project.stack.map(item => `<span>${escapeHTML(item)}</span>`).join('')}</div>
      <div class="project-actions">${links}</div>
    </div>
  </article>`
}
if (grid) grid.innerHTML = projects.map(projectCard).join('')

function setMenu(open) {
  menuButton.setAttribute('aria-expanded', String(open))
  menuButton.querySelector('.menu-text').textContent = open ? 'Close' : 'Menu'
  menu.hidden = !open
}
menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'))
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)))
document.addEventListener('click', event => {
  if (!menu.hidden && !menu.contains(event.target) && !menuButton.contains(event.target)) setMenu(false)
})
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !menu.hidden) { setMenu(false); menuButton.focus() }
})

function updateProgress() {
  const range = document.documentElement.scrollHeight - window.innerHeight
  progress.style.transform = `scaleX(${range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0})`
}
window.addEventListener('scroll', updateProgress, { passive: true })
window.addEventListener('resize', updateProgress)
updateProgress()

function resetTyping() {
  if (typingTimer) window.clearTimeout(typingTimer)
  heading.classList.remove('is-typing', 'is-typed')
  heading.querySelectorAll('.type-char').forEach(character => character.remove())
  heading.querySelectorAll('[data-type-text]').forEach(line => { line.textContent = '' })
}
function playTyping() {
  if (!heading) return
  resetTyping()
  const lines = [...heading.querySelectorAll('[data-type-text]')]
  if (reducedMotion.matches) {
    lines.forEach(line => { line.textContent = line.dataset.typeText })
    heading.classList.add('is-typed')
    return
  }
  heading.classList.add('is-typing')
  let count = 0
  lines.forEach(line => {
    const text = line.dataset.typeText
    line.textContent = ''
    for (const character of text) {
      const span = document.createElement('span')
      span.className = 'type-char' + (character === ' ' ? ' is-space' : '') + (/[.,!?]/.test(character) ? ' is-punctuation' : '')
      span.textContent = character === ' ' ? '\u00a0' : character
      span.style.setProperty('--key-delay', (count * 39) + 'ms')
      line.appendChild(span)
      count += 1
    }
  })
  typingTimer = window.setTimeout(() => {
    heading.classList.remove('is-typing')
    heading.classList.add('is-typed')
  }, count * 39 + 520)
}
const revealItems = document.querySelectorAll('.project-card, .section-heading, .more-work, .about-layout, .field-note, .writing-feature, .contact-copy, .contact-actions')
if (reducedMotion.matches || !('IntersectionObserver' in window)) {
  revealItems.forEach(item => item.classList.add('is-visible'))
  playTyping()
} else {
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
      } else {
        entry.target.classList.remove('is-visible')
        entry.target.style.transitionDelay = '0ms'
      }
    })
  }, { threshold: 0.08, rootMargin: '0px 0px -28px 0px' })
  revealItems.forEach(item => revealObserver.observe(item))
  const headingObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) playTyping()
      else resetTyping()
    })
  }, { threshold: 0.35 })
  headingObserver.observe(heading)
}
