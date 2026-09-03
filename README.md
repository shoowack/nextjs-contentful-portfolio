# Personal portfolio made with Next.js and Contentful

### Description

This is a repository for my personal portfolio. It details a breif background and info about me, my projects, experience and techologies I've used.

### Technologies Used

Built with [Next.js](https://nextjs.org) and [Contentful](https://www.contentful.com/).

### Sitemap, robots.txt, llms.txt (generated)

`public/sitemap.xml`, `public/robots.txt`, and `public/llms.txt` are generated at build time — never edit them by hand. `pnpm build` runs `scripts/generate-static-meta.mjs` as a `postbuild` step, deriving all three from the pages under `pages/` and the `*Slug`/`SITE_URL` constants in `lib/constants.ts`. A new page needs a matching entry in that script's `PAGE_DESCRIPTIONS` map (its llms.txt title/description) — generation fails the build if the map and the pages drift apart.

### Contact

Email: [isuvak@gmail.com](isuvak@gmail.com)

### [https://shoowack.com/](https://shoowack.com/)
