# Copilot Instructions — calculator-app

Quick guidance for AI coding agents working in this repository (concise, actionable).

- Project type: Create React App (react-scripts). Run locally with `npm start` and view at http://localhost:3000. Production build: `npm run build` — output is `build/`.

- Key files and structure
  - `package.json` — scripts and deps (React 19, `react-scripts` 5, testing libs).
  - `src/App.js` — top-level component that mounts `src/components/Calculator.js`.
  - `src/components/Calculator.js` — main UI component (uses React Hooks: `useState`) and per-component stylesheet `src/components/Calculator.css`.
  - `src/App.test.js` — current test file uses `@testing-library/react`. NOTE: it expects the text `learn react` which the app does not render anymore; update tests or the app accordingly when making changes.
  - `public/` — static assets and `index.html` / `manifest.json`.

- Coding conventions & patterns (project-specific)
  - Components are functional React components using hooks (e.g., `useState` in `Calculator`). Prefer this style when adding components.
  - Per-component CSS: create `<Name>.css` alongside `<Name>.js` and import it at the top (`import './Name.css'`). This project does NOT use CSS modules by default.
  - Keep UI logic in component files; there is no present state management library (no Redux/MobX/etc.).
  - Tests use `@testing-library/react` patterns. Example test for `Calculator` display:

    ```js
    import { render, screen } from '@testing-library/react';
    import Calculator from './components/Calculator';

    test('default display shows 0', () => {
      render(<Calculator />);
      expect(screen.getByText('0')).toBeInTheDocument();
    });
    ```

- How to run tests
  - Development/watch mode: `npm test` (interactive watch by CRA).
  - Run tests once (CI or single-run): on Linux/macOS: `CI=true npm test --silent`; on Windows CMD/PowerShell: `set CI=true && npm test --silent`.

- What to watch out for (important, discoverable issues)
  - `src/App.test.js` appears to be a leftover CRA example that will fail against the current UI. Address by updating the test to reflect current components or adjust `App` if appropriate.
  - Comments and TODOs may indicate WIP (e.g., `// Buttons will be added tomorrow` in `Calculator.js`): preserve intent or confirm with the repository owner before removing.

- PR guidance for AI agents
  - Make small, focused changes and include/update unit tests that validate behavior.
  - If you add new npm scripts or tooling (linters, build steps), document the change in `README.md` and add rationale in the PR description.
  - Keep the default CRA ESLint config unless the repo owner requests a change.

- Implementation examples (concrete, copyable)
  - Add component + style: create `src/components/MyWidget.js` and `src/components/MyWidget.css`, import CSS at top of `MyWidget.js`.
  - Fix failing CRA test: replace the `learn react` assertion in `src/App.test.js` with a test that asserts the Calculator display, as shown above.

If anything in this doc is unclear or you want additional examples (testing patterns, sample PR text, or suggested changes to `App.test.js`), tell me which sections to expand and I will iterate. ✅
