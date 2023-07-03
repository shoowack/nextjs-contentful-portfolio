import {
  projectsQuery,
  type Section
} from '@lib/sanity.queries'
import { apiVersion, dataset, projectId, useCdn } from 'lib/sanity.api'
import { createClient } from 'next-sanity'

/**
 * Checks if it's safe to create a client instance, as `@sanity/client` will throw an error if `projectId` is false
 */
const client = projectId
  ? createClient({ projectId, dataset, apiVersion, useCdn })
  : null

export async function getProjects(slug: string): Promise<Section> {
  if (client) {
    return (await client.fetch(projectsQuery, { slug })) || ([] as any)
  }
  return
}