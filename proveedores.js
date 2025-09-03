
const express = require('express'); //Se carga express para usar sus herramientas
const router = express.Router(); // Se utiliza .Router para crear las minirutas
const db = require('./db') // se llama a la conexion con la base de datos

//Insertar nuevo proveedor
router.post('/proveedores' , (req,res)=>{
    const { id_proveedor, nombre_proveedor, tel_proveedor,correo_proveedor, direccion_proveedor } = req.body;
    
    const sql = `
      INSERT INTO proveedor (
      id_proveedor,
      nombre_proveedor,
      tel_proveedor,
      correo_proveedor,
      direccion_proveedor
      )VALUES(?,?,?,?,?)
    `;

    db.query(sql,[id_proveedor, nombre_proveedor, tel_proveedor,correo_proveedor, direccion_proveedor],(err, result)=>{
        if(err) {
            console.error('Error al insetar proveedor:', err);
            res.status(500).json({mensaje: 'Error al insertar proveedor'});
        }else{
            res.status(201).json({ mensaje: 'Proveedor insertado correctamente'});

        }
    });

});

module.exports = router;
