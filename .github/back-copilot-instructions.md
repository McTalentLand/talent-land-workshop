# GitHub Copilot Instructions (Repository-wide)

You are working in a TypeScript + Express service following a *class-based* design with manual dependency injection.

## Architecture Overview
- **Components**: Express app with routes, services (business logic), repositories (data access), and shared utilities.
- **Boundaries**: Services handle logic and call repositories; routes handle HTTP and delegate to services.
- **Data Flow**: Requests → Routes → Services → Repositories (in-memory for demo).
- **Why**: Simple, testable structure without frameworks; in-memory repos for easy testing and demo.

## Structure (important)
- Keep domain code under `src/menu` and `src/orders`.
- Use TypeScript **classes** for repositories and services (e.g., `MenuService`, `InMemoryMenuRepository`).
- Keep Express routes under `src/routes` as functions returning `Router` (e.g., `createOrderRoutes`).
- Keep shared types/helpers under `src/shared`.

## API Conventions
- JSON only.
- Stable error shape: `{ error: { code: string, message: string } }` (use `toError` helper).
- Validate inputs in services; return 400 on failures (e.g., parse requests with custom parsers like `parseMenuItemId`).

## Workflows
- **Dev**: `npm run dev` (ts-node-dev with --respawn --transpile-only for hot reload).
- **Build**: `npm run build` (tsc to dist/).
- **Start**: `npm run start` (node dist/server.js).
- **Test**: `npm test` (Jest with --runInBand; uses in-memory repos, fixed clocks for determinism).

## Testing Patterns
- Don't create unit test unless is asked for.
- Use Jest + supertest for API tests.
- Follow AAA (Arrange, Act, Assert) and table-driven tests (e.g., `test.each` for validation cases).
- Prefer in-memory repositories (fakes) over mocking; use `FixedClock` for time-dependent tests.
- Avoid flakiness: control randomness/timers.

## Demo UI
- Tiny HTML/CSS/JS UI served from `/public`; calls same-origin API.
- Keep framework-free; simple DOM manipulation.

## Dependencies & Integrations
- External: Express for HTTP, uuid for IDs.
- No external APIs; self-contained demo.</content>
<parameter name="filePath">c:\Repos\talent-land-workshop\.github\copilot-instructions.md