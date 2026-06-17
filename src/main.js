import { initRouter } from './router.js';
import { bootstrapPage } from './shared/init.js';
import { renderHome } from './views/home.js';
import { renderService } from './views/service.js';
import { renderSpeakers } from './views/speakers.js';
import { renderSpeaker } from './views/speaker.js';
import { renderCase, renderNotFound } from './views/case.js';
import { site, getService, getSpeaker, getCase } from './data/content.js';

const app = document.getElementById('app');

function render(route) {
  let html = '';

  switch (route.name) {
    case 'home':
      html = renderHome();
      document.title = `${site.nameMark} — дикторское агентство`;
      break;
    case 'service': {
      const svc = getService(route.slug);
      html = svc ? renderService(route.slug) : renderNotFound();
      document.title = svc ? `${svc.title} — ${site.name}` : `404 — ${site.name}`;
      break;
    }
    case 'speakers':
      html = renderSpeakers();
      document.title = `Дикторы — ${site.name}`;
      break;
    case 'speaker': {
      const sp = getSpeaker(route.slug);
      html = sp ? renderSpeaker(route.slug) : renderNotFound();
      document.title = sp ? `${sp.name} — ${site.name}` : `404 — ${site.name}`;
      break;
    }
    case 'case': {
      const c = getCase(route.slug);
      html = c ? renderCase(route.slug) : renderNotFound();
      document.title = c ? `${c.title} — ${site.name}` : `404 — ${site.name}`;
      break;
    }
    default:
      html = renderNotFound();
      document.title = `404 — ${site.name}`;
  }

  app.innerHTML = html;
  window.scrollTo(0, 0);

  bootstrapPage();

  const hash = window.location.hash;
  if (hash) {
    requestAnimationFrame(() => {
      const el = document.querySelector(hash);
      el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }
}

initRouter(render);
