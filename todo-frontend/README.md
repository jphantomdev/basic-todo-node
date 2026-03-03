# Todo Frontend

Interfaz de usuario para la Todo App, construida con **React 18**, **TypeScript** y **Vite**. Consume la API REST del backend.

## Funcionalidades

- Listar, crear, editar y eliminar tareas
- Marcar tareas como completadas
- Separación visual entre pendientes y completadas
- Manejo de errores de red

## Variables de entorno

Copia `.env.example` a `.env.local`:

```
VITE_API_URL=http://localhost:3001
```

## Instalación

```bash
npm install
```

## Scripts

```bash
npm run dev       # Servidor de desarrollo (puerto 3000)
npm run build     # Build de producción
npm run preview   # Preview del build
npm test          # Tests con Vitest y coverage
npm run lint      # ESLint
```

## CI / GitHub Actions

El workflow `.github/workflows/ci.yml` ejecuta en cada push/PR:

1. **Lint** — ESLint sobre los fuentes TypeScript/TSX  
2. **Test** — Vitest con coverage (@testing-library/react)  
3. **Build** — `vite build` validando que el bundle compile  
4. Sube el `dist/` y el reporte de coverage como artifacts

Corre en Node 18 y 20 en paralelo (matrix strategy).
