# DevBlog

Blog personal para publicar artículos técnicos. Incluye una sección interactiva de Anime que consulta el top de MyAnimeList y permite buscar animes por nombre.

## Features

- Crear, editar y eliminar posts con editor WYSIWYG
- Sección **/anime** con top de MyAnimeList (Jikan API)
- Buscador de animes por nombre con resultados en tiempo real
- Modal con información detallada de cada anime
- Skeleton loading, manejo de errores, diseño responsivo

## Stack

- **React 19** + TypeScript
- **Vite 8**
- **Tailwind CSS v4**
- **React Router v7**
- **Lucide React** (iconos)

## Getting started

```bash
pnpm install
pnpm dev
```

Abri [http://localhost:5173](http://localhost:5173).

### Scripts

| Comando | Descripción |
|---|---|
| `pnpm dev` | Inicia servidor de desarrollo |
| `pnpm build` | Compila TypeScript + Vite build |
| `pnpm lint` | Ejecuta ESLint |
| `pnpm preview` | Vista previa del build |

## Project structure

```
src/
├── components/   Layout.tsx
├── hooks/        useLocalStorage.ts, useJikan.ts
├── pages/        Home.tsx, CreatePost.tsx, Anime.tsx
├── types.ts      Interfaces
├── App.tsx       Rutas
├── main.tsx      Entry point
└── index.css     Estilos globales + animaciones
```

## API

Sección */anime* consume [Jikan API v4](https://jikan.moe/) (no requiere API key).

| Endpoint | Uso |
|---|---|
| `GET /v4/top/anime?limit=6` | Top animes |
| `GET /v4/anime?q={query}&limit=6&order_by=score&sort=desc&sfw` | Búsqueda |

## Routes

| Ruta | Página |
|---|---|
| `/` | Home — listado de posts |
| `/create` | Crear post |
| `/edit/:id` | Editar post |
| `/anime` | Top Anime + buscador |

