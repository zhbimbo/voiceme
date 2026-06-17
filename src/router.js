import { path, stripBase } from './shared/paths.js';

export function matchRoute(pathname) {
  const p = stripBase(pathname);

  const routes = [
    { pattern: /^\/$/, name: 'home' },
    { pattern: /^\/services\/([^/]+)$/, name: 'service', param: 'slug' },
    { pattern: /^\/speakers$/, name: 'speakers' },
    { pattern: /^\/speakers\/([^/]+)$/, name: 'speaker', param: 'slug' },
    { pattern: /^\/cases\/([^/]+)$/, name: 'case', param: 'slug' },
  ];

  for (const route of routes) {
    const match = p.match(route.pattern);
    if (match) {
      return { name: route.name, slug: route.param ? match[1] : null };
    }
  }
  return { name: 'notFound', slug: null };
}

export function navigate(route) {
  history.pushState(null, '', path(route));
  window.dispatchEvent(new PopStateEvent('popstate'));
}

export function initRouter(onRoute) {
  const handle = () => onRoute(matchRoute(window.location.pathname));

  window.addEventListener('popstate', handle);

  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-link]');
    if (!link) return;
    const href = link.getAttribute('href');
    if (!href || href.startsWith('http') || href.startsWith('tel:') || href.startsWith('mailto:')) return;

    if (href.includes('#')) {
      const [routePath, hash] = href.split('#');
      const targetPath = routePath || '/';
      const currentPath = stripBase(window.location.pathname);

      if (targetPath === currentPath || (targetPath === '/' && currentPath === '/')) {
        e.preventDefault();
        if (hash) {
          const el = document.getElementById(hash);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        return;
      }

      e.preventDefault();
      navigate(`${targetPath}#${hash}`);
      return;
    }

    if (href.startsWith('/')) {
      e.preventDefault();
      const hashIdx = href.indexOf('#');
      const routePath = stripBase(hashIdx >= 0 ? href.slice(0, hashIdx) || '/' : href);
      const hash = hashIdx >= 0 ? href.slice(hashIdx) : '';
      navigate(routePath + hash);
    }
  });

  handle();
}
