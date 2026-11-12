# SCM Pipeline Demo: Static Site with a Lint Gate

A small HTML/CSS/JavaScript site hosted on GitHub Pages. Every push to `main` runs a GitHub Actions workflow that:

1. **Lints** the JavaScript with ESLint. If any rule fails, the workflow stops.
2. **Packages** the site into `_site/`.
3. **Deploys** it to GitHub Pages. This step runs only if lint passed.

## Project layout

```
index.html                  Page markup
css/style.css               Styles (light and dark theme)
js/main.js                  Checklist progress and theme toggle
eslint.config.mjs           ESLint rules
package.json                Dev dependency on ESLint, `npm run lint` script
.github/workflows/deploy.yml  Lint-then-deploy pipeline
PROMPTS.md                  LLM prompts used to build this project
```

## Step 1: Push to a public GitHub repository

Create an empty public repository on GitHub (for example `scm-pipeline-demo`), then run these commands in the project folder:

```bash
git init -b main
git add .
git commit -m "Initial commit: static site with lint-gated deployment"
git remote add origin https://github.com/YOUR-USERNAME/scm-pipeline-demo.git
git push -u origin main
```

## Step 2: Turn on GitHub Pages

1. Open the repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment → Source**, choose **GitHub Actions**.
3. Push again (or open the **Actions** tab and run **Lint and Deploy to GitHub Pages** manually with `workflow_dispatch`).

The live site will be at `https://YOUR-USERNAME.github.io/scm-pipeline-demo/`.

## Step 3: Test the lint gate by breaking a rule

This is the test for the quality check. Each time, watch the **Actions** tab.

**a. Break the rule.** In `js/main.js`, find this line:

```js
  const percent = Math.round((done / total) * 100);
```

Remove the semicolon at the end so it reads:

```js
  const percent = Math.round((done / total) * 100)
```

**b. Push the broken code.**

```bash
git add js/main.js
git commit -m "Test: remove semicolon to break lint"
git push
```

**c. Confirm the failure.** In the **Actions** tab, the **lint** job should fail with an error like `Missing semicolon. (semi)`. The **deploy** job should show as skipped, so the broken site is not published.

**d. Fix and push again.** Restore the semicolon, then commit and push:

```bash
git add js/main.js
git commit -m "Fix: restore semicolon so lint passes"
git push
```

**e. Confirm the success.** Both **lint** and **deploy** jobs should now pass, and the site should update.

## Running lint locally (optional)

If you have Node.js 20 or newer installed:

```bash
npm install
npm run lint
```

## How the lint gate works

- `deploy.yml` declares `needs: lint` on the deploy job. GitHub only starts deploy after lint succeeds.
- `eslint.config.mjs` sets `semi: ["error", "always"]`, so a missing semicolon is an error, not a warning.
- The other rules are `eqeqeq`, `no-undef`, `no-var`, `prefer-const` (errors) and `no-unused-vars` (warning).
