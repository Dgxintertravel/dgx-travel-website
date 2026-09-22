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
    toggle.innerHTML = `${open ? 'Fechar' : 'Menu'} <span class="menu-glyph" aria-hidden="true"></span>`;
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
  const apply = () => { if(motion.matches) video.pause(); else video.play().catch(()=>{}); };
  apply(); motion.addEventListener('change',apply);
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

// Compact language menu with keyboard dismissal and an explicit PT return path.
const localeToggle=document.querySelector('.locale-toggle'), localePanel=document.querySelector('.locale-panel');
if(localeToggle){
  const close=()=>{localePanel.hidden=true;localeToggle.setAttribute('aria-expanded','false');};
  localeToggle.addEventListener('click',()=>{const open=localePanel.hidden;localePanel.hidden=!open;localeToggle.setAttribute('aria-expanded',String(open));});
  document.addEventListener('click',e=>{if(!e.target.closest('.locales'))close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&!localePanel.hidden){close();localeToggle.focus();}});
}

// Desktop editorial index, mobile accordion; every description remains in the HTML.
const serviceRows=[...document.querySelectorAll('.service-row')];
if(serviceRows.length){
  const list=document.querySelector('.service-list');
  const panel=document.createElement('div');panel.className='service-detail';panel.setAttribute('aria-hidden','true');list.append(panel);list.classList.add('enhanced');
  let selected=0;
  const select=(index,collapse=false)=>{
    selected=index;
    serviceRows.forEach((row,i)=>{const active=i===index&&!collapse;row.classList.toggle('is-active',active);row.querySelector('button').setAttribute('aria-expanded',String(active));row.querySelector('p').hidden=!active;});
    const row=serviceRows[index];panel.innerHTML=`<span class="detail-number">0${index+1} / 06</span><h3>${row.querySelector('.service-trigger>span:nth-child(2)').textContent}</h3><p>${row.querySelector('p').textContent}</p>`;
    if(!motion.matches)panel.animate([{opacity:.3,transform:'translateY(6px)'},{opacity:1,transform:'none'}],{duration:320});
  };
  serviceRows.forEach((row,i)=>{const button=row.querySelector('button');button.addEventListener('click',()=>select(i,matchMedia('(max-width:700px)').matches&&row.classList.contains('is-active')));button.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse'&&innerWidth>700)select(i);});button.addEventListener('keydown',e=>{if(['ArrowDown','ArrowUp','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?0:e.key==='End'?5:(selected+(e.key==='ArrowDown'?1:5))%6;select(next);serviceRows[next].querySelector('button').focus();}});});select(0);
}

// A four-stage timeline with a single reading area and a fine progress line.
const methodList=document.querySelector('.method-steps');
if(methodList){
 const items=[...methodList.children];const detail=document.createElement('div');detail.className='method-detail';detail.setAttribute('aria-hidden','true');methodList.after(detail);methodList.classList.add('enhanced');
 const select=index=>{items.forEach((item,i)=>{item.classList.toggle('is-active',i===index);item.querySelector('button').setAttribute('aria-expanded',String(i===index));item.querySelector('p').hidden=i!==index;});const item=items[index];detail.innerHTML=`<span class="process-number">0${index+1}</span><div><h3>${item.querySelector('button').lastChild.textContent}</h3><p>${item.querySelector('p').textContent}</p></div>`;methodList.style.setProperty('--progress',`${(index+1)/items.length*100}%`);};
 items.forEach((item,i)=>{let button=item.querySelector('button');button.addEventListener('click',()=>select(i));button.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')select(i);});button.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();let next=(i+(e.key==='ArrowRight'?1:3))%4;select(next);items[next].querySelector('button').focus();}});});select(0);
}

// Native horizontal scrolling handles touch, trackpads, focus and responsive resizing.
const casesSection=document.querySelector('.cases');
const cases=casesSection?[...casesSection.querySelectorAll(':scope>.case')]:[];
if(cases.length){
 const viewport=document.createElement('div');viewport.className='case-viewport';viewport.tabIndex=0;viewport.setAttribute('role','region');viewport.setAttribute('aria-label','Projetos DGX. Use as setas para navegar.');
 cases.forEach(item=>{item.classList.remove('reveal');item.classList.add('is-visible');viewport.append(item);});casesSection.append(viewport);
 const controls=document.createElement('div');controls.className='case-controls';const arrow='<svg viewBox="0 0 32 16" fill="none" aria-hidden="true"><path d="M1 8h29M23 1l7 7-7 7" stroke="currentColor" stroke-width="1"/></svg>';
 controls.innerHTML=`<span class="case-count" aria-live="polite">01 / 05</span><button type="button" data-case-prev aria-label="Case anterior">${arrow}</button><button type="button" data-case-next aria-label="Próximo case">${arrow}</button>`;casesSection.append(controls);
 let current=0;
 const update=()=>{let left=viewport.getBoundingClientRect().left;current=cases.reduce((best,item,i)=>Math.abs(item.getBoundingClientRect().left-left)<Math.abs(cases[best].getBoundingClientRect().left-left)?i:best,0);controls.querySelector('.case-count').textContent=`${String(current+1).padStart(2,'0')} / ${String(cases.length).padStart(2,'0')}`;controls.querySelector('[data-case-prev]').disabled=current===0;controls.querySelector('[data-case-next]').disabled=current===cases.length-1;};
 const go=index=>{const target=cases[Math.max(0,Math.min(index,cases.length-1))];viewport.scrollTo({left:viewport.scrollLeft+target.getBoundingClientRect().left-viewport.getBoundingClientRect().left,behavior:motion.matches?'instant':'smooth'});};
 viewport.addEventListener('scroll',update,{passive:true});controls.querySelector('[data-case-prev]').addEventListener('click',()=>go(current-1));controls.querySelector('[data-case-next]').addEventListener('click',()=>go(current+1));viewport.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();go(current+(e.key==='ArrowRight'?1:-1));}});update();
}

// Destination chapter navigation follows the reader and keeps headings below both bars.
const chapters=[...document.querySelectorAll('.chapter-nav a')];
if(chapters.length){
 let queued=false;const update=()=>{const line=(header?.offsetHeight||0)+document.querySelector('.chapter-nav').offsetHeight+45;let current=chapters[0];chapters.forEach(link=>{if(document.querySelector(link.hash)?.getBoundingClientRect().top<=line)current=link;});if(window.scrollY+innerHeight>=document.documentElement.scrollHeight-5)current=chapters[chapters.length-1];chapters.forEach(link=>{link.classList.toggle('is-active',link===current);if(link===current)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');});queued=false;};
 window.addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});update();
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
