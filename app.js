const express = require('express')
const db = require('./db');
const app = express()
const port = 3000
app.use(express.json());



app.get('/personas', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM persona');
        res.json(rows);
    } catch (error) {
        res.status(500).send(error.message);
    }
})
app.get('/personas/:id', async (req, res) => {
    try {
        var id = req.params.id;
        const query = 'SELECT * FROM persona where idpersona = ?'
        const [rows] = await db.query(query, [id]);
        res.json(rows[0]);
    } catch (error) {
        res.status(500).send(error.message);
    }
})

app.post('/personas', async (req, res) => {
    const { nombre, apellido, edad, cargo } = req.body; // Extraemos los datos del cuerpo de la petición
    // Validación básica
    if (!nombre || !apellido || !edad|| !cargo) {
        return res.status(400).json({ error: 'Nombre y email son obligatorios' });
    }
    try {
        // Usamos "?" como placeholders para prevenir inyección SQL
        const query = 'INSERT INTO persona (nombre, apellido, edad,cargo) VALUES (?, ?, ?, ?)';
        const [result] = await db.query(query, [nombre, apellido, edad,cargo]);
        res.status(201).json({
            mensaje: 'Usuario guardado con éxito',
            id: result.insertId // Retornamos el ID generado en la DB
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
})

app.put('/personas/:id', async (req, res) => {
    var id = req.params.id;
    const { nombre, apellido, edad, cargo} = req.body; // Extraemos los datos del cuerpo de la petición
    // Validación básica
    if (!nombre || !apellido || !edad || !cargo) {
        return res.status(400).json({ error: 'Nombre y email son obligatorios' });
    }
    try {
        // Usamos "?" como placeholders para prevenir inyección SQL
        const query = 'UPDATE persona SET nombre= ?, apellido=?, edad=?, cargo=?  where idpersona = ? ';
        console.log (query);
        const [result] = await db.query(query, [nombre, apellido, edad, cargo, id]);
        res.status(201).json({
            mensaje: 'Usuario guardado con éxito',
            id: result.insertId // Retornamos el ID generado en la DB
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }
})

app.delete('/personas/:id', async (req, res) => {
    var id = req.params.id;
    try {
        // Usamos "?" como placeholders para prevenir inyección SQL
        const query = 'DELETE FROM persona WHERE idpersona = ?';
        const [result] = await db.query(query, [id]);
        res.status(201).json({
            mensaje: 'Usuario eliminado con éxito'
        });
    } catch (error) {
        res.status(500).json({ error: 'Error al guardar en la base de datos' });
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})