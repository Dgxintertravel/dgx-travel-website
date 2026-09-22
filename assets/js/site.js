document.documentElement.classList.add('js');

// Language choices are explicit; unsupported languages never redirect to PT.
const languageLink = document.querySelector('[data-language="pt"]');
if (languageLink) {
  try {
    if (localStorage.getItem('dgx-language') === 'pt' && !new URLSearchParams(location.search).has('choose')) location.replace('/pt/');
  } catch { /* Navigation still works when browser storage is unavailable. */ }
  languageLink.addEventListener('click', () => {
    try { localStorage.setItem('dgx-language', 'pt'); } catch {}
  });
}

const header = document.querySelector('.site-header');
const navigation = document.querySelector('#site-navigation');
const toggle = document.querySelector('.menu-toggle');
if (header && navigation && toggle) {
  const compact = matchMedia('(max-width: 1024px)');
  const setMenu = (open, restoreFocus = false) => {
    navigation.classList.toggle('is-open', open);
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.innerHTML = `${open ? 'Fechar' : 'Menu'} <span aria-hidden="true">${open ? '×' : '☰'}</span>`;
    if (restoreFocus) toggle.focus();
  };
  const resize = () => { toggle.hidden = !compact.matches; setMenu(false); };
  resize();
  compact.addEventListener('change', resize);
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  navigation.addEventListener('click', e => { if (e.target.closest('a')) setMenu(false); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') setMenu(false, true); });
  document.addEventListener('click', e => { if (!header.contains(e.target)) setMenu(false); });
  const scroll = () => header.classList.toggle('scrolled', window.scrollY > 35);
  scroll(); window.addEventListener('scroll', scroll, {passive:true});
}

const motion = matchMedia('(prefers-reduced-motion: reduce)');
document.querySelectorAll('.background-video').forEach(video => {
  const control = video.parentElement.querySelector('.video-control');
  if (!control) return;
  control.hidden = false;
  const update = () => {
    control.textContent = video.paused ? 'Reproduzir vídeo' : 'Pausar vídeo';
    control.setAttribute('aria-pressed', String(video.paused));
  };
  const applyMotion = () => {
    control.hidden = motion.matches;
    if (motion.matches) { video.autoplay = false; video.pause(); }
    update();
  };
  applyMotion(); motion.addEventListener('change', applyMotion);
  video.addEventListener('play', update); video.addEventListener('pause', update);
  control.addEventListener('click', () => {
    if (video.paused) video.play().catch(update); else video.pause();
  });
});

const form = document.querySelector('#contact-form');
if (form) {
  form.querySelector('button[type="submit"]').disabled = false;
  const result = document.querySelector('#contact-result');
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = [['Nome','nome'],['Empresa','empresa'],['Cargo','cargo'],['E-mail','email'],['WhatsApp','whatsapp'],['País','pais'],['Área de interesse','interesse'],['Mensagem','mensagem']];
    const body = fields.map(([label,key]) => `${label}: ${data.get(key) || 'Não informado'}`).join('\n\n') + '\n\nConsentimento: autorizado para responder a esta solicitação.';
    document.querySelector('#email-draft').href = `mailto:info@dgxtravel.com?subject=${encodeURIComponent('Contato DGX — '+data.get('interesse'))}&body=${encodeURIComponent(body)}`;
    result.hidden = false;
  });
  form.addEventListener('input', () => { result.hidden = true; document.querySelector('#email-draft').removeAttribute('href'); });
}

// Subtle editorial motion and progressive interactions keep the page feeling like a website.
const revealObserver = 'IntersectionObserver' in window ? new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('is-visible'); revealObserver.unobserve(entry.target); }
}), {threshold:.12, rootMargin:'0px 0px -8% 0px'}) : null;
document.querySelectorAll('.section-heading,.service-row,.method-steps li,.market-map,.product,.case,.person,.experience-row,.hotel-row,.destination-gallery figure,.contact-form').forEach((element,index) => {
  element.classList.add('reveal'); element.style.transitionDelay = `${Math.min(index % 6, 5) * 55}ms`;
  if (revealObserver) revealObserver.observe(element); else element.classList.add('is-visible');
});

// Services behave as an editorial index: one focus at a time, with keyboard support.
const serviceRows = [...document.querySelectorAll('.service-row')];
if (serviceRows.length) {
  const activateService = row => serviceRows.forEach(item => {
    const active = item === row; item.classList.toggle('is-active', active); item.setAttribute('aria-expanded', String(active)); item.tabIndex = 0;
  });
  serviceRows.forEach(row => { row.setAttribute('role','button'); row.addEventListener('click', () => activateService(row)); row.addEventListener('keydown', event => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); activateService(row); } }); });
  activateService(serviceRows[0]);
}

// Local map: the previous visual language returns as a lightweight, dependency-free map.
const marketDiagram = document.querySelector('.market-diagram');
if (marketDiagram) {
  marketDiagram.className = 'market-map'; marketDiagram.removeAttribute('aria-hidden');
  marketDiagram.setAttribute('role','group'); marketDiagram.setAttribute('aria-label','Mapa interativo da operação DGX entre Brasil e México');
  marketDiagram.innerHTML = `<button class="market-market" type="button" data-market="mexico" aria-pressed="false"><strong>México</strong><span>Cidade do México · escritório</span></button><svg viewBox="0 0 760 300" role="img" aria-label="Conexão entre Brasil e México"><path class="gridline" d="M40 70H720M25 150H735M40 230H720"/><path class="land" d="M168 34l-39 18-25 33 16 25-19 32 21 25 7 49 31 30 31-19 26 23 28-31-8-39 28-22-21-31 13-31-28-19-14-27z"/><path class="land" d="M466 45l-29 19-20 32 23 27 9 33 32 25 16 34 27-17 12-43 35-33-19-31-41-20-14-26z"/><path class="route-line" d="M163 175 Q350 22 505 166"/><circle class="map-node" data-node="mexico" cx="163" cy="175" r="7"/><circle class="map-node is-focus" data-node="brasil" cx="505" cy="166" r="7"/><text class="map-label" x="526" y="162">SÃO PAULO</text><text class="map-sublabel" x="526" y="180">BRASIL</text><text class="map-label" x="87" y="171">CIDADE DO MÉXICO</text><text class="map-sublabel" x="87" y="189">MÉXICO</text></svg><button class="market-market is-active" type="button" data-market="brasil" aria-pressed="true"><strong>Brasil</strong><span>São Paulo · escritório</span></button><p class="market-map-caption">Uma operação. Dois mercados. A mesma presença estratégica.</p>`;
  const markets = [...marketDiagram.querySelectorAll('.market-market')]; const nodes = [...marketDiagram.querySelectorAll('.map-node')];
  const activateMarket = market => { markets.forEach(button => { const active=button.dataset.market===market; button.classList.toggle('is-active',active); button.setAttribute('aria-pressed',String(active)); }); nodes.forEach(node => node.classList.toggle('is-focus',node.dataset.node===market)); };
  markets.forEach(button => button.addEventListener('click', () => activateMarket(button.dataset.market)));
}

// Cases become a controlled editorial slider instead of a long stack of identical blocks.
const casesSection = document.querySelector('.cases');
const cases = casesSection ? [...casesSection.querySelectorAll(':scope > .case')] : [];
if (casesSection && cases.length) {
  const viewport = document.createElement('div'); viewport.className='case-viewport'; const track=document.createElement('div'); track.className='case-track';
  cases.forEach(item => track.appendChild(item)); viewport.appendChild(track); casesSection.appendChild(viewport);
  const controls=document.createElement('div'); controls.className='case-controls'; controls.innerHTML=`<span class="case-count" aria-live="polite">01 / ${String(cases.length).padStart(2,'0')}</span><span class="case-dots" aria-label="Selecionar case"></span><button type="button" data-case-prev aria-label="Case anterior">←</button><button type="button" data-case-next aria-label="Próximo case">→</button>`; casesSection.appendChild(controls);
  const dots=controls.querySelector('.case-dots'); cases.forEach((_,i)=>{const dot=document.createElement('button');dot.type='button';dot.setAttribute('aria-label',`Ir para o case ${i+1}`);dot.className=i===0?'is-active':'';dot.addEventListener('click',()=>go(i));dots.appendChild(dot);});
  let current=0; const go=index=>{current=(index+cases.length)%cases.length;track.style.transform=`translateX(calc(-${current} * (min(100%, 1120px) + clamp(24px, 4vw, 70px)))`;controls.querySelector('.case-count').textContent=`${String(current+1).padStart(2,'0')} / ${String(cases.length).padStart(2,'0')}`;dots.querySelectorAll('button').forEach((dot,i)=>dot.classList.toggle('is-active',i===current));cases[current].focus?.({preventScroll:true});};
  controls.querySelector('[data-case-prev]').addEventListener('click',()=>go(current-1)); controls.querySelector('[data-case-next]').addEventListener('click',()=>go(current+1));
  casesSection.addEventListener('keydown',event=>{if(event.key==='ArrowRight')go(current+1);if(event.key==='ArrowLeft')go(current-1);}); cases.forEach(item=>{item.tabIndex=0;}); go(0);
}

// The global header reflects the section currently in view.
const navLinks=[...document.querySelectorAll('.site-navigation a[href*="#"]')];
const observedSections=navLinks.map(link=>document.querySelector(link.hash)).filter(Boolean);
if (observedSections.length && 'IntersectionObserver' in window) { const sectionObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){navLinks.forEach(link=>link.classList.toggle('is-active',link.hash===`#${entry.target.id}`));}}),{rootMargin:'-25% 0px -60% 0px',threshold:0}); observedSections.forEach(section=>sectionObserver.observe(section)); }

// A restrained destination-hero drift adds depth without turning the page into a motion demo.
const parallaxHeroes = [...document.querySelectorAll('.destination-hero .hero-image')];
if (parallaxHeroes.length && !motion.matches) {
  let ticking = false;
  const updateParallax = () => {
    const offset = Math.min(window.scrollY * .045, 28);
    parallaxHeroes.forEach(image => image.style.setProperty('--hero-parallax', `${offset}px`));
    ticking = false;
  };
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(updateParallax); } }, {passive:true});
  updateParallax();
}
