export type HonorType = 'scholarship' | 'competition' | 'honor'

export interface Honor {
  year?: number
  type: HonorType
  title: string
  issuer?: string
  level?: string
  description?: string
}

export const honors: Honor[] = [
  {
    year: 2026,
    type: 'scholarship',
    title: 'Example National Scholarship',
    issuer: 'Example University',
    level: 'Example full-tuition award',
  },
  {
    year: 2025,
    type: 'competition',
    title: 'Example Computer Science Competition',
    issuer: 'Example Computing Association',
    level: 'National First Prize · Demo award',
  },
  {
    year: 2025,
    type: 'scholarship',
    title: 'Example Academic Excellence Scholarship',
    issuer: 'Example University',
    level: 'Annual merit award · Demo',
  },
  {
    year: 2024,
    type: 'honor',
    title: 'Example Faculty Recognition',
    issuer: 'Example University',
    level: 'Academic contribution · Demo',
  },
]
