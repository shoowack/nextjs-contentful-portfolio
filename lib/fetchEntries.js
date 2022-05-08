import { createClient } from 'contentful';

const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

const client = createClient({
    space: space,
    accessToken: accessToken,
})

export async function fetchEntries(entryType) {
    switch (entryType) {
        case 'websites':
            entryType = 'Websites';
            break;
        case 'designs':
            entryType = 'Design';
            break;
    }

    const entries = await client.getEntries({
        content_type: 'section',
        'fields.title': entryType,
        include: 2 //! necessary to get the gallery images
    })

    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
}

export default { fetchEntries }