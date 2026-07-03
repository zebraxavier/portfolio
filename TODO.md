# TODO - Fix/clean Portfolio codebase

## Step 1 — Repo understanding
- [x] Inspect root files: `index.html`, `script.js`, `style.css`
- [x] Inspect React/Vite subproject: `portfolio-react/src/*`

## Step 2 — Plan approval
- [x] Confirm scope: fix both vanilla root app and React subproject

## Step 3 — Implement edits (root vanilla)
- [ ] Refactor `script.js` for clean code without changing functionality
- [ ] Add safety for transitionend not firing (no logic change)
- [ ] Minor DOM selector guarding if needed
- [ ] Fix potential missing `transitionend` handler reset

## Step 4 — Implement edits (React)
- [ ] Fix any syntax/runtime/logical issues found in `portfolio-react`
- [ ] Remove unwanted/dead/unneeded files per user request

## Step 5 — Verification
- [ ] Run quick check: `npm run build` inside `portfolio-react/`
- [ ] Manual run: verify navigation + contact form in vanilla app

