import { site, services, speakers, cases, clients, reviews } from '../data/content.js';
import { headerHtml, footerHtml, audioPlayerHtml, contactFormHtml } from '../shared/ui.js';
import { path } from '../shared/paths.js';

export function renderHome() {
  const featuredSpeakers = speakers.filter((s) => s.featured);

  return `
    <div class="demo-bar">Демо-версия · все данные вымышленные</div>
    <div class="grain" aria-hidden="true"></div>
    ${headerHtml({ active: 'home' })}

    <main>
      <section class="hero" id="hero">
        <div class="hero__bg" aria-hidden="true">
          <div class="hero__bg-image"></div>
          <div class="hero__bg-gradient"></div>
        </div>
        <div class="hero__inner container">
          <div class="hero__meta" data-reveal>
            <span>${site.city}</span><span>RU / EN</span><span>2026</span>
          </div>
          <h1 class="hero__title">
            <span class="hero__title-line">VOICE</span>
            <span class="hero__title-line hero__title-line--accent">ME<span class="hero__asterisk">*</span></span>
          </h1>
          <p class="hero__tagline" data-reveal data-delay="200">${site.tagline}</p>
          <div class="hero__actions" data-reveal data-delay="320">
            <a href="#contact" class="btn btn--primary" data-scroll>Связаться</a>
            <a href="#services" class="btn btn--ghost" data-scroll>Наши услуги</a>
          </div>
        </div>
        <div class="hero__scroll" aria-hidden="true"><span>scroll</span><div class="hero__scroll-line"></div></div>
      </section>

      <section class="section about-intro" id="about">
        <div class="container about-intro__grid">
          <div data-reveal>
            <span class="section__label">01 / Кто мы</span>
            <h2 class="section__title">Дикторское агентство<br />полного цикла</h2>
          </div>
          <div class="about-intro__text" data-reveal data-delay="120">
            <p>${site.about}</p>
            <p class="about-intro__desc">${site.description}</p>
          </div>
        </div>
      </section>

      <section class="section services" id="services">
        <div class="container">
          <div class="section__head" data-reveal>
            <span class="section__label">02 / Услуги</span>
            <h2 class="section__title">Наши услуги</h2>
            <p class="section__subtitle">Аудиокниги, реклама, аудиогиды и музыка — каждая услуга с описанием, процессом и прайсом.</p>
          </div>
          <div class="services__grid">
            ${services
              .map(
                (s, i) => `
              <a href="${path(`/services/${s.id}`)}" class="service-card service-card--link" data-reveal data-delay="${i * 60}" data-link>
                <span class="service-card__num">${s.icon}</span>
                <h3 class="service-card__title">${s.title}</h3>
                <p class="service-card__desc">${s.short}</p>
                ${s.subtypes ? `<ul class="service-card__tags">${s.subtypes.slice(0, 3).map((t) => `<li>${t}</li>`).join('')}</ul>` : ''}
                <span class="service-card__link">Подробнее →</span>
              </a>`
              )
              .join('')}
          </div>
        </div>
      </section>

      <section class="section speakers-preview" id="speakers">
        <div class="container">
          <div class="section__head section__head--row" data-reveal>
            <div>
              <span class="section__label">03 / Дикторы</span>
              <h2 class="section__title">Наши дикторы</h2>
              <p class="section__subtitle">Фото, теги и пример голоса — полный каталог на отдельной странице.</p>
            </div>
            <a href="${path('/speakers')}" class="btn btn--ghost" data-link>Все дикторы</a>
          </div>
          <div class="speakers__grid">
            ${featuredSpeakers
              .map(
                (s, i) => `
              <article class="speaker-card speaker-preview" data-reveal data-delay="${i * 60}">
                <a href="${path(`/speakers/${s.id}`)}" class="speaker-card__link-wrap" data-link>
                  <div class="speaker-card__photo" aria-hidden="true">${s.name.split(' ').map((n) => n[0]).join('')}</div>
                  <h3 class="speaker-card__name">${s.name}</h3>
                  <div class="speaker-card__tags">${s.tags.map((t) => `<span class="tag">${t}</span>`).join('')}</div>
                </a>
                ${audioPlayerHtml({ audio: s.audio, label: 'Пример' })}
              </article>`
              )
              .join('')}
          </div>
        </div>
      </section>

      <section class="section cases" id="cases">
        <div class="container">
          <div class="section__head" data-reveal>
            <span class="section__label">04 / Кейсы</span>
            <h2 class="section__title">Наши кейсы</h2>
            <p class="section__subtitle">Книга, спектакль, реклама и музыка — каждый проект на отдельной странице.</p>
          </div>
          <div class="cases__grid">
            ${cases
              .map(
                (c, i) => `
              <a href="${path(`/cases/${c.id}`)}" class="case-card case-card--link" data-reveal data-delay="${i * 80}" data-link>
                <div class="case-card__top">
                  <span class="case-card__type">${c.type}</span>
                  <span class="case-card__duration">${c.duration}</span>
                </div>
                <h3 class="case-card__client">${c.title}</h3>
                <p class="case-card__subtitle">${c.subtitle}</p>
                <p class="case-card__result">${c.result}</p>
                <span class="case-card__more">Смотреть кейс →</span>
              </a>`
              )
              .join('')}
          </div>
        </div>
      </section>

      <section class="section why" id="why">
        <div class="container why__grid">
          <div data-reveal>
            <span class="section__label">05 / Почему мы</span>
            <h2 class="section__title">Почему стоит<br />работать с нами</h2>
          </div>
          <ul class="why__list" data-reveal data-delay="100">
            ${site.whyUs.map((item, i) => `<li class="why__item" data-reveal data-delay="${i * 50}"><span class="why__num">0${i + 1}</span>${item}</li>`).join('')}
          </ul>
        </div>
      </section>

      <section class="section clients" id="clients">
        <div class="container">
          <div class="section__head" data-reveal>
            <span class="section__label">06 / Клиенты</span>
            <h2 class="section__title">Нам доверяют</h2>
            <p class="section__subtitle">Издательства и бренды, с которыми мы работали.</p>
          </div>
          <div class="clients__grid" data-reveal>
            ${clients.map((c) => `<div class="client-logo"><span class="client-logo__abbr">${c.abbr}</span><span class="client-logo__name">${c.name}</span></div>`).join('')}
          </div>
        </div>
      </section>

      <section class="section reviews" id="reviews">
        <div class="container">
          <div class="section__head" data-reveal>
            <span class="section__label">07 / Отзывы</span>
            <h2 class="section__title">Что говорят<br />о нас</h2>
          </div>
          <div class="reviews__grid">
            ${reviews
              .map(
                (r, i) => `
              <blockquote class="review-card" data-reveal data-delay="${i * 60}">
                <p class="review-card__text">«${r.text}»</p>
                <footer class="review-card__author"><strong>${r.author}</strong><span>${r.role}</span></footer>
              </blockquote>`
              )
              .join('')}
          </div>
        </div>
      </section>

      <section class="section contact" id="contact">
        <div class="container contact__grid">
          <div class="contact__info" data-reveal>
            <span class="section__label">08 / Контакты</span>
            <h2 class="section__title">Связаться<br />с нами</h2>
            <p class="contact__text">Оставьте заявку — ответим в течение ${site.responseTime}. Или напишите напрямую.</p>
            <div class="contact__channels">
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
            </div>
            <div class="contact__map" data-reveal data-delay="120">
              <div class="map-placeholder">
                <span class="map-placeholder__pin">📍</span>
                <strong>${site.address}</strong>
                <p>Точный адрес и карта — после согласования</p>
              </div>
            </div>
          </div>
          <div class="contact__form-wrap" data-reveal data-delay="100">
            ${contactFormHtml()}
          </div>
        </div>
      </section>
    </main>

    ${footerHtml()}
    <a href="#contact" class="fab-cta" data-scroll aria-label="Связаться">Связаться</a>
  `;
}
