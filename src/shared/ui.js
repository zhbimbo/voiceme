import { site } from '../data/content.js';
import { path } from './paths.js';

export function audioPlayerHtml({ audio, label = 'Слушать', id = '' }) {
  const uid = id || `audio-${Math.random().toString(36).slice(2, 8)}`;
  return `
    <div class="audio-player" data-audio="${audio}" data-player-id="${uid}">
      <button class="audio-player__btn" type="button" aria-label="${label}">
        <span class="audio-player__icon audio-player__icon--play">▶</span>
        <span class="audio-player__icon audio-player__icon--pause">❚❚</span>
      </button>
      <div class="audio-player__track">
        <div class="audio-player__progress"></div>
      </div>
      <span class="audio-player__label">${label}</span>
    </div>
    <audio preload="metadata" src="${audio}"></audio>
  `;
}

export function headerHtml({ active = 'home' } = {}) {
  const links =
    active === 'home'
      ? [
          { href: '#services', label: 'Услуги', scroll: true },
          { href: '#speakers', label: 'Дикторы', scroll: true },
          { href: '#cases', label: 'Кейсы', scroll: true },
          { href: '#why', label: 'Почему мы', scroll: true },
          { href: '#contact', label: 'Связаться', scroll: true, cta: true },
        ]
      : [
          { href: path('/'), label: 'Главная' },
          { href: path('/#services'), label: 'Услуги' },
          { href: path('/speakers'), label: 'Дикторы' },
          { href: path('/#cases'), label: 'Кейсы' },
          { href: path('/#contact'), label: 'Связаться', cta: true },
        ];

  return `
    <header class="header">
      <div class="header__inner container">
        <a href="${path('/')}" class="logo" data-link>
          <span class="logo__mark">VM</span>
          <span class="logo__text">${site.name}</span>
        </a>
        <button class="nav-toggle" type="button" aria-label="Меню" aria-expanded="false">
          <span></span><span></span>
        </button>
        <nav class="nav">
          ${links
            .map(
              (l) => `
            <a href="${l.href}" class="nav__link${l.cta ? ' nav__link--cta' : ''}"${l.scroll ? ' data-scroll' : ' data-link'}>
              ${l.label}
            </a>`
            )
            .join('')}
        </nav>
      </div>
    </header>
  `;
}

export function footerHtml() {
  return `
    <footer class="footer">
      <div class="container footer__inner">
        <div class="footer__brand">
          <span class="logo__text">${site.nameMark}</span>
          <p>Дикторское агентство и студия звука</p>
        </div>
        <div class="footer__links">
          <a href="tel:${site.phoneRaw}">${site.phone}</a>
          <a href="${site.telegram}" target="_blank" rel="noopener">Telegram</a>
          <a href="${site.instagram}" target="_blank" rel="noopener">Instagram</a>
        </div>
        <p class="footer__copy">© <span id="year">${new Date().getFullYear()}</span> ${site.name} · ${site.city}</p>
      </div>
    </footer>
  `;
}

export function ctaBannerHtml(text = 'Обсудить проект') {
  return `
    <div class="cta-banner" data-reveal>
      <p class="cta-banner__text">Готовы начать? Расскажите о задаче — ответим в течение ${site.responseTime}.</p>
      <a href="${path('/#contact')}" class="btn btn--primary" data-link>${text}</a>
    </div>
  `;
}

export function pageShell({ title, breadcrumb, children }) {
  return `
    <div class="demo-bar">Демо-версия · все данные вымышленные</div>
    <div class="grain" aria-hidden="true"></div>
    ${headerHtml({ active: 'inner' })}
    <main class="page">
      <div class="container page__head" data-reveal>
        ${breadcrumb ? `<nav class="breadcrumb">${breadcrumb}</nav>` : ''}
        ${title ? `<h1 class="page__title">${title}</h1>` : ''}
      </div>
      ${children}
    </main>
    ${footerHtml()}
    <a href="${path('/#contact')}" class="fab-cta" data-link aria-label="Связаться">Связаться</a>
  `;
}

export function contactFormHtml() {
  return `
    <form class="form" id="contact-form">
      <div class="form__row">
        <label class="form__field">
          <span class="form__label">Имя</span>
          <input type="text" name="name" required placeholder="Как к вам обращаться?" />
        </label>
        <label class="form__field">
          <span class="form__label">Телефон или Telegram</span>
          <input type="text" name="contact" required placeholder="+7 ... или @username" />
        </label>
      </div>
      <label class="form__field">
        <span class="form__label">Тип услуги</span>
        <select name="service" id="service" required></select>
      </label>
      <label class="form__field">
        <span class="form__label">Описание задачи</span>
        <textarea name="message" rows="4" required placeholder="Что нужно озвучить, сроки, референсы..."></textarea>
      </label>
      <div class="form__row">
        <label class="form__field">
          <span class="form__label">Срок (опционально)</span>
          <input type="text" name="deadline" placeholder="Например, до 20 марта" />
        </label>
        <label class="form__field">
          <span class="form__label">Бюджет (опционально)</span>
          <input type="text" name="budget" placeholder="Примерный бюджет" />
        </label>
      </div>
      <button type="submit" class="btn btn--primary form__submit">Отправить заявку</button>
    </form>
    <div class="form__message form__message--success" id="form-success" hidden>
      <strong>Заявка отправлена!</strong>
      <p>Это демо — в реальной версии заявка уйдёт в Telegram.</p>
    </div>
    <div class="form__message form__message--error" id="form-error" hidden></div>
  `;
}
