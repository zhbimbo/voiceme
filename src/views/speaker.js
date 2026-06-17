import { getSpeaker } from '../data/content.js';
import { pageShell, audioPlayerHtml, ctaBannerHtml } from '../shared/ui.js';
import { path } from '../shared/paths.js';

export function renderSpeaker(slug) {
  const speaker = getSpeaker(slug);
  if (!speaker) return null;

  return pageShell({
    title: speaker.name,
    breadcrumb: `<a href="${path('/')}" data-link>Главная</a><span>/</span><a href="${path('/speakers')}" data-link>Дикторы</a><span>/</span><span>${speaker.name}</span>`,
    children: `
      <div class="container speaker-detail" data-reveal>
        <div class="speaker-detail__layout">
          <div class="speaker-detail__photo">${speaker.name.split(' ').map((n) => n[0]).join('')}</div>
          <div class="speaker-detail__info">
            <div class="speaker-card__tags speaker-detail__tags">${speaker.tags.map((t) => `<span class="tag tag--lg">${t}</span>`).join('')}</div>
            <p class="speaker-detail__bio">${speaker.bio}</p>
            <div class="speaker-detail__meta">
              <div class="speaker-detail__field">
                <span class="speaker-detail__label">Образование</span>
                <span>${speaker.education}</span>
              </div>
              <div class="speaker-detail__field">
                <span class="speaker-detail__label">Прослушивание</span>
                <div class="speaker-detail__links">
                  ${speaker.links.map((l) => `<a href="${l.url}" target="_blank" rel="noopener">${l.label}</a>`).join('')}
                </div>
              </div>
            </div>
            <div class="speaker-detail__player">${audioPlayerHtml({ audio: speaker.audio, label: 'Пример голоса' })}</div>
            <a href="${path('/#contact')}" class="btn btn--primary" data-link>Заказать голос</a>
          </div>
        </div>
        ${ctaBannerHtml('Обсудить проект с ' + speaker.name.split(' ')[0])}
      </div>
    `,
  });
}
