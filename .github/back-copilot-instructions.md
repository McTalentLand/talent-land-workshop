# GitHub Copilot Instructions (Repository-wide)

You are working in a TypeScript + Express service following a *class-based* design.

## Structure (important)
- Keep domain code under `src/menu` and `src/orders`.
- Use TypeScript **classes** for repositories and services.
- Keep Express routes under `src/routes`.
- Keep shared types/helpers under `src/shared`.

## API conventions
- JSON only.
- Stable error shape: `{ error: { code, message } }`.
- Validate inputs and return 400 on validation failures.

## Testing
- Use Jest + supertest.
- Use AAA and table-driven tests.
- Prefer in-memory repositories (fakes) over heavy mocking.

## Demo UI
- A tiny HTML/CSS/JS UI is served from `/public` and calls the same-origin API.
- Keep UI framework-free.
