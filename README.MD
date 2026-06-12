# API Copa Mundial de la FIFA

Este repositorio contiene una API REST desarrollada con Node.js, Express y SQLite sobre la historia de los Mundiales.

## ¿Cómo ejecutar el proyecto?

1. Instala las dependencias:
   \`\`\`bash
   npm install
   \`\`\`
2. Pobla la base de datos y crea la tabla SQLite (ejecutar solo la primera vez):
   \`\`\`bash
   node seed.js
   \`\`\`
3. Levanta el servidor:
   \`\`\`bash
   node server.js
   \`\`\`
4. El servidor estará escuchando en `http://localhost:4321`.

## Pruebas de los Endpoints (usando xh)


A continuación, se presentan las capturas de pantalla de cada endpoint funcional de la API REST:

| Endpoint | Descripción | Captura |
| :--- | :--- | :--- |
| `GET /mundiales` | Listado estándar | ![Listado](docs/captura1.png) |
| `GET /mundiales?include=full` | Listado completo | ![Listado Full](docs/captura2.png) |
| `GET /mundial/qatar-2022` | Consulta por slug | ![Consulta](docs/captura3.png) |
| `GET /mundial/inexistente` | Manejo de error 404 | ![Error 404](docs/captura4.png) |
| `GET /campeon/Argentina` | Filtro por campeón | ![Filtro](docs/captura5.png) |
| `GET /random` | Mundial al azar | ![Random](docs/captura6.png) |
| `GET /search/final` | Búsqueda por texto | ![Búsqueda](docs/captura7.png) |
| `GET /search/ab` | Validación Zod (400) | ![Error 400](docs/captura8.png) |