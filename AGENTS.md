# Project agent memory

This file is the project's committed home for project-intrinsic agent knowledge: build, test, release, architecture, and sharp-edge notes that should travel with the code.

- Add durable project-specific notes here as they are discovered through real work.
- `public/sitemap.xml`, `public/robots.txt`, and `public/llms.txt` are generated — never hand-edit them. `pnpm build` runs `scripts/generate-static-meta.mjs` as a `postbuild` step; it derives all three from `pages/` and the `*Slug`/`SITE_URL` constants in `lib/constants.ts`. A new static page needs a matching entry in that script's `PAGE_DESCRIPTIONS` map or the build fails (drift check).
- This is the Pages Router (`pages/`), not the App Router — there is no `app/` directory.
- Local `pnpm build` needs Contentful credentials in `.env.local` (see `.env.local.example`); without them `getStaticProps` for `/[slug]` fails before `postbuild` ever runs.

## Maintaining this file

Keep this file for knowledge useful to almost every future agent session in this project.
Do not repeat what the codebase already shows; point to the authoritative file or command instead.
Prefer rewriting or pruning existing entries over appending new ones.
When updating this file, preserve this bar for all agents and keep entries concise.
