# Personal Homepage

A responsive academic and developer portfolio built with Vue 3, TypeScript, Vite, Vue Router, Vue I18n, and GSAP. It is a static site with no backend, account system, or CMS.

> **Demo content:** Names, GPA, rank, awards, publication details, contact information, and external links are fictional examples for design review. Replace them with verified information before publishing.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

## Production build

```bash
npm run build
npm run preview
```

The production files are written to `dist/`. Configure the static host to serve `index.html` for direct visits to `/work/:slug` routes.

## Replace demo content

Most portfolio updates belong in these four files:

| Content | File |
| --- | --- |
| Name, role, tagline, social links, CV, email, optional portrait | `src/content/profile.ts` |
| Research, software projects, book/editorial work, media and detail links | `src/content/works.ts` |
| University, degree, study period, GPA, rank, focus and selected coursework | `src/content/academic.ts` |
| Scholarships, competition awards and other honors | `src/content/honors.ts` |

Replace the local demo artwork in `public/images/` with optimized images, then update each work item's `cover.src`, `cover.alt`, and `cover.aspectRatio` in `works.ts`. Keep captions and alt text accurate. The example CV is at `public/documents/example-cv.pdf`; replace the file and `profile.links.cv` path together.

### Hero portrait

The Hero reads its optional portrait from `profile.photo` in `src/content/profile.ts`. Put an optimized image in `public/images/`, then configure its source, meaningful alt text, and optional crop ratio:

```ts
photo: {
  src: '/images/profile.webp',
  alt: 'Portrait of Example Student',
  aspectRatio: '4:5', // or '1:1'
},
```

The current demo has no personal portrait asset, so `photo` is omitted. Remove the `photo` field entirely to use the text-only Hero: no portrait component, image request, placeholder, or empty column is rendered. When configured, the portrait sits beside the introduction on wide screens and below the identity and links on narrower screens. Its aspect ratio and space are reserved before the image loads; a failed image stays hidden without collapsing that Hero geometry or affecting later sections. The alt text is authored with the profile data and follows `profile.contentLanguage`.

### Site identity

The header's home link uses `profile.name` as the visible brand and keeps that full name as its accessible label at every screen width. At very narrow widths, the visible name may switch to plain-text `profile.initials`. The browser-tab favicon is generated from those initials at startup, so no separate logo or favicon file needs to be maintained.

### Academic data

`src/content/academic.ts` contains the public academic summary: `university`, `degree`, `major`, `startYear`, `endYear`, optional `gpa` and `rank`, optional `focus`, and curated `coursework` groups. Each group has a semantic `category` key (`computer_science`, `mathematics`, or `ai`) and a list of `{ name, grade }` courses. The category labels are translated by the interface. All example grades are fictional placeholders; replace them with accurate public information before publishing.

Coursework is intentionally curated and does not represent a full transcript. Only courses included in this file appear on the site; add only courses you deliberately choose to share. There is no hidden complete course database, semester browser, or transcript expansion. No semesters, credits, course codes, visibility flags, or course statistics are stored. GPA and rank are optional; the education identity and selected coursework remain independently displayable when either is omitted.

The Academic section summarizes education, overall performance when provided, and relevant technical foundation. To edit a selected course or grade, update the groups directly in `src/content/academic.ts`, for example:

```ts
{
  category: 'computer_science',
  courses: [
    { name: 'Operating Systems', grade: 94 },
  ],
}
```

The responsive layout reads the same curated data for desktop, tablet, and mobile. The list is not intended to represent a full transcript.

### Interface language and personal content

The interface supports Simplified Chinese (`zh-Hans`) and English (`en`). The compact header switch changes the current page in place and saves the choice as `portfolio-locale` in local storage. New visits default to Simplified Chinese when no valid saved choice exists. The interface language is also reflected in `<html lang>` and page metadata; the language preference is independent of the System / Light / Dark theme preference.

Reusable interface labels live in `src/i18n/locales/zh-Hans.ts` and `src/i18n/locales/en.ts`. Keep their message keys aligned when adding UI text. Vue I18n uses Composition API mode (`legacy: false`). Switching the interface language does not translate or duplicate personal data in `src/content/`.

`content/` contains user-authored information; `i18n/` contains reusable interface vocabulary. The demo copy is English, so `profile.contentLanguage` currently uses `en`. For a production profile written primarily in Simplified Chinese, set it to `zh-Hans`. Keep each item in one language: use optional `titleLang`, `summaryLang`, `bodyLang`, or `nameLang` only when a work title, summary, section body, or course name differs from the profile's primary content language. A custom work-section `title` can also use `titleLang`.

For example, an English paper title and a Chinese summary stay in one record:

```ts
{
  type: 'research',
  title: 'English Paper Title',
  titleLang: 'en',
  summary: '这里填写一次中文介绍。',
}
```

Work sections can use a translated `headingKey` such as `overview`, `approach`, `architecture`, or `screens`. A custom `title` takes precedence over `headingKey` and remains authored content. Work types, honor types, and coursework categories use semantic keys, so adding content with an existing type or category does not require a new locale entry. Routes remain language-neutral.

### Work and honors data

Each `WorkItem` in `works.ts` feeds the homepage row, desktop preview, mobile media, and detail route. Keep `id` and `slug` unique. `type` selects Research, Project, or Editorial contribution; `featured` controls homepage inclusion; `cover` supplies its local preview; and top-level `links` supplies the detail-page actions. The book sample is an editorial contribution and does not imply authorship.

Work details use optional `role`, `venue`, `status`, and `meta` fields. `summary` is the short description used on the homepage and detail page. Add longer material as ordered `sections`; each section has a unique `id` and one of these types:

- `text`: a `body` paragraph.
- `media`: one `media` object with `src`, `alt`, and optional `caption` / `aspectRatio`.
- `media-grid`: a `media` array for related images.
- `metrics`: a `metrics` array of `{ label, value }` facts.
- `links`: a `links` array for additional resources.

Example:

```ts
{
  id: 'example-project',
  slug: 'example-project',
  type: 'project',
  year: 2026,
  title: 'Example Project',
  summary: 'A short description shared by the homepage and detail page.',
  role: 'Design and implementation',
  status: 'In progress',
  meta: ['Vue 3', 'TypeScript'],
  cover: { src: '/images/project-cover.webp', alt: 'Project cover image', aspectRatio: '16 / 10' },
  links: [{ label: 'Repository', url: 'https://example.com/repo' }],
  sections: [
    { id: 'overview', type: 'text', headingKey: 'overview', body: 'A longer project description.' },
    { id: 'screens', type: 'media-grid', headingKey: 'screens', media: [
      { src: '/images/screen.webp', alt: 'Main application screen', caption: 'Main view' },
    ] },
  ],
  featured: true,
}
```

The homepage preview, mobile thumbnail, and detail cover read from the same `cover` field. The same `sections` array drives the detail page below the cover.

Each `Honor` in `honors.ts` uses `type: 'scholarship' | 'competition' | 'honor'`. The homepage shows all entries, sorted by year, and omits only individual empty fields.

## Project structure

```text
src/
├── assets/styles/       Design tokens, typography, base styles, motion
├── components/          Layout, work, academic, media, and profile components
├── composables/         Theme preference, GSAP reveals, reduced motion, media loading
├── content/             The four editable portfolio data files
├── i18n/                 Chinese and English interface messages
├── router/              Home and work-detail routes
├── types/               Vue I18n message schema augmentation
└── views/               Homepage and work-detail page
public/
├── documents/           Demo CV file
├── fonts/               Self-hosted Inter Variable and its license
└── images/              Local work preview artwork
```

## Typography

The site self-hosts one web font: Inter Variable at `public/fonts/InterVariable.woff2`, loaded through `@font-face` in `src/assets/styles/typography.css`. The font file is preloaded locally; no font CDN or second bundled typeface is used. Chinese glyphs fall back to system CJK fonts, while technical labels use the operating system's monospace stack. The bundled font's SIL Open Font License is at `public/fonts/LICENSE.txt`.

## Theme and design tokens

The header theme button cycles through **System**, **Light**, and **Dark**. System follows the operating-system preference and updates when that preference changes. Light and Dark choices are saved in local storage; choosing System clears that override. Theme and interface language are separate preferences (`portfolio-theme` and `portfolio-locale`). An early script in `index.html` applies the saved theme and language metadata before the page paints. Theme transitions are enabled after app initialization and shortened by the reduced-motion preference.

Both palettes use semantic CSS variables in `src/assets/styles/tokens.css`: `--bg`, `--surface`, `--surface-hover`, `--text-primary`, `--text-secondary`, `--text-tertiary`, `--line`, `--accent`, and `--header-bg`. Add interface colors there rather than hardcoding them in component styles. Media assets keep their original colors in both themes.

## Motion and accessibility

GSAP handles the short hero entrance, section reveals, and image reveals. On wide screens, the selected work list has a reserved preview column that updates on pointer hover or keyboard focus; tablet and phone layouts use compact thumbnails beside each work item. No content depends on hover. Media uses local SVG artwork, a theme-aware CSS shimmer, and a left-to-right reveal after load. Reduced-motion preferences keep content visible without entrance/reveal motion, disable CSS movement, and make router scrolling immediate. Hash navigation uses smooth scrolling when motion is allowed. Links and controls include visible keyboard focus styles.

## Before publication

- [ ] Replace the sample profile, role, tagline, CV, email, and social links.
- [ ] Add an optimized Hero portrait with accurate alt text in `profile.photo`, or leave the optional field omitted until a real image is available.
- [ ] Replace paper, project, and book records, including descriptions, roles, links, section text, image alt text, and artwork.
- [ ] Replace the fictional Academic data and grades with accurate details; include only selected courses you choose to share.
- [ ] Replace the sample Honors entries with verified awards and issuers.
- [ ] Replace `public/images/` artwork and `public/documents/example-cv.pdf`.
- [ ] Set `profile.contentLanguage` to the main language of the new content. For a primarily Chinese profile, use `zh-Hans`; mark an English research title with `titleLang: 'en'` when needed.
- [ ] Confirm the Hero contains no demo rail or location anchor, and that section headings use one left-side number only.

## Deployment

This is a static Vite site. Build it with `npm run build`, then upload the contents of `dist/` to a static host that supports SPA history fallback. The canonical URL and generic search metadata are in `index.html`.
