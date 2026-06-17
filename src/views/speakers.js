import { speakers } from '../data/content.js';
import { pageShell, audioPlayerHtml } from '../shared/ui.js';
import { path } from '../shared/paths.js';

export function renderSpeakers() {
  return pageShell({
    title: 'Наши дикторы',
    breadcrumb: `<a href="${path('/')}" data-link>Главная</a><span>/</span><span>Дикторы</span>`,
    children: `
      <div class="container page__content">
        <p class="page__lead" data-reveal>Каталог голосов с тегами, образованием и ссылками на прослушивание. Нажмите на карточку — откроется профиль.</p>
        <div class="speakers__grid speakers__grid--full">
          ${speakers
            .map(
              (s, i) => `
            <article class="speaker-card" data-reveal data-delay="${i * 40}">
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
    `,
  });
}
