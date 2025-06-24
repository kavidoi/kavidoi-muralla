# Muralla

Monorepo con frontend y backend separados para escalabilidad.

## Prerrequisitos

- Node.js >=18
- MongoDB (local o Atlas)

## Estructura del proyecto

```
.
├── client      # Next.js + TailwindCSS
└── server      # Express.js + MongoDB
```

### Backend

1. Ir a `server`:
   ```bash
   cd server
   npm install
   ```
2. Copiar `.env.example` a `.env` y configurar:
   ```env
   PORT=5000
   MONGO_URI=<tu_string_de_conexión>
   ```
3. Iniciar servidor:
   ```bash
   npm run dev
   ```

El backend correrá en http://localhost:5000

### Frontend

1. Ir a `client`:
   ```bash
   cd client
   npm install
   ```
2. Iniciar cliente:
   ```bash
   npm run dev
   ```

El frontend correrá en http://localhost:3000
