# Contributing to ProjectName

Thanks for wanting to contribute! This document explains the process for contributing, coding standards, and the review process.

## Quick start
1. Fork the repo.
2. Create a branch:  
   `git checkout -b feat/short-description` or `git checkout -b fix/short-description`
3. Install dependencies:  
   `npm ci`
4. Run the dev server:  
   `npm run dev`
5. Run lint and tests locally before opening a PR:  
   `npm run lint`  
   `npm test`

> If you don't have Node set up yet, see `BUILD.md` in `docs/` for environment setup.

## Filing issues
- Use the appropriate issue template.
- Provide: steps to reproduce, expected vs actual behavior, browser/OS, console/log output and screenshots where applicable.
- Add the label that best fits the problem (bug, enhancement, docs).

## Working on a change / PR process
- Branch from `main`.
- Keep PRs small and focused.
- In your PR description include:
  - what changed
  - why it's needed
  - migration notes (if applicable)
  - any performance / accessibility impacts
- Link issues with `Fixes #<issue>` when the PR resolves an issue.
- Add unit tests where applicable.
- Ensure `npm run lint` and `npm test` pass on your branch.

## Code style & linters
- We use ESLint for JS, Stylelint for CSS, and Prettier for formatting.
- Run lint autofix where possible:  
  `npm run lint -- --fix`
- EditorConfig is included to keep whitespace and end-of-line consistent.

## Tests
- Unit tests run with `npm test` (Jest).
- Add tests for bug fixes and new features. Keep tests deterministic and fast.

## Accessibility (a11y)
- Aim to follow WCAG basics: semantic HTML, proper ARIA roles where needed, keyboard navigation and visible focus states.
- Include notes about any a11y trade-offs in the PR description.

## Migration to TypeScript
- We plan to migrate incrementally. When adding new files or touching modules:
  - Prefer adding `.ts`/`.tsx` for new modules.
  - Keep `allowJs: true` in `tsconfig.json` until migration completes.
  - Add type definitions and run `npm run build` to verify types.

## Commit messages
Use a concise, conventional style:

type(scope): short summary

optional longer description

Common types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`.

Example:

feat(nav): add mobile hamburger menu

## Review & merging
- PRs will be reviewed by maintainers and assigned reviewers automatically via CODEOWNERS.
- Maintain a clean commit history if requested (squash or rebase).
- Merge is done by maintainers once checks pass and approvals are satisfied.

## Getting help
- If you need help picking an issue or onboarding, tag `@maintainer` or open a discussion using the `discussion` issue type.

Thanks — we appreciate your contributions!