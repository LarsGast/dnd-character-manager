# Copilot Instructions for AI Coding Agents

## Project Overview

- **DnD Character Manager** is a local-first, privacy-focused web app for managing D&D 5e characters, supporting both official and homebrew content.
- All data is stored in the browser (`localStorage`) for privacy and offline use. No server-side storage or user authentication.
- The app is optimized for fast, in-session access to character data, with features for homebrew, import/export, and extensibility.
- Built with **TypeScript**, **Vite**, and **Vitest** for modern web development with strong typing and fast builds.

## Technology Stack

- **Frontend:** TypeScript + HTML + SCSS, bundled with Vite
- **Testing:** Vitest with jsdom for unit and integration tests; coverage via v8
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
  - `src/mappers/api-to-domain/` converts API responses to domain models
  - `src/mappers/record-to-domain/` converts stored localStorage records to domain models
  - All mappers implement the `IMapper<TSource, TTarget>` interface
  - **ResourceReference Pattern:** Use `ResourceReference` (not `BaseResource`) for lightweight references to other resources
    - Domain models use `ResourceReference` for foreign key-like relationships (e.g., `Race.languages: ResourceReference[]`)
    - API mappers use `ResourceReferenceApiToDomainMapper` to map minimal API references
    - Record mappers use `ResourceReferenceRecordToDomainMapper` to map stored references
    - `ResourceReference` contains only `index` (ID) and `name` fields for performance
- **Resource Type Enums:**
  - `ResourceTypeApiDto` (`src/types/api/helpers/ResourceTypeApiDto.ts`) - Represents resource types for API communication
  - `ResourceType` (`src/types/domain/helpers/ResourceType.ts`) - Canonical domain resource type enum used throughout the application
  - `ResourceTypeRecord` (`src/types/storage/helpers/ResourceTypeRecord.ts`) - Represents resource types for localStorage persistence
- **Transcribers:**
  - `src/transcribers/` contains transcriber classes that convert enum values to their string representations
  - `ResourceTypeApiDtoTranscriber` maps `ResourceTypeApiDto` enum values to API endpoint paths (e.g., `Spell` → `spells`)
  - `ResourceTypeRecordTranscriber` maps `ResourceTypeRecord` enum values to human-readable strings (e.g., `Spell` → `Spell`)
  - Use transcribers to centralize enum-to-string mappings, making the codebase more maintainable and testable
- **Dependency Injection:**
  - All services, repositories, mappers, and transcribers are instantiated and exported from `src/wiring/dependencies.ts` for DI and testability.

## Developer Workflows

- **Install dependencies:** `npm install` (Node.js packages)
- **Dev Server:** `npm run dev` (TypeScript compilation + Vite dev server)
- **Build:** `npm run build` (TypeScript compilation + Vite production build)
- **Testing:**
  - `npm test` (run all tests)
  - `npm run test:watch` (watch mode with Vitest UI; coverage overlay enabled)
  - `npm run test:coverage` (generate coverage reports)
- **Type Checking:** `npm run check` (TypeScript type checking without emitting)
- **Format:** `npm run format:write` (Prettier; pre-commit hook auto-formats staged files)
- **Clean:** `npm run clean` (removes build artifacts)

### Test coverage

- Coverage reports are written to `test/coverage/` (HTML, lcov) and uploaded as a CI artifact.
- Thresholds enforced by Vitest in CI:
  - Global: lines 80%, functions 80%, branches 75%, statements 80% (per-file enforcement enabled)
  - Services (`./services/**/*.ts`): 100% lines/functions/branches/statements
- Includes: `**/*.ts`
- Excludes files that are not being tested yet.

## Project Conventions & Patterns

- **TypeScript:** Use strict mode (already configured). Prefer explicit types over `any`.
- **Persistence:** Use `LocalStorageService` for all new persistent features (except `PlayerCharacterBank`).
- **Homebrew Precedence:** Always check homebrew data before SRD/API data in repositories.
- **Import/Export:** All import/export is JSON-based. Example: serialize a `PlayerCharacter` to JSON for export.
- **Dependency Injection:** Register all new services, repositories, mappers, and transcribers in `src/wiring/dependencies.ts`.
- **Testing:** Write tests in `test/unit/` or `test/integration/` using Vitest. Use descriptive test names.
- **Interfaces:** Define contracts in `src/interfaces/` and implement them in services/repositories.
- **Error Handling:** Use `Result<T>` type for operations that are expected to fail. Prefer explicit error handling over throwing exceptions in business logic.
- **Caching:** Use `CacheService` for API responses to improve performance and reduce network calls.
- **No authentication:** All data is local to the browser; do not add user auth.
- **Commit messages:** Use Conventional Commits format (e.g., `feat:`, `fix:`, `docs:`, `test:`).

## Key Files/Directories

- `src/types/PlayerCharacter.ts` — main character model
- `src/types/api/helpers/ResourceTypeApiDto.ts` — API resource type enum
- `src/types/domain/helpers/ResourceType.ts` — canonical domain resource type enum
- `src/types/storage/helpers/ResourceTypeRecord.ts` — storage resource type enum
- `src/store/PlayerCharacterBank.ts` — manages all characters
- `src/services/LocalStorageService.ts` — storage abstraction
- `src/repositories/` — resource repositories
- `src/wiring/dependencies.ts` — dependency injection and wiring
- `src/features/character/` — character management components
- `src/features/homebrew/` — homebrew content management
- `src/mappers/api-to-domain/` — API response to domain model mappers
- `src/mappers/domain-to-api/` — domain model to API dto mappers
- `src/mappers/domain-to-record/` — domain model to storage record mappers
- `src/mappers/record-to-domain/` — localStorage record to domain model mappers
- `src/transcribers/` — enum value to string representations
- `src/interfaces/` — contracts and type definitions
- `src/utils/Result.ts` — result type for explicit error handling
- `test/unit/` — unit tests
- `test/integration/` — integration tests

## Common Development Tasks

- **Adding a new repository:** Create in `src/repositories/`, implement interface from `src/interfaces/`, register in `src/wiring/dependencies.ts`
- **Adding API support:** Create mapper in `src/mappers/api-to-domain/`, add to repository, update dependencies
  - Use `ResourceReferenceApiToDomainMapper` for referenced resource fields (not full resource objects)
- **Adding storage support:** Create mapper in `src/mappers/record-to-domain/`, use `LocalStorageService`, update dependencies
  - Use `ResourceReferenceRecordToDomainMapper` for referenced resource fields
- **Adding homebrew support:** Implement in `HomebrewRepository`, use `homebrew_` prefix for storage keys
- **Adding tests:** Create in appropriate `test/unit/` or `test/integration/` subdirectory using Vitest
- **Working with mappers:**
  - When mapping referenced resources (foreign keys), inject and use the appropriate ResourceReference mapper
  - When mapping full resource objects, inject and use the appropriate BaseResource mapper
  - Update constructor to accept both mappers when needed, and wire them in `src/wiring/dependencies.ts`
- **Working with transcribers:**
  - Create in `src/transcribers/` to centralize enum-to-string mappings
  - Define interface in `src/interfaces/` (e.g., `IResourceTypeApiDtoTranscriber`)
  - Implement the interface in the transcriber class
  - Inject and wire in `src/wiring/dependencies.ts`
  - Use transcribers in services and repositories to avoid hardcoding enum mappings

---

If any conventions or workflows are unclear, please ask for clarification or check the README or `docs/CONTRIBUTING.md`.
