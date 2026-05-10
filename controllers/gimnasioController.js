
const pool = require('../db');

// 1. GET para listar todas las membresías
const obtenerMembresias = async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM membresias_gimnasio');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener membresías', error: error.message });
    }
};

// 2. GET por id
const obtenerMembresiaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await pool.query('SELECT * FROM membresias_gimnasio WHERE id = ?', [id]);
        
        if (rows.length === 0) {
            return res.status(404).json({ mensaje: 'Membresía no encontrada' });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al buscar la membresía', error: error.message });
    }
};

// 3. POST para crear
const crearMembresia = async (req, res) => {
    try {
        const { socio_nombre, plan, fecha_inicio, fecha_fin, costo_mensual, acceso_ilimitado } = req.body;

        if (!socio_nombre) {
            return res.status(400).json({ mensaje: 'El nombre del socio es obligatorio' });
        }

        const query = 'INSERT INTO membresias_gimnasio (socio_nombre, plan, fecha_inicio, fecha_fin, costo_mensual, acceso_ilimitado) VALUES (?, ?, ?, ?, ?, ?)';
        const [resultado] = await pool.query(query, [socio_nombre, plan, fecha_inicio, fecha_fin, costo_mensual, acceso_ilimitado]);

        res.status(201).json({ mensaje: 'Membresía creada exitosamente', id: resultado.insertId });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la membresía', error: error.message });
    }
};

// 4. PUT para actualizar
const actualizarMembresia = async (req, res) => {
    try {
        const { id } = req.params;
        const { socio_nombre, plan, fecha_inicio, fecha_fin, costo_mensual, acceso_ilimitado } = req.body;

        const query = 'UPDATE membresias_gimnasio SET socio_nombre=?, plan=?, fecha_inicio=?, fecha_fin=?, costo_mensual=?, acceso_ilimitado=? WHERE id=?';
        const [resultado] = await pool.query(query, [socio_nombre, plan, fecha_inicio, fecha_fin, costo_mensual, acceso_ilimitado, id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Membresía no encontrada para actualizar' });
        }
        res.json({ mensaje: 'Membresía actualizada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar', error: error.message });
    }
};

// 5. DELETE para eliminar
const eliminarMembresia = async (req, res) => {
    try {
        const { id } = req.params;
        const [resultado] = await pool.query('DELETE FROM membresias_gimnasio WHERE id = ?', [id]);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Membresía no encontrada para eliminar' });
        }
        res.json({ mensaje: 'Membresía eliminada' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar', error: error.message });
    }
};

module.exports = {
    obtenerMembresias,
    obtenerMembresiaPorId,
    crearMembresia,
    actualizarMembresia,
    eliminarMembresia
};