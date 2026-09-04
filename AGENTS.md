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

## Versioning and releases

`package.json` has a `version` field (semver: `major.minor.patch`). Bump it as part of the PR that
warrants a release:

- **patch** — small fixes, chores, dependency bumps.
- **minor** — new features or other meaningful additions.
- **major** — breaking changes.

Not every PR needs a bump (e.g. a PR merged before a release cut can share the next bump with
other PRs in the same release), but every push to `main` should land with a `version` that hasn't
been released yet, since `.github/workflows/release.yaml` reads `package.json`'s `version` on every
push to `main` and creates a matching GitHub Release (tag `v<version>`, notes auto-generated from
merged PRs) if one doesn't already exist. It's idempotent — a push to `main` that doesn't bump the
version (or a rerun) is a no-op, it does not error or duplicate the release. It can also be run
manually via `workflow_dispatch` (e.g. to verify the check without waiting for a `main` push).

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

## CI and deploys

Deploys run through GitHub Actions, not Vercel's Git integration: `.github/workflows/preview.yaml`
deploys any non-`main` push as a Vercel preview, and `production.yaml` deploys `main` pushes to
production, both via the Vercel CLI using the `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and
`VERCEL_PROJECT_ID` repo secrets.

`.github/workflows/pull-request-checks.yml` runs ESLint, `tsc`, and Prettier on every PR; ESLint
and Typecheck are required status checks on `main` and `develop` branch protection (Prettier is
not required yet). `.github/workflows/ci.yml` duplicates the ESLint and Prettier jobs (not
Typecheck) on the same `pull_request`/`push` triggers — a pre-existing overlap, not yet
consolidated. There is no automated test suite yet (see Testing below; tracked in #8).

`.github/workflows/release.yaml` also runs on every `main` push (see Versioning and releases
above) and creates the GitHub Release for that push's `package.json` version.

## ESLint config

`eslint-config-airbnb` was deliberately dropped (#54): it's unmaintained (no release since
Dec 2021), and `airbnb/hooks` pins its own `eslint-plugin-react-hooks`, which collides with the
instance `eslint-config-next` bundles — ESLint 8 can't reconcile two different resolved instances
of the same plugin name pulled in by two extended configs. Don't re-add it. `.eslintrc.json` now
extends `next/core-web-vitals` (which supplies the `eslint-plugin-{react,react-hooks,jsx-a11y,
import}` versions) plus `@typescript-eslint`, `prettier`, and `tailwindcss` configs directly. Keep
`eslint-config-next` aligned with the installed `next` major — `eslint-config-next`'s peer range on
ESLint matters too: the `@next/eslint-plugin-next` `no-html-link-for-pages` rule needs ESLint
8.40+ (reads `context.cwd`, unset on older 8.x).

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
3. CI — GitHub Actions repo secrets (`VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`; no
   Contentful secrets are needed directly by CI since `vercel pull` fetches the project's Vercel
   environment variables at deploy time).
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
