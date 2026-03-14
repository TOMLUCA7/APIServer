## React + Vite
# Recipe Vault (Frontend)

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
Recipe Vault is a full-stack recipe manager. This repo contains the React client built with Vite. All data is served from my own backend API (auth, user profiles, recipes, and images) — no mock data.

Currently, two official plugins are available:
## What this app does
- Register and login users with JWT auth.
- Browse recipes and open a details modal with ingredients/instructions.
- Create new recipes with image upload (Cloudinary) or image URL.
- Update existing recipes with prefilled form data.
- Delete only the user’s own recipes (with confirmation).
- View a profile page with the user’s uploaded recipes.

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)
## Main pages
- `/` Home: latest recipes grid + details modal.
- `/login` Login form.
- `/register` Register form.
- `/profile` Profile + user recipes.
- `/recipes/new` Add recipe.
- `/recipes/:id/update` Update recipe (prefilled).

## React Compiler
## Backend API (my own server)
This client expects my server to provide:
- `POST /auth/register` returns a user (and is followed by login).
- `POST /auth/login` returns `token` + `user`.
- `GET /recipes` list recipes.
- `GET /recipes/:id` get a single recipe.
- `GET /recipes/my-recipes` user’s recipes (requires auth).
- `POST /recipes` create (multipart form-data).
- `PUT /recipes/:id` update (multipart form-data).
- `DELETE /recipes/:id` delete (auth + ownership).

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).
Image uploads use `multipart/form-data` with field name `image`. The server uploads to Cloudinary and stores `imageUrl`.

## Expanding the ESLint configuration
## Tech stack & libraries
- React 19 + React Router
- Vite
- Tailwind CSS v4
- Radix UI (Dialog, Toast, Slot)
- Axios
- class-variance-authority + clsx + tailwind-merge
- Lucide icons

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
## Environment
Set the API base URL with:
- `VITE_API_BASE_URL=http://localhost:3000`

## Scripts
- `npm run dev` start dev server
- `npm run build` build for production
- `npm run preview` preview build
- `npm run lint` run ESLint
