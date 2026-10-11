export type WorkType = 'research' | 'project' | 'editorial'

export interface WorkMedia {
  src: string
  alt: string
  caption?: string
  aspectRatio?: string
}

export interface WorkLink {
  label: string
  url: string
}

export interface WorkMetric {
  label: string
  value: string
}

export type WorkSectionHeading = 'overview' | 'contribution' | 'approach' | 'method' | 'results' | 'architecture' | 'resources' | 'screens'

interface WorkSectionBase {
  id: string
  title?: string
  titleLang?: string
  headingKey?: WorkSectionHeading
}

export type WorkSection = WorkSectionBase & (
  | { type: 'text'; body: string; bodyLang?: string }
  | { type: 'media'; media: WorkMedia }
  | { type: 'media-grid'; media: WorkMedia[] }
  | { type: 'metrics'; metrics: WorkMetric[] }
  | { type: 'links'; links: WorkLink[] }
)

export interface WorkItem {
  id: string
  slug: string
  type: WorkType
  year?: number
  title: string
  titleLang?: string
  summary?: string
  summaryLang?: string
  role?: string
  venue?: string
  status?: string
  meta: string[]
  cover: WorkMedia
  links?: WorkLink[]
  sections?: WorkSection[]
  featured: boolean
}

// One source drives the homepage rows, previews, and every detail-page section.
export const works: WorkItem[] = [
  {
    id: 'research-01',
    slug: 'example-camouflaged-object-research',
    type: 'research',
    year: 2026,
    title: 'Example Paper Title: Training-Free Camouflaged Object Discovery',
    summary: 'Training-free object discovery from pretrained visual features.',
    role: 'Research and implementation · Demo',
    venue: 'Example computer-vision venue',
    status: 'Example publication status · replace before publishing',
    meta: ['DINOv2', 'UCOD', 'Multi-scale fusion'],
    cover: {
      src: '/images/research-abstract.svg',
      alt: 'Abstract demo artwork for a fictional computer-vision research entry.',
      caption: 'Illustrative cover artwork · replace with a verified paper figure.',
      aspectRatio: '16 / 10',
    },
    links: [
      { label: 'Example paper', url: 'https://example.com/' },
      { label: 'Example code', url: 'https://example.com/' },
    ],
    sections: [
      {
        id: 'approach',
        type: 'text',
        headingKey: 'approach',
        bodyLang: 'en',
        body: 'A fictional example of a training-free pipeline: compare pretrained visual features across scales, combine candidate regions, then refine the resulting masks.',
      },
      {
        id: 'method-figure',
        type: 'media',
        headingKey: 'method',
        media: {
          src: '/images/research-method.svg',
          alt: 'Illustrative three-step method diagram for the fictional research example.',
          caption: 'Example feature, fusion, and refinement stages.',
          aspectRatio: '16 / 9',
        },
      },
      {
        id: 'demo-setup',
        type: 'metrics',
        title: 'Example setup',
        metrics: [
          { label: 'Input views', value: 'Three-scale demo' },
          { label: 'Training', value: 'None · placeholder' },
          { label: 'Evaluation', value: 'Example datasets' },
        ],
      },
      {
        id: 'qualitative-panels',
        type: 'media-grid',
        title: 'Illustrative panels',
        media: [
          {
            src: '/images/research-qualitative.svg',
            alt: 'Illustrative input and mask comparison; not a measured research result.',
            caption: 'Input and predicted-mask example · illustrative only.',
            aspectRatio: '16 / 10',
          },
          {
            src: '/images/research-refinement.svg',
            alt: 'Illustrative mask refinement comparison; not a measured research result.',
            caption: 'Refinement stages · illustrative only.',
            aspectRatio: '16 / 10',
          },
        ],
      },
    ],
    featured: true,
  },
  {
    id: 'project-01',
    slug: 'example-notes-research-library',
    type: 'project',
    year: 2025,
    title: 'Example Project: Cross-Platform Notes & Research Library',
    summary: 'A sample workspace for notes, files, and reading across devices.',
    role: 'Full-stack development · Demo',
    status: 'Example software project',
    meta: ['Vue 3', 'Kotlin', 'Object storage'],
    cover: {
      src: '/images/project-abstract.svg',
      alt: 'Abstract demo interface artwork for a fictional cross-platform project.',
      caption: 'Illustrative interface artwork · not a product screenshot.',
      aspectRatio: '16 / 10',
    },
    links: [
      { label: 'Example repository', url: 'https://example.com/' },
      { label: 'Example project demo', url: 'https://example.com/' },
    ],
    sections: [
      {
        id: 'system-outline',
        type: 'text',
        headingKey: 'architecture',
        bodyLang: 'en',
        body: 'This fictional product record demonstrates a shared file and reading workflow, with a browser client, a phone client, and an example service layer.',
      },
      {
        id: 'client-previews',
        type: 'media-grid',
        headingKey: 'screens',
        media: [
          {
            src: '/images/project-web-ui.svg',
            alt: 'Illustrative desktop workspace interface for a fictional software demo.',
            caption: 'Browser workspace · illustrative interface.',
            aspectRatio: '16 / 10',
          },
          {
            src: '/images/project-mobile-ui.svg',
            alt: 'Illustrative phone workspace interface for a fictional software demo.',
            caption: 'Phone workspace · illustrative interface.',
            aspectRatio: '16 / 10',
          },
        ],
      },
      {
        id: 'architecture',
        type: 'media',
        headingKey: 'architecture',
        media: {
          src: '/images/project-architecture.svg',
          alt: 'Illustrative client, API, and storage architecture for a fictional project.',
          caption: 'Example client-to-service flow.',
          aspectRatio: '16 / 9',
        },
      },
      {
        id: 'demo-scope',
        type: 'metrics',
        title: 'Demo scope',
        metrics: [
          { label: 'Clients', value: 'Web + Android' },
          { label: 'Core flow', value: 'Notes + files' },
          { label: 'Service', value: 'Example API' },
        ],
      },
      {
        id: 'project-notes',
        type: 'links',
        headingKey: 'resources',
        links: [{ label: 'Example architecture notes', url: 'https://example.com/' }],
      },
    ],
    featured: true,
  },
  {
    id: 'editorial-01',
    slug: 'example-book-editorial-contribution',
    type: 'editorial',
    year: 2024,
    title: 'Example Book Title: Foundations of Practical Computing',
    summary: 'Proofreading and editorial review for an example computing book.',
    role: 'Proofreading and revision · Demo',
    status: 'Editorial contribution · not authorship',
    meta: ['Book', 'Editorial review'],
    cover: {
      src: '/images/editorial-abstract.svg',
      alt: 'Abstract demo book artwork for a fictional editorial contribution.',
      caption: 'Illustrative cover artwork · replace with the real cover if available.',
      aspectRatio: '4 / 5',
    },
    links: [{ label: 'Example book listing', url: 'https://example.com/' }],
    sections: [
      {
        id: 'editorial-contribution',
        type: 'text',
        headingKey: 'contribution',
        bodyLang: 'en',
        body: 'A clearly labeled example of editorial work: proofreading, consistency checks, and revision of selected chapters. Replace bibliographic details and the contribution description with verified information.',
      },
      {
        id: 'inside-pages',
        type: 'media-grid',
        title: 'Example book material',
        media: [
          {
            src: '/images/editorial-interior.svg',
            alt: 'Illustrative sample interior page for a fictional book entry.',
            caption: 'Interior-page placeholder.',
            aspectRatio: '4 / 5',
          },
          {
            src: '/images/editorial-notes.svg',
            alt: 'Illustrative editorial notes page for a fictional book entry.',
            caption: 'Editorial notes placeholder.',
            aspectRatio: '4 / 5',
          },
        ],
      },
      {
        id: 'bibliographic-details',
        type: 'text',
        title: 'Bibliographic record',
        body: 'Example title and publication details are fictional. Add publisher, edition, ISBN, and the exact credited role only when verified.',
      },
    ],
    featured: true,
  },
]

