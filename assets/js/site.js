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
