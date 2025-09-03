const express = require('express');
const router = express.Router();
const db = require('./db');

//Registrar un cajero
router.post('/cajero',(req,res)=>{
    const{
        id_cajero,
        nombre_cajero,
        telefono_cajero,
        correo_cajero
    }=req.body;

    const sql =`
        INSERT INTO cajero (
        id_cajero,
        nombre_cajero,
        telefono_cajero,
        correo_cajero)VALUES(?,?,?,?)
        `;
    
    db.query(sql,[
        id_cajero,
        nombre_cajero,
        telefono_cajero,
        correo_cajero
    ],(err,result)=>{
        if(err){
            console.error('Error al registrar cliente:',err);
            res.status(500).json({mensaje:'Error al registrar cliente'});
        } else {
            res.status(201).json({mensaje: 'Cliente registrado correctamente'})
        }
    });
});

//obtener clientes

router.get('/cajero',(req,res)=>{
    const sql = 'SELECT id_cajero,nombre_cajero FROM cajero';
    db.query(sql,(err,results)=>{
        if(err){
            console.error('Error al obtener cajero:',err);
            res.status(500).json({mensaje:'Error al obtener cliente'});
        }else{
            res.json(results)
        }
    })
})

module.exports = router;