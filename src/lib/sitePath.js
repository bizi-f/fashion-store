const baseUrl = import.meta.env.BASE_URL || '/'

const trimTrailingSlash = (value) => (value.length > 1 && value.endsWith('/') ? value.slice(0, -1) : value)

export const withBase = (path = '/') => {
  if (!path) {
    return baseUrl
  }

  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('mailto:') || path.startsWith('tel:')) {
    return path
  }

  if (path.startsWith('#')) {
    return path
  }

  const normalizedBase = trimTrailingSlash(baseUrl)

  if (normalizedBase === '/') {
    if (path === '/') {
      return '/'
    }

    if (path.startsWith('/')) {
      return path
    }

    return `/${path}`
  }

  if (path === '/') {
    return `${normalizedBase}/`
  }

  if (path.startsWith('/')) {
    return `${normalizedBase}${path}`
  }

  return `${normalizedBase}/${path}`
}

export const normalizePathname = (pathname) => {
  const normalizedBase = trimTrailingSlash(baseUrl)

  if (normalizedBase !== '/' && pathname === normalizedBase) {
    return '/'
  }

  if (normalizedBase !== '/' && pathname.startsWith(`${normalizedBase}/`)) {
    const stripped = pathname.slice(normalizedBase.length)
    return stripped || '/'
  }

  return pathname
}
