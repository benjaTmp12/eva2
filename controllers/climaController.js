
const pool = require('../db'); 

// 1. GET para listar todo
const obtenerEstaciones = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM estaciones_clima');
        res.json(rows); 
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener estaciones', error: error.message });
    }
};

// 2. GET por id
const obtenerEstacionPorId = async (req, res) => {
    try {
        const { id } = req.params; 
        const [rows] = await pool.query('SELECT * FROM estaciones_clima WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Estación no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar la estación', error: error.message });
    }
};

// 3. POST para crear
const crearEstacion = async (req, res) => {
    try {
        const { nombre_estacion, latitud, longitud, altitud_metros, ciudad, activa } = req.body;

        
        if (!nombre_estacion) {
            return res.status(400).json({ mensaje: 'El nombre de la estación es obligatorio' });
        }

        const query = 'INSERT INTO estaciones_clima (nombre_estacion, latitud, longitud, altitud_metros, ciudad, activa) VALUES (?, ?, ?, ?, ?, ?)';
        const [resultado] = await pool.query(query, [nombre_estacion, latitud, longitud, altitud_metros, ciudad, activa]);

        res.status(201).json({ mensaje: 'Estación creada', id: resultado.insertId });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear', error: error.message });
    }
};

// 4. PUT para actualizar todo
const actualizarEstacion = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_estacion, latitud, longitud, altitud_metros, ciudad, activa } = req.body;

        const query = 'UPDATE estaciones_clima SET nombre_estacion=?, latitud=?, longitud=?, altitud_metros=?, ciudad=?, activa=? WHERE id=?';
        const [resultado] = await pool.query(query, [nombre_estacion, latitud, longitud, altitud_metros, ciudad, activa, id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Estación no encontrada para actualizar' });
        }
        res.json({ mensaje: 'Estación actualizada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar', error: error.message });
    }
};

// 5. DELETE para eliminar
const eliminarEstacion = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await pool.query('DELETE FROM estaciones_clima WHERE id = ?', [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Estación no encontrada para eliminar' });
        }
        res.json({ mensaje: 'Estación eliminada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
    }
};


module.exports = {
    obtenerEstaciones,
    obtenerEstacionPorId,
    crearEstacion,
    actualizarEstacion,
    eliminarEstacion
};