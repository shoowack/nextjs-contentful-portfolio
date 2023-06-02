import { appsAndWebsitesSlug, designsSlug } from '@lib/constants';
import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;

const client = createClient({
  space,
  accessToken,
});

export async function fetchEntries(entryType) {
  let type = entryType;

  switch (entryType) {
    case appsAndWebsitesSlug:
      type = 'Apps & Websites';
      break;
    case designsSlug:
      type = 'Designs';
      break;
    default:
      type = entryType;
  }

  const entries = await client.getEntries({
    content_type: 'section',
    'fields.title': type,
    // 'metadata.tags.sys.id[all]': 'prod, dev',
    include: 2, //! necessary to get the gallery images
  });

  if (entries.items) return entries.items;
  // eslint-disable-next-line no-console
  return console.log(`Error getting Entries for ${type}.`);
}

export default { fetchEntries };
