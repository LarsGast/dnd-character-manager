# Copilot Instructions for AI Coding Agents

## Project Overview

- **DnD Character Manager** is a local-first, privacy-focused web app for managing D&D 5e characters, supporting both official and homebrew content.
- All data is stored in the browser (`localStorage`) for privacy and offline use. No server-side storage or user authentication.
- The app is optimized for fast, in-session access to character data, with features for homebrew, import/export, and extensibility.
- Built with **TypeScript**, **Vite**, and **Vitest** for modern web development with strong typing and fast builds.

## Technology Stack

- **Frontend:** TypeScript + HTML + SCSS, bundled with Vite
- **Testing:** Vitest with jsdom for unit and integration tests
- **Storage:** Browser localStorage (no backend/database)
- **API:** D&D 5e SRD API for official content
- **Formatting:** Prettier with automated pre-commit hooks via Husky
- **Architecture:** Domain-driven design with dependency injection

## Architecture & Data Flow

- **Domain Model:**
  - `src/types/PlayerCharacter.ts` is the canonical character model. All character data flows through this class.
  - `src/store/PlayerCharacterBank.ts` manages all characters (active/inactive), persisting directly to `localStorage` (exception to the rule below).
- **Feature Organization:**
  - `src/features/` contains feature modules (character, homebrew) with their own components and logic.
  - Each feature has its own index.ts, editor/, manager/, and viewer/ subdirectories where applicable.
- **Persistence:**
  - All persistent data (except `PlayerCharacterBank`) must use `LocalStorageService` (`src/services/LocalStorageService.ts`). Never access `localStorage` directly elsewhere.
- **Repositories:**
  - `src/repositories/` contains resource repositories (e.g., `ClassRepository`, `FeatureRepository`, `HomebrewRepository`).
  - All repositories must check homebrew (via `HomebrewRepository`) before falling back to SRD (official) data.
  - Homebrew data is always stored with a `homebrew_` prefix to avoid collisions.
- **API Integration:**
  - `src/services/SrdApiService.ts` fetches official D&D 5e data from the public SRD API, with caching via `CacheService`.
  - All API and storage data is mapped to domain models using mappers in `src/mappers/`.
- **Mapper Pattern:**
  - `src/mappers/api/` converts API responses to domain models
  - `src/mappers/record/` converts stored localStorage records to domain models
  - All mappers implement the `IMapper<TSource, TTarget>` interface
- **Dependency Injection:**
  - All services, repositories, and mappers are instantiated and exported from `src/wiring/dependencies.ts` for DI and testability.

## Developer Workflows

- **Install dependencies:** `npm install` (Node.js packages)
- **Dev Server:** `npm run dev` (TypeScript compilation + Vite dev server)
- **Build:** `npm run build` (TypeScript compilation + Vite production build)
- **Testing:** `npm test` (run all tests), `npm run test:watch` (watch mode), `npm run test:ui` (UI mode)
- **Type Checking:** `npm run check` (TypeScript type checking without emitting)
- **Format:** `npm run format:write` (Prettier; pre-commit hook auto-formats staged files)
- **Clean:** `npm run clean` (removes build artifacts)

## Project Conventions & Patterns

- **TypeScript:** Use strict mode (already configured). Prefer explicit types over `any`.
- **Persistence:** Use `LocalStorageService` for all new persistent features (except `PlayerCharacterBank`).
- **Homebrew Precedence:** Always check homebrew data before SRD/API data in repositories.
- **Import/Export:** All import/export is JSON-based. Example: serialize a `PlayerCharacter` to JSON for export.
- **Dependency Injection:** Register all new services, repositories, and mappers in `src/wiring/dependencies.ts`.
- **Testing:** Write tests in `test/unit/` or `test/integration/` using Vitest. Use descriptive test names.
- **Interfaces:** Define contracts in `src/interfaces/` and implement them in services/repositories.
- **Error Handling:** Prefer explicit error handling over throwing exceptions in business logic.
- **Caching:** Use `CacheService` for API responses to improve performance and reduce network calls.
- **No authentication:** All data is local to the browser; do not add user auth.
- **Commit messages:** Use Conventional Commits format (e.g., `feat:`, `fix:`, `docs:`, `test:`).

## Key Files/Directories

- `src/types/PlayerCharacter.ts` — main character model
- `src/store/PlayerCharacterBank.ts` — manages all characters
- `src/services/LocalStorageService.ts` — storage abstraction
- `src/repositories/` — resource repositories
- `src/wiring/dependencies.ts` — dependency injection and wiring
- `src/features/character/` — character management components
- `src/features/homebrew/` — homebrew content management
- `src/mappers/api/` — API response to domain model mappers
- `src/mappers/record/` — localStorage record to domain model mappers
- `src/interfaces/` — contracts and type definitions
- `test/unit/` — unit tests
- `test/integration/` — integration tests

## Common Development Tasks

- **Adding a new repository:** Create in `src/repositories/`, implement interface from `src/interfaces/`, register in `src/wiring/dependencies.ts`
- **Adding API support:** Create mapper in `src/mappers/api/`, add to repository, update dependencies
- **Adding storage support:** Create mapper in `src/mappers/record/`, use `LocalStorageService`, update dependencies
- **Adding homebrew support:** Implement in `HomebrewRepository`, use `homebrew_` prefix for storage keys
- **Adding tests:** Create in appropriate `test/unit/` or `test/integration/` subdirectory using Vitest

---

If any conventions or workflows are unclear, please ask for clarification or check the README or `docs/CONTRIBUTING.md`.
