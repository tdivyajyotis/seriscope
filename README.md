# SeriScope

The public website for SeriScope, an edge-AI platform for Pebrine screening and
fertility assessment in Tasar silkworm eggs.

## Development

Requirements: Node.js 22.13 or newer and pnpm.

```sh
pnpm install
pnpm dev
```

## Quality checks

```sh
pnpm lint
pnpm build
```

The production build is a fully static export. Generated HTML and assets are
written to `dist/client`, which can be served by a static host with clean-URL
support. The existing Sites configuration can also package and deploy the same
output.

## License

SeriScope © 2025 Suryakanta Lenka and Tripathy Divyajyoti Senapati. Licensed
under the [European Union Public Licence v1.2](LICENSE).
