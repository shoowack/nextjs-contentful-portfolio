import { groq } from 'next-sanity';

export const projectsQuery = groq`
*[ _type == "section" && slug.current == $slug][0] {
  // ...,
  "projects": *[_id in ^.projects[]._ref]{
    "description": body,
    title,
    "sectionSlug": slug.current,
    "stack": *[_id in ^.stack[]._ref] {
      name,
      logo
    }
  }
}`

export interface Section {
  projects: Project[] | undefined;
}

export interface Project {
  title: string
  sectionSlug: string
  description?: string
  stack?: Stack[]
}

export interface Stack {
  title?: string
  description?: any[]
  image?: {
    url: string
  }
}
