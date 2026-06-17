const rawBase = import.meta.env.BASE_URL || '/';
export const BASE = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;

export function path(route = '/') {
  if (!route || route === '/') return BASE;

  if (route.startsWith('#')) {
    return `${BASE.replace(/\/$/, '')}${route}`;
  }

  const hashIdx = route.indexOf('#');
  if (hashIdx >= 0) {
    const pathname = route.slice(0, hashIdx) || '/';
    return `${path(pathname).replace(/\/$/, '')}${route.slice(hashIdx)}`;
  }

  return `${BASE}${route.replace(/^\//, '')}`;
}

export function stripBase(pathname) {
  const base = BASE.replace(/\/$/, '');
  if (base && base !== '/' && pathname.startsWith(base)) {
    return pathname.slice(base.length) || '/';
  }
  return pathname;
}
