const express = require('express');
const router = express.Router();



const climaController = require('../controllers/climaController');


router.get('/', climaController.obtenerEstaciones);           // Para listar todas
router.get('/:id', climaController.obtenerEstacionPorId);     // Para buscar una
router.post('/', climaController.crearEstacion);              // Para crear
router.put('/:id', climaController.actualizarEstacion);       // Para actualizar
router.delete('/:id', climaController.eliminarEstacion);      // Para borrar


module.exports = router;