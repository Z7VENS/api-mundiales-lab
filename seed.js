import { initDb } from './db.js';

const mundiales = [
  {
    nombre: "Copa Mundial Qatar 2022",
    anio: 2022,
    sede: "Qatar",
    campeon: "Argentina",
    subcampeon: "Francia",
    goleador: "Kylian Mbappe",
    equipos: 32,
    imagen: "qatar-2022.avif",
    slug: "qatar-2022",
    resumen: "Argentina campeón tras una final épica ante Francia.",
    descripcion: "Primer Mundial en Medio Oriente; Argentina ganó en penales su tercer título."
  },
  {
    nombre: "Copa Mundial Rusia 2018",
    anio: 2018,
    sede: "Rusia",
    campeon: "Francia",
    subcampeon: "Croacia",
    goleador: "Harry Kane",
    equipos: 32,
    imagen: "rusia-2018.jpg",
    slug: "rusia-2018",
    resumen: "Francia consigue su segunda estrella.",
    descripcion: "El Mundial del VAR. Francia dominó con un fútbol pragmático y letal al contragolpe."
  },
  {
    nombre: "Copa Mundial Brasil 2014",
    anio: 2014,
    sede: "Brasil",
    campeon: "Alemania",
    subcampeon: "Argentina",
    goleador: "James Rodriguez",
    equipos: 32,
    imagen: "brasil-2014.jpg",
    slug: "brasil-2014",
    resumen: "Alemania se corona en Maracaná.",
    descripcion: "Recordado por el histórico 7-1 de Alemania a Brasil y el gol de Götze en la final."
  },
  {
    nombre: "Copa Mundial Sudáfrica 2010",
    anio: 2010,
    sede: "Sudáfrica",
    campeon: "España",
    subcampeon: "Países Bajos",
    goleador: "Thomas Müller",
    equipos: 32,
    imagen: "sudafrica-2010.jpg",
    slug: "sudafrica-2010",
    resumen: "El primer mundial africano corona al tiki-taka español.",
    descripcion: "España gana su primer Mundial con el icónico gol de Andrés Iniesta."
  },
  {
    nombre: "Copa Mundial Alemania 2006",
    anio: 2006,
    sede: "Alemania",
    campeon: "Italia",
    subcampeon: "Francia",
    goleador: "Miroslav Klose",
    equipos: 32,
    imagen: "alemania-2006.jpg",
    slug: "alemania-2006",
    resumen: "Italia vence en penales tras la despedida de Zidane.",
    descripcion: "Un torneo muy táctico, definido en tanda de penales y recordado por el cabezazo de Zidane."
  },
  {
    nombre: "Copa Mundial Corea-Japón 2002",
    anio: 2002,
    sede: "Corea del Sur y Japón",
    campeon: "Brasil",
    subcampeon: "Alemania",
    goleador: "Ronaldo",
    equipos: 32,
    imagen: "coreajapon-2002.jpg",
    slug: "coreajapon-2002",
    resumen: "El Fenómeno Ronaldo le da el pentacampeonato a Brasil.",
    descripcion: "Primer mundial en Asia y primero organizado por dos países en conjunto."
  }
];

async function seed() {
  const db = await initDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS mundiales (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      nombre TEXT, anio INTEGER, sede TEXT, campeon TEXT, subcampeon TEXT,
      goleador TEXT, equipos INTEGER, imagen TEXT, slug TEXT UNIQUE,
      resumen TEXT, descripcion TEXT
    )
  `);

  await db.exec(`DELETE FROM mundiales`); // Limpiar antes de insertar

  const stmt = await db.prepare(`
    INSERT INTO mundiales (nombre, anio, sede, campeon, subcampeon, goleador, equipos, imagen, slug, resumen, descripcion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  for (const m of mundiales) {
    await stmt.run(m.nombre, m.anio, m.sede, m.campeon, m.subcampeon, m.goleador, m.equipos, m.imagen, m.slug, m.resumen, m.descripcion);
  }
  
  await stmt.finalize();
  console.log("Base de datos poblada exitosamente.");
}

seed();