import { getCase } from '../data/content.js';
import { pageShell, audioPlayerHtml, ctaBannerHtml } from '../shared/ui.js';
import { path } from '../shared/paths.js';

export function renderCase(slug) {
  const caseItem = getCase(slug);
  if (!caseItem) return null;

  return pageShell({
    title: caseItem.title,
    breadcrumb: `<a href="${path('/')}" data-link>Главная</a><span>/</span><a href="${path('/#cases')}" data-link>Кейсы</a><span>/</span><span>${caseItem.title}</span>`,
    children: `
      <div class="container case-detail" data-reveal>
        <div class="case-detail__meta">
          <span class="case-card__type">${caseItem.type}</span>
          <span class="case-card__duration">${caseItem.duration}</span>
        </div>
        <p class="case-detail__subtitle">${caseItem.subtitle}</p>
        <p class="case-detail__client">Клиент: ${caseItem.client}</p>
        <p class="page__lead">${caseItem.description}</p>
        <p class="case-detail__result"><strong>Результат:</strong> ${caseItem.result}</p>
        <div class="case-detail__player">${audioPlayerHtml({ audio: caseItem.audio, label: 'Фрагмент' })}</div>
        <div class="case-detail__placeholder">
          <p>Полная страница кейса в разработке — сюда добавят галерею, команду, отзыв редактора и доп. материалы.</p>
        </div>
        ${ctaBannerHtml('Хотите такой же проект?')}
      </div>
    `,
  });
}

export function renderNotFound() {
  return pageShell({
    title: 'Страница не найдена',
    breadcrumb: `<a href="${path('/')}" data-link>Главная</a>`,
    children: `
      <div class="container page__content" data-reveal>
        <p class="page__lead">Такой страницы нет. Вернитесь на главную.</p>
        <a href="${path('/')}" class="btn btn--primary" data-link>На главную</a>
      </div>
    `,
  });
}
