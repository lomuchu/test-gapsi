'use strict'

var express = require('express');
var ProveedorController = require('../controllers/proveedores');

var router = express.Router();

router.get('/proveedor/home' ,ProveedorController.home);
router.get('/proveedor/:page?' ,ProveedorController.gatAllPage);
// router.get('/proveedor/:id', ProveedorController.getresultById);
// router.put('/proveedor/:id',  ProveedorController.update);
 router.post('/proveedor/', ProveedorController.create);
 router.delete('/proveedor/:id', ProveedorController.deleteProveedor);


module.exports = router;