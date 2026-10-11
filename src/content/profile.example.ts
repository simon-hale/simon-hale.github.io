export interface ProfileLinks {
  github?: string
  scholar?: string
  openreview?: string
  orcid?: string
  cv?: string
  email?: string
}

export interface ProfilePhoto {
  src: string
  alt: string
  aspectRatio?: '4:5' | '1:1'
}

export interface Profile {
  contentLanguage: string
  name: string
  initials: string
  role: string
  tagline: string
  photo?: ProfilePhoto
  links: ProfileLinks
}

export const profile: Profile = {
  // Demo content is English. Set this to zh-Hans for Chinese-authored production content.
  contentLanguage: 'en',
  name: 'Example Student',
  initials: 'ES',
  role: 'Computer Science Undergraduate · Developer & Researcher',
  tagline: 'Building useful software and exploring computer vision.',
  links: {
    github: 'https://example.com/',
    scholar: 'https://example.com/',
    orcid: 'https://example.com/',
    cv: '/documents/example-cv.pdf',
    email: 'example@example.com',
  },
}

export const profileLinks = [
  { key: 'github', label: 'GitHub' },
  { key: 'scholar', label: 'Google Scholar' },
  { key: 'orcid', label: 'ORCID' },
  { key: 'cv', label: 'CV' },
] as const
