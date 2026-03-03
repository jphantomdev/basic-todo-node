# Todo Backend

REST API para una lista de Todos construida con **Node.js**, **Express** y **TypeScript**. Los datos se almacenan en memoria (array interno), sin base de datos.

## Endpoints

| Método | Ruta         | Descripción         |
|--------|--------------|---------------------|
| GET    | /todos       | Listar todos        |
| GET    | /todos/:id   | Obtener uno por id  |
| POST   | /todos       | Crear todo          |
| PUT    | /todos/:id   | Actualizar todo     |
| DELETE | /todos/:id   | Eliminar todo       |
| GET    | /health      | Health check        |

## Instalación

```bash
npm install
```

## Scripts

```bash
npm run dev      # Desarrollo con ts-node
npm run build    # Compilar TypeScript
npm start        # Iniciar desde dist/
npm test         # Correr tests con Jest
npm run lint     # ESLint
```

## CI / GitHub Actions

El workflow `.github/workflows/ci.yml` ejecuta en cada push/PR:

1. **Lint** — ESLint sobre los fuentes TypeScript  
2. **Build** — Compilación con `tsc`  
3. **Test** — Jest con coverage  
4. Sube el reporte de cobertura como artifact

Corre en Node 18 y 20 en paralelo (matrix strategy).
