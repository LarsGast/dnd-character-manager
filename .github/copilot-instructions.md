# Copilot Instructions for AI Coding Agents

## Project Overview

- **DnD Character Manager** is a local-first, privacy-focused web app for managing D&D 5e characters, supporting both official and homebrew content.
- All data is stored in the browser (`localStorage`) for privacy and offline use. No server-side storage or user authentication.
- The app is optimized for fast, in-session access to character data, with features for homebrew, import/export, and extensibility.

## Architecture & Data Flow

- **Domain Model:**
  - `src/types/PlayerCharacter.ts` is the canonical character model. All character data flows through this class.
  - `src/store/PlayerCharacterBank.ts` manages all characters (active/inactive), persisting directly to `localStorage` (exception to the rule below).
- **Persistence:**
  - All persistent data (except `PlayerCharacterBank`) must use `LocalStorageService` (`src/services/LocalStorageService.ts`). Never access `localStorage` directly elsewhere.
- **Repositories:**
  - `src/repositories/` contains resource repositories (e.g., `ClassRepository`, `FeatureRepository`, `HomebrewRepository`).
  - All repositories must check homebrew (via `HomebrewRepository`) before falling back to SRD (official) data.
  - Homebrew data is always stored with a `homebrew_` prefix to avoid collisions.
- **API Integration:**
  - `src/services/SrdApiService.ts` fetches official D&D 5e data from the public SRD API, with caching via `CacheService`.
  - All API and storage data is mapped to domain models using mappers in `src/mappers/`.
- **Dependency Injection:**
  - All services, repositories, and mappers are instantiated and exported from `src/wiring/dependencies.ts` for DI and testability.

## Developer Workflows

- **Install dependencies:** `npm install` (Node) and `bundle install` (Ruby/Jekyll)
- **Dev Server:** `npm run dev` (watches TS, static, and runs Jekyll locally)
- **Build:** `npm run build` (TypeScript → JS, static assets, Jekyll site)
- **Format:** `npm run format:write` (Prettier; pre-commit hook auto-formats staged files)
- **Clean:** `npm run clean` (removes build artifacts)
- **No formal test suite** (as of this writing)

## Project Conventions & Patterns

- **Persistence:** Use `LocalStorageService` for all new persistent features (except `PlayerCharacterBank`).
- **Homebrew Precedence:** Always check homebrew data before SRD/API data in repositories.
- **Import/Export:** All import/export is JSON-based. Example: serialize a `PlayerCharacter` to JSON for export.
- **Dependency Injection:** Register all new services, repositories, and mappers in `src/wiring/dependencies.ts`.
- **No authentication:** All data is local to the browser; do not add user auth.
- **Commit messages:** Use [Conventional Commits](https://www.conventionalcommits.org/).

## Key Files/Directories

- `src/types/PlayerCharacter.ts` — main character model
- `src/store/PlayerCharacterBank.ts` — manages all characters
- `src/services/LocalStorageService.ts` — storage abstraction
- `src/repositories/` — resource repositories
- `src/wiring/dependencies.ts` — dependency injection and wiring

---

If any conventions or workflows are unclear, please ask for clarification or check the README or `docs/CONTRIBUTING.md`.
