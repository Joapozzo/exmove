import express from "express";
import rutasApi from "./rutas/rutasApi.mjs";
import rutasFront from "./rutas/rutasFront.mjs";
import pg from "pg";

const { Pool } = pg;

const PORT = 3000;

const app = express();

const pool = new Pool({
    user: 'root',
    host: 'localhost',
    database: 'cine',
    password: 'pass',
    port: 5432,
});

app.use((req, res, next) => {
    req.pool = pool;
    next();
});

app.use(rutasApi);
app.use(rutasFront);

app.get('/home', (req, res) => {
    res.send('Hola');
});

app.listen(PORT, () => {
    console.log(`Corriendo en el servidor localhost:${PORT}`);
});
