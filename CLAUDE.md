# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Mate Academy exercise: a plain Node.js `http` server (no frameworks) that converts text between cases (`SNAKE`, `KEBAB`, `CAMEL`, `PASCAL`, `UPPER`). Request format: `/<TEXT>?toCase=<CASE>`. CommonJS, Jest tests, ESLint + Prettier.

## Commands

- `npm start` — run the server locally (`src/main.js`, port 5700)
- `npm test` — lint (runs Prettier `--write` first, then `mate-scripts lint`) followed by Jest
- `npm run test:only` — Jest only (via `mate-scripts test`)
- `npx jest tests/createServer.test.js` — run a single test file (add `-t "<name>"` for one test)
- `npm run lint` / `npm run format` — note that both rewrite files in `src/` via Prettier

`npm install` triggers `postinstall` → `mate-scripts update`, which may modify project config files.

## Architecture

- `src/createServer.js` must export `{ createServer }`, a function that builds and **returns** an `http.Server` without calling `listen`. `src/main.js` calls `createServer().listen(5700)`; tests do the same on their own port/agent. This is the task's only area to implement (URL parsing, validation, JSON responses).
- `src/convertToCase/` is provided business logic — don't modify it (it has its own tests in `tests/convertToCase.test.js`). `convertToCase(text, caseName)` returns `{ originalCase, convertedText }` (`detectCase` → `toWords` → `wordsToCase`).
- Behavior contract (see `README.md` for exact error message strings and response shapes): always respond with a JSON `Content-Type`; validation failures return 400 / `Bad request` with `{ errors: [{ message }] }` (multiple errors may be returned together); success returns 200 / `OK` with `{ originalCase, targetCase, originalText, convertedText }`.

## Notes

- `.github/workflows/test.yml-template` is an untracked template; the active workflow is `.github/workflows/test.yml`.
