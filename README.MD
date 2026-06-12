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

A continuación, la evidencia de consumo de la API:

1. **Obtener todos los mundiales:**
   `xh GET :4321/mundiales`
   *(Devuelve lista parcial)*

2. **Obtener mundiales con toda la información:**
   `xh GET :4321/mundiales include==full`
   *(Incluye campos de resumen y descripción)*

3. **Buscar un mundial específico:**
   `xh GET :4321/mundial/qatar-2022`
   *(Devuelve el JSON del mundial con código 200)*

4. **Validar recurso inexistente (404 Not Found):**
   `xh GET :4321/mundial/inexistente`
   *(Devuelve `{"error": "Not Found", "message": "Mundial no encontrado."}`)*

5. **Buscar slugs por país campeón:**
   `xh GET :4321/campeon/Argentina`
   *(Devuelve `["qatar-2022"]`)*

6. **Obtener un mundial al azar:**
   `xh GET :4321/random`

7. **Búsqueda por texto (ej. "final"):**
   `xh GET :4321/search/final`

8. **Validación de error (400 Bad Request) con Zod:**
   `xh GET :4321/search/ab`
   *(Falla porque requiere mínimo 3 caracteres, devuelve JSON con error 400)*