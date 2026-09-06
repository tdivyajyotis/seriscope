# Website for SeriScope

Served by Github Pages and built with Jekyll & [minimal-light](https://github.com/yaoyao-liu/minimal-light)

## Integration and conflict notes

- Base-branch conflict risk is currently low: `dev` already contains `origin/main` (merge base `ca8f440`), so there are no pending merge conflicts with base at this moment.
- This branch now contains two site stacks:
  - Legacy Jekyll templates/styles (`_layouts/`, `assets/css/`, `assets/js/`, `index.md`)
  - New Vinext app templates/styles (`app/`, `components/`, `app/globals.css`, `app/identity.css`)
- To avoid template/style conflicts in deployment, run only one pipeline per target environment (Jekyll **or** Vinext), not both for the same published site.

## Build and lint alert notes

- `pnpm run build` currently succeeds.
- `pnpm run lint` currently reports existing issues in legacy JS (`assets/js/*`, `html_source_file/assets/js/*`) and generated UI component files (`components/ui/*`).
- If CI is configured to fail on lint, treat these as known blockers until lint scope/rules are aligned with the intended deployment stack.

<a href="https://seriscope.com">SeriScope</a> © 2025 by <a href="https://tdivyajyotis.in">Suryakanta Lenka &amp; Tripathy Divyajyoti Senapati</a> is licensed under the <a href="https://seriscope.com/assets/EUPL-1.2%20EN.txt">European Union Public Licence v. 1.2</a>
