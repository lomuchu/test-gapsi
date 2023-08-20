'use strict'

var express = require('express');
var compression = require('compression');
var bodyparser = require('body-parser');

var app = express();
app.use(compression());

var proveedor_routes = require('./routes/proveedores');

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
// Rutas
app.use('/api', proveedor_routes);

module.exports = app;