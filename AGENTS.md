# AGENTS.md

Instructions for AI coding agents (and humans who want the same context) working in this
repository.

## Project

A personal portfolio site built with Next.js and Contentful. See `README.md` for a one-line
project description.

## Package manager

This repo is pinned to **pnpm** (see `packageManager` in `package.json`). A `preinstall` script
(`npx only-allow pnpm`) blocks `npm install` / `yarn install` from being run by mistake. Always
use `pnpm install`, `pnpm dev`, `pnpm build`, `pnpm typecheck`, `pnpm lint`, etc.

## Branching and release flow

- `develop` is the integration branch; `main` is the release/production branch (deployed by
  Vercel's Git integration — see below).
- Create feature/fix branches off `develop`, named `<issue-number>-slug`, e.g. `15-add-agents-md`.
- Prefix commits with the issue number, e.g. `#15 Add AGENTS.md and CLAUDE.md`.
- Open pull requests against `develop`. Feature PRs are **squash-merged** into `develop`.
- To cut a release, `develop` is merged into `main` with a regular **merge commit** (not squashed),
  so `main`'s history reflects each release point.

## GitHub Project board

Work is tracked on the project board at
[github.com/users/shoowack/projects/12](https://github.com/users/shoowack/projects/12).

Lifecycle:

- **On creating an issue**: set an assignee and the `Type`, `Priority`, `Estimate`, and `Agent`
  fields.
- **On starting work**: set `Status` to `In progress` and set the `Start date` field.
- **On finishing work**: set the `End date` field and move `Status` to `In review`.

Statuses in use: `Considering`, `Backlog`, `Ready`, `In progress`, `In review`, `Done`,
`Not doing`.

## Deploys

Deploys happen automatically via **Vercel's Git integration** (pushes/merges to `main` deploy to
production; PRs get preview deployments). There is no deploy workflow or script to maintain in
this repo.

## Environment variables (Contentful)

The app needs Contentful credentials to fetch content:

- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `CONTENTFUL_PREVIEW_ACCESS_TOKEN`
- `CONTENTFUL_PREVIEW_SECRET`

See `.env.local.example` for the full list used locally.

These values must stay in sync across **four places**:

1. Local env file (`.env.local`, based on `.env.local.example`) — for local development.
2. `README.md` — documenting which variables are required and what they're for.
3. CI — any variables a CI workflow needs to build/test the project. This repo does not have a
   CI workflow yet; if one is added, its secrets must be kept in sync with the other three
   places.
4. Vercel project settings — the environment variables configured for the deployed app.

When adding, renaming, or removing a Contentful (or other) environment variable, update all four
places in the same change, not just the one you're touching.

## Generated files

`public/sitemap.xml`, `public/robots.txt`, and `public/llms.txt` are generated — never hand-edit
them. `pnpm build` runs `scripts/generate-static-meta.mjs` as a `postbuild` step; it derives all
three from `pages/` and the `*Slug`/`SITE_URL` constants in `lib/constants.ts`. A new static page
needs a matching entry in that script's `PAGE_DESCRIPTIONS` map or the build fails (drift check).

This is the Pages Router (`pages/`), not the App Router — there is no `app/` directory.

Local `pnpm build` needs Contentful credentials in `.env.local` (see `.env.local.example`);
without them `getStaticProps` for `/[slug]` fails before `postbuild` ever runs.

## Testing

There is no automated test suite (e.g. Cypress) in this repository yet. Do not invent test
commands or conventions — if you add tests, document the actual setup here.

## Maintaining this file

Keep this file up to date as the repo's conventions change (branching flow, project board
fields/statuses, env var locations, test tooling, etc.). Prefer pointing to the authoritative
file, script, or config over duplicating details that can go stale. `CLAUDE.md` includes this
file via `@AGENTS.md` and should not duplicate its content.
