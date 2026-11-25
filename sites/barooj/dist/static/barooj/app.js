'use strict';

const toggle = document.querySelector('.mobile-toggle');
const mobileNav = document.querySelector('#mobile-nav');
function closeNavigation() {
  mobileNav.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'باز کردن منو');
}
toggle.addEventListener('click', () => {
  const opening = toggle.getAttribute('aria-expanded') !== 'true';
  mobileNav.hidden = !opening;
  toggle.setAttribute('aria-expanded', String(opening));
  toggle.setAttribute('aria-label', opening ? 'بستن منو' : 'باز کردن منو');
});
mobileNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNavigation));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNavigation(); });
document.addEventListener('click', event => { if (!event.target.closest('.header')) closeNavigation(); });

const filters = [...document.querySelectorAll('.filter')];
const cards = [...document.querySelectorAll('.food-card')];
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(filter => {
    const selected = filter === button;
    filter.classList.toggle('active', selected);
    filter.setAttribute('aria-pressed', String(selected));
  });
  let count = 0;
  cards.forEach(card => {
    const visible = button.dataset.filter === 'all' || card.dataset.category === button.dataset.filter;
    card.hidden = !visible;
    if (visible) count++;
  });
  document.querySelector('.menu-count').textContent = new Intl.NumberFormat('fa-IR').format(count) + ' طعم آشنا';
}));

const dishes = {
  ash: { title: 'آش رشته', description: 'طعم آشنای عصرهای خنک؛ یک کاسه آش با عطر سبزی و پیازداغ که با کشک و نعناع داغ کامل می‌شود.', ingredients: 'رشتهٔ آش، نخود، لوبیا، عدس، سبزی آش، کشک، پیاز و نعناع.', allergens: 'حاوی گندم و لبنیات.' },
  sholeh: { title: 'آش شله‌قلمکار', description: 'آشی پرملات با بافتی یکدست؛ از آن طعم‌هایی که راز خوشمزگی‌شان در آرام پختن و حوصله است.', ingredients: 'گوشت، برنج، حبوبات، سبزی آش و پیاز.', allergens: 'ترکیب نهایی و مواد حساسیت‌زا پیش از سفارش باید با آشکده بررسی شود.' },
  halim: { title: 'حلیم گندم', description: 'یک صبح آرام با حلیم گرم و نرم؛ همراه عطر دارچین، به سلیقهٔ شما با شکر یا نمک.', ingredients: 'گندم، گوشت و دارچین.', allergens: 'حاوی گندم؛ افزودنی‌ها پیش از سفارش بررسی شوند.' },
  kashk: { title: 'کشک بادمجان', description: 'ترکیب دل‌نشین بادمجان و کشک، با گردو و نعناع داغ؛ پیشنهادی برای کنار نان و دورهمی.', ingredients: 'بادمجان، کشک، گردو، پیاز، سیر و نعناع.', allergens: 'حاوی لبنیات و گردو.' }
};
const dialog = document.querySelector('#dish-dialog');
document.querySelectorAll('[data-dish]').forEach(button => button.addEventListener('click', () => {
  const dish = dishes[button.dataset.dish];
  document.querySelector('#dialog-title').textContent = dish.title;
  document.querySelector('#dialog-description').textContent = dish.description;
  document.querySelector('#dialog-ingredients').textContent = dish.ingredients;
  document.querySelector('#dialog-allergens').textContent = dish.allergens;
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
function closeDialog() { dialog.close(); }
document.querySelector('.dialog-close').addEventListener('click', closeDialog);
document.querySelector('.dialog-done').addEventListener('click', closeDialog);
dialog.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) closeDialog(); } });
dialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));

if ('IntersectionObserver' in window) {
  const navLinks = [...document.querySelectorAll('.desktop-nav a')];
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) navLinks.forEach(link => link.classList.toggle('active', link.hash === '#' + entry.target.id));
    });
  }, { rootMargin: '-15% 0px -55% 0px', threshold: 0 });
  document.querySelectorAll('#home, #menu, #story, #contact').forEach(section => observer.observe(section));
}
