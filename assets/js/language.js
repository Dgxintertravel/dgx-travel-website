try { if (localStorage.getItem('dgx-language') === 'pt' && !new URLSearchParams(location.search).has('choose')) location.replace('pt/'); } catch {}
document.querySelector('[data-lang="pt"]').addEventListener('click', () => { try { localStorage.setItem('dgx-language','pt'); } catch {} });
