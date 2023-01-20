const POST_GRAPHQL_FIELDS = `
sectionCollection {
  total
  items {
    title
  }
}
`;

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
    },
  ).then((response) => response.json());
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
    true,
  );
  return entry.data.postCollection.items[0];
}

export async function getAllCategories(preview) {
  const entries = await fetchGraphQL(
    `query {
      sectionCollection(order: [order_ASC]) {
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
    preview,
  );
  return entries?.data?.sectionCollection?.items;
}

export async function getHeaderLinks() {
  const entries = await fetchGraphQL(
    `query {
      headerLinksCollection(order: [order_ASC]) {
        items {
          sys {
            id
          },
          link,
          order,
          openInNewTab,
          tooltipText,
          icon,
          iconColor
        }
      }
    }`,
  );
  return entries?.data?.headerLinksCollection?.items;
}
