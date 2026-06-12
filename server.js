import express from 'express';
import { z } from 'zod';
import { initDb } from './db.js';

const app = express();
const PORT = 4321;
const BASE_URL = `http://localhost:${PORT}`;

// Middleware para servir las imágenes estáticas sin vistas
app.use('/imagenes', express.static('public/imagenes'));

// Schema de validación Zod
const searchSchema = z.object({
  text: z.string().min(3, "El término de búsqueda debe tener al menos 3 caracteres")
});

// Función auxiliar para formatear la respuesta con la URL absoluta de la imagen
const formatMundial = (m) => ({
  ...m,
  imagen: `${BASE_URL}/imagenes/${m.imagen}`
});

// Rutas
app.get('/', (req, res) => {
  res.json({
    name: "API Copa Mundial de la FIFA",
    version: "1.0.0",
    description: "Información histórica de los mundiales."
  });
});

app.get('/mundiales', async (req, res) => {
  const db = await initDb();
  const include = req.query.include;
  
  const mundiales = await db.all(`SELECT * FROM mundiales`);
  
  // Si no es full, omitimos resumen y descripción para simular comportamiento típico
  const data = mundiales.map(m => {
    const formatted = formatMundial(m);
    if (include !== 'full') {
      delete formatted.resumen;
      delete formatted.descripcion;
    }
    return formatted;
  });

  res.status(200).json(data);
});

app.get('/mundial/:slug', async (req, res) => {
  const db = await initDb();
  const mundial = await db.get(`SELECT * FROM mundiales WHERE slug = ?`, [req.params.slug]);

  if (!mundial) {
    return res.status(404).json({ error: "Not Found", message: "Mundial no encontrado." });
  }

  res.status(200).json(formatMundial(mundial));
});

app.get('/campeon/:pais', async (req, res) => {
  const db = await initDb();
  // Busca todas las ediciones donde el país fue campeón
  const mundiales = await db.all(`SELECT slug FROM mundiales WHERE campeon LIKE ?`, [req.params.pais]);
  
  // Retorna solo un array de slugs
  res.status(200).json(mundiales.map(m => m.slug));
});

app.get('/random', async (req, res) => {
  const db = await initDb();
  const mundial = await db.get(`SELECT * FROM mundiales ORDER BY RANDOM() LIMIT 1`);
  res.status(200).json(formatMundial(mundial));
});

app.get('/search/:text', async (req, res) => {
  try {
    // Validación con Zod
    const { text } = searchSchema.parse(req.params);
    
    const db = await initDb();
    const resultados = await db.all(`
      SELECT * FROM mundiales 
      WHERE nombre LIKE ? OR resumen LIKE ? OR descripcion LIKE ?
    `, [`%${text}%`, `%${text}%`, `%${text}%`]);

    res.status(200).json(resultados.map(formatMundial));

  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ 
        error: "Bad Request", 
        message: error.issues[0].message 
      });
    }
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Middleware Catch-All para errores 404 (rutas no definidas)
app.use((req, res) => {
  res.status(404).json({ 
    error: "Not Found", 
    message: "No existe el recurso solicitado o la ruta no está definida." 
  });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en ${BASE_URL}`);
});