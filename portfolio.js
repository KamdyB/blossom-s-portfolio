const projects = [
  {
    number: '01',
    name: 'Football Data Sentinel',
    category: 'DATA · VALIDATION',
    audience: 'For football-data workflows that need cleaner records before analysis.',
    built: 'Analysis is only as dependable as the data behind it. I built a Python workflow that makes cleaning and validation visible instead of quietly trusting every incoming row. In one recorded run, it started with 573 raw records and retained 551 valid records; those figures describe that dataset run, not a general performance benchmark.',
    status: 'Project repository',
    statusDate: '26 Oct 2026',
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
    statusDate: '26 Oct 2026',
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
    statusDate: '26 Oct 2026',
    stack: ['React', 'TypeScript', 'Vite'],
    repo: 'https://github.com/KamdyB/focus-wall',
    live: 'https://focus-wall.vercel.app/',
  },
  {
    number: '04',
    name: 'AFAX-P — The Show That Didn’t Happen',
    category: 'INTERACTIVE STORY · MEDIA LITERACY',
    audience: 'For viewers exploring how online criticism can shift into nationality-based generalisation and collective blame.',
    built: 'An interactive digital story created for AfAX-P 2026: Digital Storytelling for Peacebuilding. A wall of posts, evidence, commentary, voice notes, and reconstructed online conversations lets viewers follow how a grievance changes as it moves across a border. The experience distinguishes documented context from reconstructed material and leaves room for uncertainty.',
    status: 'Published interactive story',
    statusDate: '26 Oct 2026',
    stack: ['React', 'TypeScript', 'Vite', 'CSS'],
    repo: 'https://github.com/KamdyB/afax-story',
    live: 'https://kamdyb.github.io/afax-story/',
  },
]

const projectGrid = document.querySelector('#project-grid')
const menuToggle = document.querySelector('.menu-toggle')
const menuPanel = document.querySelector('#site-nav')
const progress = document.querySelector('.scroll-progress')
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character])
}

function renderProject(project) {
  const media = project.imagePath
    ? `<img src="${escapeHTML(project.imagePath)}" alt="${escapeHTML(project.imageAlt || project.name + ' screenshot')}" loading="lazy">`
    : `<div class="media-placeholder" role="img" aria-label="${escapeHTML(project.name)} screenshot coming"><span>Screenshot coming</span></div>`
  const links = [
    `<a class="button button-primary" href="${escapeHTML(project.repo)}" target="_blank" rel="noreferrer">Repository <span aria-hidden="true">↗</span></a>`,
    project.live ? `<a class="button button-secondary" href="${escapeHTML(project.live)}" target="_blank" rel="noreferrer">Live project <span aria-hidden="true">↗</span></a>` : '',
  ].join('')

  return `<article class="project-card reveal">
    <div class="project-media">${media}</div>
    <div class="project-content">
      <p class="project-category">${escapeHTML(project.number)} / ${escapeHTML(project.category)}</p>
      <h3>${escapeHTML(project.name)}</h3>
      <p class="project-audience">${escapeHTML(project.audience)}</p>
      <div class="project-built"><h4>What I built</h4><p>${escapeHTML(project.built)}</p></div>
      <p class="project-status"><span class="status-dot" aria-hidden="true"></span><span>${escapeHTML(project.status)}</span><span class="status-date">As of ${escapeHTML(project.statusDate)}</span></p>
      <div class="tech-stack" aria-label="Technology stack">${project.stack.map(item => `<span>${escapeHTML(item)}</span>`).join('')}</div>
      <div class="project-actions">${links}</div>
    </div>
  </article>`
}

if (projectGrid) {
  projectGrid.innerHTML = projects.map(renderProject).join('')
}

function setMenu(open) {
  menuToggle.setAttribute('aria-expanded', String(open))
  menuToggle.querySelector('.menu-label').textContent = open ? 'Close' : 'Menu'
  menuPanel.hidden = !open
}

menuToggle.addEventListener('click', () => {
  setMenu(menuToggle.getAttribute('aria-expanded') !== 'true')
})

menuPanel.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => setMenu(false))
})

document.addEventListener('click', event => {
  if (menuPanel.hidden) return
  if (!menuPanel.contains(event.target) && !menuToggle.contains(event.target)) setMenu(false)
})

document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && !menuPanel.hidden) {
    setMenu(false)
    menuToggle.focus()
  }
})

function updateProgress() {
  const scrollable = document.documentElement.scrollHeight - window.innerHeight
  const ratio = scrollable > 0 ? window.scrollY / scrollable : 0
  progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`
}
window.addEventListener('scroll', updateProgress, { passive: true })
window.addEventListener('resize', updateProgress)
updateProgress()

function observeRevealElements() {
  const elements = document.querySelectorAll('.reveal:not(.is-visible)')
  if (reduceMotion.matches || !('IntersectionObserver' in window)) {
    elements.forEach(element => element.classList.add('is-visible'))
    return
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1, rootMargin: '0px 0px -24px 0px' })
  elements.forEach((element, index) => {
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 65}ms`
    observer.observe(element)
  })
}
observeRevealElements()

function animateHeading(heading) {
  const text = heading.textContent.trim()
  heading.textContent = ''
  Array.from(text).forEach((letter, index) => {
    const span = document.createElement('span')
    span.className = 'letter'
    span.textContent = letter === ' ' ? '\u00a0' : letter
    span.style.transitionDelay = `${Math.min(index * 16, 650)}ms`
    heading.append(span)
  })
}
document.querySelectorAll('.letter-heading').forEach(heading => {
  if (!reduceMotion.matches && 'IntersectionObserver' in window) {
    animateHeading(heading)
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        heading.classList.add('is-visible')
        observer.disconnect()
      }
    }, { threshold: 0.25 })
    observer.observe(heading)
  } else {
    heading.classList.add('is-visible')
  }
})
