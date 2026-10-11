const faviconFallback = '•'

function escapeXml(value: string): string {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&apos;',
    }
    return entities[character] ?? character
  })
}

export function applyFavicon(initials: string): void {
  try {
    const identity = Array.from(initials.trim()).slice(0, 2).join('') || faviconFallback
    const fontSize = Array.from(identity).length > 1 ? 22 : 28
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48"><rect width="48" height="48" fill="#171715"/><text x="24" y="25" fill="#f4f4f1" font-family="Arial, Helvetica, sans-serif" font-size="${fontSize}" font-weight="600" text-anchor="middle" dominant-baseline="central">${escapeXml(identity)}</text></svg>`
    const link = document.querySelector<HTMLLinkElement>('link[rel~="icon"]') ?? document.createElement('link')
    link.rel = 'icon'
    link.type = 'image/svg+xml'
    link.href = `data:image/svg+xml,${encodeURIComponent(svg)}`
    if (!link.isConnected) document.head.append(link)
  } catch {
    // A favicon is optional; identity rendering must not prevent the app from starting.
  }
}
