const POST_GRAPHQL_FIELDS = `
sectionCollection {
  total
  items {
    title
  }
}
`

async function fetchGraphQL(query, preview = false) {
  return fetch(
    `https://graphql.contentful.com/content/v1/spaces/${process.env.CONTENTFUL_SPACE_ID}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${
          preview
            ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN
            : process.env.CONTENTFUL_ACCESS_TOKEN
        }`,
      },
      body: JSON.stringify({ query }),
    }
  ).then((response) => response.json())
}

export async function getPreviewPostBySlug(slug) {
  const entry = await fetchGraphQL(
    `query {
      postCollection(where: { slug: "${slug}" }, preview: true, limit: 1) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`,
    true
  )
  return entry.data.postCollection.items[0]
}

export async function getAllPostsWithSlug() {
  const entries = await fetchGraphQL(
    `query {
      postCollection(where: { slug_exists: true }, order: date_DESC) {
        items {
          ${POST_GRAPHQL_FIELDS}
        }
      }
    }`
  )
  return extractPostEntries(entries)
}

export async function getAllSections(preview) {
  const entries = await fetchGraphQL(
    `query {
      sectionCollection {
        items {
          sys {
            id
          },
          title
          openInNewTab
          link
          superscript
          subscript
          backgroundImage {
            url
          }
        }
      }
    }`,
    preview
  )
  return entries?.data?.sectionCollection?.items
}

export async function getAllSectionSections(preview, section) {
  const entries = await fetchGraphQL(
    `query {
      sectionCollection(where: {title: "${section}"}) {
        items {
          title
          sectionsCollection {
            items {
              title
              type
              backgroundColor
              description {
                json
              }
            }
          }
        }
      }
    }`,
    preview
  )
  return entries?.data?.sectionCollection?.items[0]?.sectionsCollection?.items
}