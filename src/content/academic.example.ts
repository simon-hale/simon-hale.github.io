export type CourseworkCategory = 'systems' | 'mathematics' | 'aiVision'

export interface SelectedCourse {
  name: string
  grade: string | number
  nameLang?: string
}

export interface CourseworkGroup {
  category: CourseworkCategory
  courses: SelectedCourse[]
}

export interface AcademicData {
  university: string
  degree: string
  major: string
  startYear: number
  endYear: number
  gpa?: string
  rank?: string
  focus?: string[]
  coursework: CourseworkGroup[]
}

// Demo grades are fictional placeholders. This curated public summary is not a transcript.
export const academic: AcademicData = {
  university: 'Example University',
  degree: 'B.Eng.',
  major: 'Computer Science',
  startYear: 2022,
  endYear: 2026,
  gpa: '3.86 / 4.00',
  rank: '8 / 146',
  focus: ['Computer Vision', 'Systems'],
  coursework: [
    {
      category: 'systems',
      courses: [
        { name: 'Operating Systems', grade: 94 },
        { name: 'Principles of Computer Organization', grade: 93 },
        { name: 'Database Systems', grade: 95 },
      ],
    },
    {
      category: 'mathematics',
      courses: [
        { name: 'Linear Algebra', grade: 96 },
        { name: 'Probability & Mathematical Statistics', grade: 94 },
        { name: 'Calculus I', grade: 93 },
      ],
    },
    {
      category: 'aiVision',
      courses: [
        { name: 'Computer Vision', grade: 97 },
        { name: 'Machine Learning', grade: 95 },
        { name: 'Introduction to Artificial Intelligence', grade: 94 },
      ],
    },
  ],
}
