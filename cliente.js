
const express = require('express');
const router = express.Router();
const db = require('./db');

//Registrar un cliente
router.post('/cliente',(req,res)=>{
    const {
        id_cliente,
        nombre_cliente,
        telefono_cliente,
        correo_cliente,
        direccion_cliente
    }=req.body;

    const sql = `
        INSERT INTO cliente (
      id_cliente,
      nombre_cliente,
      telefono_cliente,
      correo_cliente,
      direccion_cliente
    ) VALUES (?, ?, ?, ?, ?)
    `;

    db.query(sql,[
        id_cliente,
        nombre_cliente,
        telefono_cliente,
        correo_cliente,
        direccion_cliente
    ],(err,result)=>{
        if(err){
            console.error('Error al registrar cliente:', err);
            res.status(500).json({ mensaje: 'Error al registrar cliente' });
        } else {
            res.status(201).json({ mensaje: 'Cliente registrado correctamente' });
    }        
    });
});

//Obtener clientes

router.get('/cliente',(req,res)=>{
    const sql = 'SELECT id_cliente, nombre_cliente FROM cliente';
    db.query(sql,(err,results)=>{
        if(err){
            console.error('Error al obtener cliente:',err);
            res.status(500).json({mensaje:'Error al obtener cliente'});
        }else{
            res.json(results)
        }
    })
})

module.exports = router;