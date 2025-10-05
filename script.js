// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// References: auto-rotate every 8s + swipe on mobile
const quotes = Array.from(document.querySelectorAll('.quote.single'));
const dots = Array.from(document.querySelectorAll('.dots .dot'));
let idx = 0, startX = null;

function show(i){
  quotes.forEach((q, n) => q.hidden = n !== i);
  dots.forEach((d, n) => {
    d.classList.toggle('active', n === i);
    d.setAttribute('aria-selected', n === i ? 'true' : 'false');
  });
}
function next(){ idx = (idx + 1) % quotes.length; show(idx); }

let timer = setInterval(next, 8000);
function resetTimer(){ clearInterval(timer); timer = setInterval(next, 8000); }

// Dots click
dots.forEach((d, n) => d.addEventListener('click', () => { idx = n; show(idx); resetTimer(); }));

// Swipe handlers
const touchArea = document.querySelector('#references .container');
touchArea.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, {passive:true});
touchArea.addEventListener('touchend', e => {
  if(startX === null) return;
  const diff = e.changedTouches[0].clientX - startX;
  if(Math.abs(diff) > 50){
    idx = (idx + (diff < 0 ? 1 : -1) + quotes.length) % quotes.length;
    show(idx); resetTimer();
  }
  startX = null;
}, {passive:true});

show(0);

// --- Mobile menu toggle ---
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('#primary-menu');

if (menuToggle && menu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  // Luk når der klikkes på et link (bedre UX)
  menu.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', () => {
      menu.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}
