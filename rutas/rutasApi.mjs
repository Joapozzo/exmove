import express from "express";

const rutasApi = express.Router();

rutasApi.use(express.json());
rutasApi.use(express.urlencoded({ extended: false }));

rutasApi.get('/api/v1/peliculas', async (req, res) => {
    try {
        const result = await req.pool.query('SELECT * FROM peliculas WHERE estado = $1', ['A']);
        res.json(result.rows);
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).send('Error en el servidor');
    }
});

rutasApi.get('/api/v1/peliculas/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const result = await req.pool.query('SELECT * FROM peliculas WHERE estado = $1 AND id = $2', ['A', id]);
        if (result.rowCount === 0) {
            return res.status(404).json({mensage: 'No se encontro pelicula para ese id'})
        }
        res.json(result.rows);
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).send('Error en el servidor');
    }
});

rutasApi.post('/api/v1/peliculas', async (req, res) => {
    const {nombre, descripcion, duracion, categoria, imagen} = req.body;

    if (!nombre || !descripcion || !duracion || !categoria || !imagen) {
        return res.status(400).json({
            mensaje: 'Faltan datos importantes: nombre, descripcion, duracion, categoria e imagen son requeridos.'
        });
    }

    try {
        const result = await req.pool.query(
            'INSERT INTO peliculas (nombre, descripcion, duracion, categoria, imagen, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [nombre, descripcion, duracion, categoria, imagen, 'A']
        );
    
        const peliculaId = result.rows[0].id;
    
        res.status(201).json({
            mensaje: 'Película creada exitosamente',
            peliculaId: peliculaId
        });
    } catch (error) {
        console.error('Error al insertar la película:', error);
        res.status(500).json({
            mensaje: 'Error al insertar la película en la base de datos'
        });
    }
    
});

rutasApi.put('/api/v1/peliculas/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    const { nombre, descripcion, duracion, categoria, imagen } = req.body;

    // Validaciones
    if (!nombre || typeof nombre !== 'string') {
        return res.status(400).json({
            mensaje: 'Falta el nombre o no es una cadena válida.'
        });
    }
    if (!descripcion || typeof descripcion !== 'string') {
        return res.status(400).json({
            mensaje: 'Falta la descripción o no es una cadena válida.'
        });
    }
    if (!duracion || typeof duracion !== 'number' || duracion <= 0) {
        return res.status(400).json({
            mensaje: 'Falta la duración o no es un número válido.'
        });
    }
    if (!categoria || typeof categoria !== 'string') {
        return res.status(400).json({
            mensaje: 'Falta la categoría o no es una cadena válida.'
        });
    }
    if (!imagen || typeof imagen !== 'string') {
        return res.status(400).json({
            mensaje: 'Falta la imagen o no es una cadena válida.'
        });
    }

    try {
        const result = await req.pool.query(
            'UPDATE peliculas SET nombre = $1, descripcion = $2, duracion = $3, categoria = $4, imagen = $5 WHERE id = $6 RETURNING id',
            [nombre, descripcion, duracion, categoria, imagen, id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                mensaje: 'Película no encontrada.'
            });
        }

        const peliculaId = result.rows[0].id;

        res.status(200).json({
            mensaje: 'Película actualizada exitosamente',
            peliculaId: peliculaId
        });
    } catch (error) {
        console.error('Error al actualizar la película:', error);
        res.status(500).json({
            mensaje: 'Error al actualizar la película en la base de datos'
        });
    }
});

rutasApi.delete('/api/v1/peliculas/:id', async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        const result = await req.pool.query(
            'UPDATE peliculas set estado = $1 WHERE id = $2 RETURNING id',
            ['I', id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({
                mensaje: 'Película no encontrada.'
            });
        }

        const peliculaId = result.rows[0].id;

        res.status(200).json({
            mensaje: 'Película dada de baja exitosamente',
            peliculaId: peliculaId
        });
    } catch (error) {
        console.error('Error al actualizar la película:', error);
        res.status(500).json({
            mensaje: 'Error al actualizar la película en la base de datos'
        });
    }
});

export default rutasApi;
