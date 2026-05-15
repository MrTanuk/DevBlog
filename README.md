# DevBlog

Blog personal construido con React + TypeScript + Vite + Tailwind CSS.

## Tecnologías

- **React 19** con TypeScript
- **Vite 8** como bundler
- **Tailwind CSS v4** para estilos
- **React Router v7** para navegación
- **Lucide React** para iconos
- **react-quill-new** para editor WYSIWYG
- **DOMPurify** para sanitización de HTML

## Integración con API externa

### Jikan API (MyAnimeList)

La sección **/anime** consume la [Jikan API](https://jikan.moe/) (versión 4), una API no oficial de MyAnimeList que no requiere autenticación.

- **Endpoint usado**: `GET /v4/top/anime?limit=6`
- **Sin API key**: Jikan es gratuita
- **Rate limit**: 30 requests por minuto (suficiente para un blog personal).

### Manejo de estados

| Estado | Componente | Descripción |
|---|---|---|
| Cargando | `Preloader` | Spinner animado con `Loader2` de Lucide |
| Error | Bloque con `AlertCircle` + botón de reintento | Muestra el mensaje de error HTTP |
| Éxito | Grid de `AnimeCard` | Tarjetas con imagen, score, géneros, episodios y año |


## Scripts disponibles

```bash
pnpm dev        # Inicia servidor de desarrollo
pnpm build      # Compila TypeScript + Vite build
pnpm lint       # Ejecuta ESLint
pnpm preview    # Vista previa del build
```
