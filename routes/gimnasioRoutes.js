const express = require('express');
const router = express.Router();
const gimnasioController = require('../controllers/gimnasioController');

router.get('/', gimnasioController.obtenerMembresias);
router.get('/:id', gimnasioController.obtenerMembresiaPorId);
router.post('/', gimnasioController.crearMembresia);
router.put('/:id', gimnasioController.actualizarMembresia);
router.delete('/:id', gimnasioController.eliminarMembresia);

module.exports = router;