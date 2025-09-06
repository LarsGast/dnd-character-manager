# Contributing

Thanks for wanting to contribute! This document explains the process for contributing, coding standards, and the review process.

## Quick start
1. Fork the repo.
2. Create a branch:  
   ```
   git checkout -b feat/short-description
   ``` 
   or 
   ```
   git checkout -b fix/short-description
   ```
3. Install dependencies:  
   ```
   npm install
   ```
   ```
   bundle install
   ```
4. Run the dev server:  
   ```
   npm run dev
   ```
5. Access the site at `http://localhost:4000/`

> If you don't have Node set up yet, see [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

> If you don't have Bundler set up yet, see [Using Jekyll with Bundler](https://jekyllrb.com/tutorials/using-jekyll-with-bundler/).

## Filing issues
- Use the appropriate issue template.
- The template will provide clear instructions on what information the issue should contain.
- Add the label that best fits the problem (bug, enhancement, docs).

## Working on a change / PR process
- Branch from `main`.
- Keep PRs small and focused.
- Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) (see [Commit messages](#commit-messages)).
- Add unit tests where applicable.
- Create a pull request and follow the instructions provided by the template.
- Link issues with `Closes #<issue>` when the PR resolves an issue.
- Ensure any automated checks pass on your branch.
- All PRs will be squashed and merged on completion.

## Code style & linters
- The [tsconfig.json](../tsconfig.json) file contains TypeScript compilation rules.
   - If any of the compilation rules are violated the application cannot be built.
   - Make sure that `.ts` files do not contain any errors.
- We currently do not use a linter. Reference existing code on how you should style new code.
   - We will add a linter guidelines later.

## Tests
- The project currently does not have any tests.
   - Information about proper testing procedures will be added later.

## Commit messages
We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) for all commits:

```
type(scope): short summary

optional longer description
```

The most common types are `fix` and `feat`. Use these if they make sense, since these work well with SemVer.

If `fix` and `feat` do not make sense, you can use any other type, as long as it relates to the change. Other common types are `chore`, `docs`, `style`, `refactor`, `test`.

If you find your commit fits multiple types, try splitting it up in smaller commits.

If a change is a BREAKING CHANGE, append a `!` after the type/scope and include the text `BREAKING CHANGE: description` in the footer of the commit. A BREAKING CHANGE can be part of commits of any type. Any change that results in loss of data, removal of functionality, invalidation of links, or a very significant change in functionality should be marked as a BREAKING CHANGE.

Examples:

```
feat(nav): add mobile hamburger menu

Replaces the old static menu
```

```
fix: remove trailing space when saving character name
```

```
docs: update CONTRIBUTING.md
```

```
refactor(homebrew)!: move homebrew page to new URL

BREAKING CHANGE: {website}/homebrew is no longer available, use {website}/homebrew-editor instead.
```

## Review & merging
- PRs will be reviewed by maintainers and assigned reviewers automatically via CODEOWNERS.
- Maintain a clean commit history if requested (squash or rebase).
- Merge is done by maintainers once checks pass and approvals are satisfied.

## Getting help
- If you need help picking an issue or onboarding, tag `@LarsGast` or open a discussion using the `discussion` issue type.
- Don't feel it needs to be perfect — incomplete work is totally fine. We'd love to help you get along the way.

Thanks, we appreciate your contribution!