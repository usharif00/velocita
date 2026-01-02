# Velocita

[![Deploy to Cloudflare][![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/usharif00/velocita)]

A production-ready full-stack application template powered by Cloudflare Workers and Pages. Features a modern React frontend with TypeScript, Tailwind CSS, shadcn/ui components, and a Hono-based API backend. Designed for rapid development and seamless deployment on Cloudflare's global edge network.

## Features

- **Full-Stack Ready**: React 18 frontend with routing, state management, and API integration.
- **Modern UI**: shadcn/ui components, Tailwind CSS with custom themes, dark mode support.
- **API Backend**: Hono router with CORS, logging, and error handling. Extend via `worker/userRoutes.ts`.
- **Developer Experience**: Hot reload, TypeScript, Vite bundling, TanStack Query, React Router.
- **Edge Deployment**: Zero-config deployment to Cloudflare Workers/Pages with asset handling.
- **Performance**: Optimized for edge computing, with code splitting and lazy loading.
- **Extensible**: Sidebar layout, error boundaries, theme toggle, and mobile-responsive design.

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide icons, Framer Motion, Sonner toasts.
- **State & Data**: TanStack Query, Zustand (via immer), React Hook Form, Zod validation.
- **Backend**: Hono, Cloudflare Workers, Workers KV/Durable Objects ready.
- **UI Components**: Radix UI primitives, Headless UI, DND Kit.
- **Tools**: Bun (package manager), Wrangler (CLI), ESLint, Prettier.

## Quick Start

1. **Clone and Install**:
   ```bash
   git clone <your-repo-url>
   cd velocita-f7-9igcusyvzzolphj0tz
   bun install
   ```

2. **Development**:
   ```bash
   bun run dev
   ```
   Opens at `http://localhost:3000` (or `$PORT`).

3. **Build and Preview**:
   ```bash
   bun run build
   bun run preview
   ```

## Installation

Ensure [Bun](https://bun.sh/) is installed (`curl -fsSL https://bun.sh/install | bash`).

```bash
bun install
bun run cf-typegen  # Generate Worker types
```

## Development

- **Frontend**: Edit `src/` files. Vite handles HMR.
- **Backend**: Add routes in `worker/userRoutes.ts`. Restart dev server for changes.
- **Custom Styling**: Extend `tailwind.config.js` and `src/index.css`.
- **API Testing**: Routes available at `/api/*` (e.g., `/api/health`, `/api/test`).
- **Linting**: `bun run lint`.

Key files:
- `src/main.tsx`: App entrypoint with routing and providers.
- `src/pages/HomePage.tsx`: Replace with your app UI.
- `worker/userRoutes.ts`: Add custom API endpoints.

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server (frontend + worker proxy). |
| `bun run build` | Build for production (dist/ + worker/). |
| `bun run preview` | Local preview of production build. |
| `bun run lint` | Run ESLint. |
| `bun run deploy` | Build and deploy to Cloudflare. |
| `bun run cf-typegen` | Update Worker types. |

## Deployment

[![Deploy to Cloudflare](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/usharif00/velocita)

1. **Configure Wrangler**:
   Edit `wrangler.jsonc` with your Cloudflare account ID (run `wrangler whoami`).

2. **Login**:
   ```bash
   bunx wrangler login
   bunx wrangler deploy  # Or bun run deploy
   ```

3. **Custom Domain**:
   ```bash
   bunx wrangler deploy --name my-app
   bunx wrangler pages publish dist --project-name my-app
   ```

Assets (frontend) are served via Pages integration. API routes (`/api/*`) handled by Worker.

## Extending the Template

- **New Pages**: Add to `src/main.tsx` router.
- **API Routes**: `worker/userRoutes.ts` (CORS pre-configured).
- **Components**: Use shadcn CLI: `bunx shadcn@latest add <component>`.
- **Layout**: Use `AppLayout` from `src/components/layout/AppLayout.tsx` for sidebar.
- **State**: TanStack Query for data fetching, hooks in `src/hooks/`.

## License

MIT. See [LICENSE](LICENSE) for details.