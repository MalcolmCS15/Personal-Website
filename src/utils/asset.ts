export const withBase = (path?: string) => {
  if (!path) return path
  // Leave absolute URLs (http(s), protocol-relative) and data URIs untouched
  if (/^(https?:)?\/\//.test(path) || path.startsWith('data:')) return path
  const clean = path.startsWith('/') ? path.slice(1) : path
  // NOTE: must be the exact `import.meta.env.BASE_URL` form so Vite statically
  // inlines the base at build time. A cast or optional-chaining defeats the
  // replacement, leaving it undefined at runtime → base wrongly falls back to
  // '/' (breaks GitHub Pages project sites served from /<repo>/).
  const base = import.meta.env.BASE_URL || '/'
  const normalized = base.endsWith('/') ? base : base + '/'
  return normalized + clean
}
