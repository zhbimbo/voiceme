import { site, services, cases, clients, process, faq, serviceOptions } from './data/content.js';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function renderServices() {
  const grid = $('#services-grid');
  grid.innerHTML = services
    .map(
      (s) => `
    <article class="service-card" data-reveal>
      <span class="service-card__num">${s.icon}</span>
      <h3 class="service-card__title">${s.title}</h3>
      <p class="service-card__desc">${s.description}</p>
      <a href="#contact" class="service-card__link" data-scroll>Заказать →</a>
    </article>
  `
    )
    .join('');
}

function renderCases() {
  const grid = $('#cases-grid');
  grid.innerHTML = cases
    .map(
      (c, i) => `
    <article class="case-card" data-reveal data-delay="${i * 80}">
      <div class="case-card__top">
        <span class="case-card__type">${c.type}</span>
        <span class="case-card__duration">${c.duration}</span>
      </div>
      <h3 class="case-card__client">${c.client}</h3>
      <p class="case-card__result">${c.result}</p>
      <div class="audio-player" data-audio="${c.audio}">
        <button class="audio-player__btn" type="button" aria-label="Воспроизвести ${c.client}">
          <span class="audio-player__icon audio-player__icon--play">▶</span>
          <span class="audio-player__icon audio-player__icon--pause">❚❚</span>
        </button>
        <div class="audio-player__track">
          <div class="audio-player__progress"></div>
        </div>
        <span class="audio-player__label">Слушать</span>
      </div>
      <audio preload="metadata" src="${c.audio}"></audio>
    </article>
  `
    )
    .join('');
}

function renderClients() {
  const strip = $('#clients-strip');
  strip.innerHTML = clients.map((c) => `<span class="client-tag">${c}</span>`).join('');
}

function renderProcess() {
  const grid = $('#process-grid');
  grid.innerHTML = process
    .map(
      (p) => `
    <article class="process-step" data-reveal>
      <span class="process-step__num">${p.step}</span>
      <h3 class="process-step__title">${p.title}</h3>
      <p class="process-step__desc">${p.description}</p>
    </article>
  `
    )
    .join('');
}

function renderFaq() {
  const list = $('#faq-list');
  list.innerHTML = faq
    .map(
      (item, i) => `
    <details class="faq-item" data-reveal data-delay="${i * 50}">
      <summary class="faq-item__question">${item.question}</summary>
      <p class="faq-item__answer">${item.answer}</p>
    </details>
  `
    )
    .join('');
}

function renderServiceSelect() {
  const select = $('#service');
  select.innerHTML =
    '<option value="">Выберите услугу</option>' +
    serviceOptions.map((o) => `<option value="${o}">${o}</option>`).join('');
}

function initNav() {
  const header = $('.header');
  const toggle = $('.nav-toggle');
  const nav = $('.nav');

  window.addEventListener('scroll', () => {
    header.classList.toggle('header--scrolled', window.scrollY > 40);
  });

  toggle.addEventListener('click', () => {
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
        nav.classList.remove('nav--open');
        toggle.setAttribute('aria-expanded', 'false');
        document.body.classList.remove('menu-open');
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function initReveal() {
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
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  $$('[data-reveal]').forEach((el) => observer.observe(el));
}

function initAudioPlayers() {
  let currentAudio = null;
  let currentCard = null;

  $$('.case-card').forEach((card) => {
    const btn = $('.audio-player__btn', card);
    const audio = $('audio', card);
    const progress = $('.audio-player__progress', card);
    const player = $('.audio-player', card);

    btn.addEventListener('click', async () => {
      if (currentAudio && currentAudio !== audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentCard?.classList.remove('is-playing');
      }

      if (audio.paused) {
        try {
          await audio.play();
          currentAudio = audio;
          currentCard = card;
          card.classList.add('is-playing');
        } catch {
          player.classList.add('audio-player--error');
          $('.audio-player__label', card).textContent = 'Файл скоро будет';
        }
      } else {
        audio.pause();
        card.classList.remove('is-playing');
        currentAudio = null;
        currentCard = null;
      }
    });

    audio.addEventListener('timeupdate', () => {
      const pct = audio.duration ? (audio.currentTime / audio.duration) * 100 : 0;
      progress.style.width = `${pct}%`;
    });

    audio.addEventListener('ended', () => {
      card.classList.remove('is-playing');
      progress.style.width = '0%';
      if (currentAudio === audio) {
        currentAudio = null;
        currentCard = null;
      }
    });
  });
}

function initForm() {
  const form = $('#contact-form');
  const success = $('#form-success');
  const error = $('#form-error');
  const submitBtn = $('.form__submit', form);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    success.hidden = true;
    error.hidden = true;
    submitBtn.disabled = true;
    submitBtn.textContent = 'Отправляем...';

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

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

      if (!res.ok) {
        throw new Error(data.error || 'Ошибка отправки');
      }

      form.reset();
      success.hidden = false;
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } catch (err) {
      error.hidden = false;
      error.textContent =
        err.message === 'Failed to fetch'
          ? 'Сервер недоступен. Напишите нам в Telegram напрямую.'
          : err.message || 'Не удалось отправить заявку. Попробуйте Telegram.';
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Отправить заявку';
    }
  });
}

function renderContactInfo() {
  const channels = $('#contact-channels');
  channels.innerHTML = `
    <a href="tel:${site.phoneRaw}" class="contact__channel">
      <span class="contact__channel-label">Телефон</span>
      <span class="contact__channel-value">${site.phone}</span>
    </a>
    <a href="${site.telegram}" class="contact__channel" target="_blank" rel="noopener">
      <span class="contact__channel-label">Telegram</span>
      <span class="contact__channel-value">${site.telegramHandle}</span>
    </a>
    <a href="${site.instagram}" class="contact__channel" target="_blank" rel="noopener">
      <span class="contact__channel-label">Instagram</span>
      <span class="contact__channel-value">${site.instagramHandle}</span>
    </a>
  `;

  const footerLinks = $('#footer-links');
  footerLinks.innerHTML = `
    <a href="tel:${site.phoneRaw}">${site.phone}</a>
    <a href="${site.telegram}" target="_blank" rel="noopener">Telegram</a>
    <a href="${site.instagram}" target="_blank" rel="noopener">Instagram</a>
  `;

  const heroMeta = $('#hero-meta');
  if (heroMeta) {
    heroMeta.innerHTML = `<span>${site.city}</span><span>RU / EN</span><span>2026</span>`;
  }

  const footerCity = $('#footer-city');
  if (footerCity) footerCity.textContent = site.city;
}

function initYear() {
  $('#year').textContent = new Date().getFullYear();
}

function initSiteMeta() {
  document.title = `${site.name} — студия озвучки и аудио-продакшна`;
}

renderServices();
renderCases();
renderClients();
renderProcess();
renderFaq();
renderServiceSelect();
initNav();
initReveal();
initAudioPlayers();
initForm();
renderContactInfo();
initYear();
initSiteMeta();

export { site };
