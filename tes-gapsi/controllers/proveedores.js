'use strict'

var file = require('../utils/files')

var token = function(n) {
    var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    var token = '';
    for(var i = 0; i < n; i++) {
        token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
}

var home =  function (req, res) {
    return res.status(200).send({
        message: 'Funcionando controlador de proveedores'
    });
}

var create = function(req, res) {

    var proveedor =req.body;
    file.readJSON(bd => {
        if(bd) {

            var f = bd.filter(item => item.nombre == proveedor.nombre);
            console.log("f", f)
            if(f && f.length > 0) {
                return res.status(500).send({
                    message: 'nombre repetido'
                });
            }
            proveedor.id = token(10);
            bd  = bd.concat(proveedor);
            file.writeJSON(bd, result => {
                if(result) {
        
                    return res.status(200).send({
                        message: 'se guardo correctamente'
                    });
                } else {
                    return res.status(500).send({
                        message: 'error al guardar proveedor'
                    });
                }
                
            });
        
        } else {
            
        return res.status(500).send({
            message: 'error al guardar proveedor'
        });
        }

    });
   
    
   
}

var deleteProveedor =  function(req, res) {
    var id = req.params.page;

    file.readJSON(bd => {
        console.log("bd 1", bd)
        if(bd) {
            bd.splice(bd.findIndex(e => e.id === id),1);
            console.log("bd 2", bd)
            file.writeJSON(bd, result => {
                if(result) {
        
                    return res.status(200).send({
                        message: 'se elimino correctament'
                    });
                } else {
                    return res.status(500).send({
                        message: 'error al guardar proveedor'
                    });
                }
                
            });
        
        } else {
            
        return res.status(500).send({
            message: 'error al guardar proveedor'
        });
        }

    });
}

var gatAllPage = function(req, res) {
    if (req.params.page) {
        var page = req.params.page;
    } else {
        var page = 1;
    }

    var itemsperpage = 10;

    var start = (page - 1 ) * itemsperpage;
    var end =  (page * itemsperpage) - 1;

    file.readJSON(bd => {
        if(bd) {
           var result = bd.filter((item, index) => index <= end && index >= start)
            
            return res.status(200).send({
                total: bd.length,
                list: result
            });
        
        } else {
            
        return res.status(500).send({
            message: 'error al guardar proveedor'
        });
        }
    });
}

var controller = {
    home,
    create,
    deleteProveedor,
    gatAllPage
}
module.exports = controller;