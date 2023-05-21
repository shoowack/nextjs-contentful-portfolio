import { type SchemaTypeDefinition } from 'sanity'

import author from './schemas/author'
import blockContent from './schemas/blockContent'
import category from './schemas/category'
import project from './schemas/project'
import section from './schemas/section'
import stack from './schemas/stack'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [author, category, blockContent, section, project, stack],
}
