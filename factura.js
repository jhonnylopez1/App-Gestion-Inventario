const express = require('express');
const router = express.Router();
const db = require('./db');

//Ruta para registrar la factura
router.post('/factura',(req, res)=>{
    const {
        id_cajero,
        id_cliente,
        fecha_factura,
        estado,
        impuestos,
        metodo_pago,
        total,
        articulos
      } = req.body;

    const sql = `
        INSERT INTO factura (
            id_cajero,
            id_cliente,
            fecha_factura,
            estado,
            impuestos,
            metodo_pago,
            total
            ) VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(sql,[
        id_cajero,
        id_cliente,
        fecha_factura,
        estado,
        impuestos,
        metodo_pago,
        total
    ],(err,result)=>{
        if(err){
            console.error('Error al registrar factura:',err);
            res.status(500).json({mensaje:'Error al registrar factura'});
        }

        const id_factura = result.insertId; // se obtiene el ID autogenerado

        //Insertar articulos en la talba articulo_factura
        const sqlArticuloFactura=`
            INSERT INTO articulo_factura(
                id_articulo,
                id_factura,
                subtotal,
                cantidad_articulos
                )VALUES ?
                `;
        const valores = articulos.map(art=>[
            art.id_articulo,
            id_factura,
            art.precio*art.cantidad,
            art.cantidad
        ]);

        db.query(sqlArticuloFactura,[valores],(err2)=>{
            if(err2){
                console.error('Error al registrar articulos de la factura',err2);
                res.status(500).json({mensaje:'Factura creada pero error en articulos'});
            }
            //Restar del Stock
            const sqlActualizarStock= `
                UPDATE articulo
                SET stock = stock - ?
                WHERE id_articulo = ? AND stock >=?
                `;
            let erroresStock =0;

            articulos.forEach((art,index)=>{
                db.query(sqlActualizarStock,[art.cantidad,art.id_articulo,art.cantidad], (err3, result3) => {
                    if (err3 || result3.affectedRows === 0) {
                        console.error(` Error al actualizar stock para artículo ID ${art.id_articulo}:`, err3 || 'Stock insuficiente');
                        erroresStock++;
                    }

                    // Responder solo después del último artículo
                    if (index === articulos.length - 1) {
                        if (erroresStock > 0) {
                            return res.status(500).json({ mensaje: 'Factura registrada, pero error al actualizar stock en uno o más artículos' });
                        }

                        res.status(201).json({ mensaje: 'Factura, artículos y stock actualizados correctamente' });
                    }
                })
            })
        })
    });
      
});

module.exports=router;