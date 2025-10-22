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
4. Run the dev server:
   ```
   npm run dev
   ```
5. Access the site at `http://localhost:4000/` (or the port shown in the terminal)

> If you don't have Node set up yet, see [Downloading and installing Node.js and npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

### Building for production

To build the application for production deployment:

```
npm run build
```

This creates optimized files in the `dist/` directory.

To preview the production build locally:

```
npm run preview
```

## Filing issues

- Use the appropriate issue template.
- The template will provide clear instructions on what information the issue should contain.
- Add the label that best fits the problem (bug, enhancement, docs).

## Working on a change / PR process

- Branch from `main`.
- Keep PRs small and focused.
- Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) (see [Commit messages](#commit-messages)).
- Add unit tests where applicable.
  - For more information, see [Tests](#tests).
- Create a pull request and follow the instructions provided by the template.
- Link issues with `Closes #<issue>` when the PR resolves an issue.
- Ensure any automated checks pass on your branch.
- Your PR will be reviewed and changes may be requested.
  - For more information, see [Review & merging](#review--merging).
- All PRs will be squashed and merged on completion.

## Code style, formatting, & linters

- The [tsconfig.json](../tsconfig.json) file contains TypeScript compilation rules.
  - If any of the compilation rules are violated the application cannot be built.
  - Make sure that `.ts` files do not contain any errors.
- We use [Prettier](https://prettier.io/) to automatically format code.
  - **Pre-commit hook:**  
    When you commit, a pre-commit hook will automatically format staged files using Prettier. This is powered by [husky](https://typicode.github.io/husky/) and [lint-staged](https://github.com/okonet/lint-staged). You don’t need to run formatting manually for staged files.
  - **Manual formatting:**  
    To format all files in the project, run:
    ```
    npm run format:write
    ```
    To check for formatting issues without changing files, run:
    ```
    npm run format:check
    ```
  - **Continuous Integration (CI):**  
    All pull requests and pushes to `main` are checked for formatting in CI. If your PR fails the formatting check, run the above commands to fix and recommit.
- We currently do not use a linter (such as ESLint) to enforce code quality or catch errors.
  - Prettier is used only for code formatting.
  - For now, please reference existing code for style and best practices.
  - Linter guidelines may be added in the future.

## Tests

- This project uses [Vitest](https://vitest.dev/) for unit testing.
- Test files are located in the `test/` directory and use the `.test.ts` extension.
- To run all tests:
  ```
  npm test
  ```
- To run tests in watch mode with Vitest UI (re-run on file changes):
  ```
  npm run test:watch
  ```
- To generate a coverage report locally (HTML + lcov under `test/coverage/`):
  ```
  npm run test:coverage
  ```
- We aim for a high coverage of tests, which is why we ask you to write new unit tests when adding new functionality. CI enforces global thresholds and might require higher coverage for specific files.
- When writing tests, follow the guidelines below:
  - Keep tests simple
    - It should be clear what a test does just by reading it's name
  - Follow the AAA pattern
    - Arrange: Set up the necessary preconditions and inputs
    - Act: Execute the code being tested
    - Assert: Verify the expected outcomes
    - Use comments to indicate which part of the test fulfills each role
  - Use descriptive names for tests
    - The name should describe what the test is verifying
    - Example: `should return 404 when item is not found`
  - Prefer `it` over `test` for defining tests
  - Use `describe` blocks to group related tests
  - Test file names should match the name of the file they are testing (with `.test.ts` suffix)
  - Test file location should match the location of the file they are testing
    - Place unit tests in the `test/unit` folder
    - Place integration tests in the `test/integration` folder
    - Example: unit tests for `src/services/ApiService.ts` should be placed in `test/unit/services/ApiService.test.ts`
  - Mock all dependencies in unit tests
  - Mock only I/O dependencies in integration tests

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
- GitHub Copilot will also be assigned as a reviewer automatically.
  - Copilot can NOT approve a PR.
  - Suggestions by Copilot MAY be applied if they are valid.
  - If you are not sure whether a Copilot suggestion is valid, wait for a code owner to validate the suggestion and to give further instruction.
  - PRs will ALWAYS be reviewed by an actual person.
- Maintain a clean commit history if requested (squash or rebase).
- Merge is done by maintainers once checks pass and approvals are satisfied.

## Getting help

- If you need help picking an issue or onboarding, tag `@LarsGast` or open a discussion using the `discussion` issue type.
- Don't feel it needs to be perfect — incomplete work is totally fine. We'd love to help you get along the way.

Thanks, we appreciate your contribution!
