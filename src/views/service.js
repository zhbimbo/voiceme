import { getService } from '../data/content.js';
import { pageShell, ctaBannerHtml } from '../shared/ui.js';
import { path } from '../shared/paths.js';

export function renderService(slug) {
  const service = getService(slug);
  if (!service) return null;

  return pageShell({
    title: service.title,
    breadcrumb: `<a href="${path('/')}" data-link>Главная</a><span>/</span><a href="${path('/#services')}" data-link>Услуги</a><span>/</span><span>${service.title}</span>`,
    children: `
      <div class="container page__content">
        <p class="page__lead" data-reveal>${service.description}</p>

        ${service.subtypes ? `
          <div class="subtypes" data-reveal>
            <h2 class="page__section-title">Разновидности</h2>
            <div class="subtypes__list">${service.subtypes.map((t) => `<span class="tag tag--lg">${t}</span>`).join('')}</div>
          </div>` : ''}

        <div class="process-block" data-reveal>
          <h2 class="page__section-title">Процесс записи</h2>
          <div class="process__grid">
            ${service.process.map((p) => `
              <article class="process-step">
                <span class="process-step__num">${p.step}</span>
                <h3 class="process-step__title">${p.title}</h3>
                <p class="process-step__desc">${p.description}</p>
              </article>`).join('')}
          </div>
        </div>

        <div class="examples-block" data-reveal>
          <h2 class="page__section-title">Примеры работ</h2>
          <ul class="examples__list">
            ${service.examples.map((e) => `<li>${e}</li>`).join('')}
          </ul>
          <p class="examples__note">Полные кейсы — в разделе <a href="${path('/#cases')}" data-link>Наши кейсы</a></p>
        </div>

        <div class="pricing-block" data-reveal>
          <h2 class="page__section-title">Прайс</h2>
          <table class="pricing-table">
            <tbody>
              ${service.pricing.map((p) => `<tr><td>${p.label}</td><td>${p.price}</td></tr>`).join('')}
            </tbody>
          </table>
          <p class="pricing__note">Цены ориентировочные для демо. Финальный расчёт — после брифа.</p>
        </div>

        <div class="service-actions" data-reveal>
          <a href="${path('/speakers')}" class="btn btn--primary" data-link>Дикторы</a>
          <a href="${path('/#contact')}" class="btn btn--ghost" data-link>Оставить заявку</a>
        </div>

        ${ctaBannerHtml('Заказать ' + service.title.toLowerCase())}
      </div>
    `,
  });
}
