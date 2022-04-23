const space = process.env.CONTENTFUL_SPACE_ID
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN

const client = require('contentful').createClient({
    space: space,
    accessToken: accessToken,
})

export async function fetchEntries(entryType) {
    switch (entryType) {
        case 'websites':
            entryType = 'Website';
            break;
        case 'designs':
            entryType = 'Design';
            break;
    }

    const entries = await client.getEntries({
        content_type: 'entry',
        'fields.type': entryType,
    })
    if (entries.items) return entries.items
    console.log(`Error getting Entries for ${contentType.name}.`)
}

export default { fetchEntries }