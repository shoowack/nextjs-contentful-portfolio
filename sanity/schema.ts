import { type SchemaTypeDefinition } from 'sanity'

import blockContent from './schemas/blockContent'
import project from './schemas/project'
import section from './schemas/section'
import stack from './schemas/stack'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blockContent, section, project, stack],
}
