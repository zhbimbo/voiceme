import { serviceOptions } from '../data/content.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

export function initNav() {
  const header = $('.header');
  const toggle = $('.nav-toggle');
  const nav = $('.nav');
  if (!header) return;

  const onScroll = () => header.classList.toggle('header--scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll);
  onScroll();

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('nav--open');
    toggle.setAttribute('aria-expanded', open);
    document.body.classList.toggle('menu-open', open);
  });

  $$('[data-scroll]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      if (!href?.startsWith('#')) return;
      e.preventDefault();
      const target = $(href);
      if (target) {
        nav?.classList.remove('nav--open');
        toggle?.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

export function initReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add('is-visible'), Number(delay));
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  $$('[data-reveal]').forEach((el) => observer.observe(el));
}

export function initAudioPlayers(root = document) {
  let currentAudio = null;
  let currentWrap = null;

  $$('.audio-player', root).forEach((player) => {
    const wrap = player.closest('.case-card, .speaker-card, .speaker-detail, .case-detail, .speaker-preview');
    const btn = $('.audio-player__btn', player);
    const audio = wrap?.querySelector('audio') || player.nextElementSibling;
    const progress = $('.audio-player__progress', player);
    if (!btn || !audio) return;

    btn.addEventListener('click', async () => {
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentWrap?.classList.remove('is-playing');
      }

      if (audio.paused) {
        try {
          await audio.play();
          currentAudio = audio;
          currentWrap = wrap || player.parentElement;
          currentWrap?.classList.add('is-playing');
        } catch {
          player.classList.add('audio-player--error');
          const label = $('.audio-player__label', player);
          if (label) label.textContent = 'Скоро';
        }
      } else {
        audio.pause();
        wrap?.classList.remove('is-playing');
        currentAudio = null;
        currentWrap = null;
      }
    });

    audio.addEventListener('timeupdate', () => {
      if (progress) {
        const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
        progress.style.width = `${pct}%`;
      }
    });

    audio.addEventListener('ended', () => {
      wrap?.classList.remove('is-playing');
      if (progress) progress.style.width = '0%';
      if (currentAudio === audio) {
        currentAudio = null;
        currentWrap = null;
      }
    });
  });
}

export function initForm() {
  const form = $('#contact-form');
  if (!form) return;

  const select = $('#service');
  if (select) {
    select.innerHTML =
      '<option value="">Выберите услугу</option>' +
      serviceOptions.map((o) => `<option value="${o}">${o}</option>`).join('');
  }

  const success = $('#form-success');
  const error = $('#form-error');
  const submitBtn = $('.form__submit', form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    success.hidden = true;
    error.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляем...';

    const payload = Object.fromEntries(new FormData(form).entries());

    const showDemoSuccess = () => {
      form.reset();
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    };

    if (import.meta.env.PROD) {
      console.log('[demo] Заявка (prod demo):', payload);
      showDemoSuccess();
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить заявку';
      return;
    }

    try {
      const res = await fetch('/api/telegram', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || 'Ошибка отправки');
      showDemoSuccess();
    } catch (err) {
      error.hidden = false;
      error.textContent =
        err.message === 'Failed to fetch'
          ? 'Сервер недоступен. Напишите нам в Telegram напрямую.'
          : err.message || 'Не удалось отправить заявку.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить заявку';
    }
  });
}

export function initHeroAnimation() {
  const hero = $('.hero__title');
  if (!hero) return;
  requestAnimationFrame(() => hero.classList.add('hero__title--animated'));
}

export function bootstrapPage() {
  initNav();
  initReveal();
  initAudioPlayers();
  initForm();
  initHeroAnimation();
}
