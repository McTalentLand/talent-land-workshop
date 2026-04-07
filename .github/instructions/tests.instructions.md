# Copilot Instructions for Tests

Applies to: **/*.spec.ts

- Use Jest (@jest/globals) and supertest for API tests.
- Follow AAA.
- Use `test.each` / `describe.each` for validation matrices.
- Avoid flakiness: do not use real timers or random without controlling them.
