const express = require('express');
const router = express.Router();
const db = require('./db')

//Ruta para registrar inventario
router.post('/inventario',(req, res) => {
    const {
        id_proveedor,
        id_articulo,
        fecha,
        cantidad_suministrada,
        estado
    }= req.body;

    const sql = `
        INSERT INTO proveedor_articulo (
            id_proveedor,
            id_articulo,
            fecha,
            cantidad_suministrada,
            estado
        )VALUES (?,?,?,?,?)
    `;

    db.query(sql, [
        id_proveedor,
        id_articulo,
        fecha,
        cantidad_suministrada,
        estado
    ],(err,result)=>{
        if (err) {
            console.error('Error al registrar inventario:',err);
            res.status(500).json({mensaje:'Error al registrar inventario'})
        }else{
            //Actualizar stock
            const actualizarStockSQL=`
                UPDATE articulo
                SET stock = stock + ?
                WHERE id_articulo = ?
        `;
            db.query(actualizarStockSQL,[cantidad_suministrada,id_articulo],(err2,result2)=>{
                if(err2){
                    console.error('Error al actualizar el stock del articulo:',err2);
                    res.status(500).json({mensaje:'Inventario resgistrado, pero error al actualizar inventario'})
                }else{
                    res.status(201).json({mensaje:'Inventario registrado y stock actualizado'})
                }
            });        
        }
    });
});

//Obtener proveedores
router.get('/proveedores',(req, res) =>{
    const sql = 'SELECT id_proveedor, nombre_proveedor FROM proveedor';
    db.query(sql,(err, results) => {
        if(err){
            console.error('Error al obtener proveedores:',err)
            res.status(500).json({mensaje:'Error al obtener proveedores'})
        }else{
            res.json(results)
        }
    });
});



//Mostrar inventario

router.get('/inventario',(req,res)=>{
    const sql = `
        SELECT
            pa.id_proveedor_articulo,
            p.nombre_proveedor,
            a.nombre_articulo,
            pa.fecha,
            pa.cantidad_suministrada,
            pa.estado
        FROM proveedor_articulo pa
        JOIN proveedor p ON pa.id_proveedor = p.id_proveedor
        JOIN articulo a ON pa.id_articulo = a.id_articulo
        ORDER BY pa.fecha DESC
        `;

        db.query(sql,(err,results)=>{
            if(err){
                console.error('Error al obtener inventario:',err);
                res.status(500).json({mensaje: 'Error al obtener inventario'});
            }else{
                res.json(results);
            }
        });
});


module.exports= router;