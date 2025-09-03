
//Creacion de ruta articulos

const express = require('express'); //Carga express
const router = express.Router(); //Crea una instancia del enrutador de express para definir rutas especificas
const db = require('./db') //Importa la conexion a la BD

//Creo una ruta POST para insertar un articulo
router.post('/articulos',(req,res)=>{
    const{
        id_articulo,
        nombre_articulo,
        precio_articulo,
        marca_articulo,
        categoria_articulo,
        descripcion_articulo
    }=req.body;

    //Consulta que va a insertar los datos en la tabla
    const sql = `
    INSERT INTO articulo (
        id_articulo,
        nombre_articulo,
        precio_articulo,
        marca_articulo,
        categoria_articulo,
        descripcion_articulo
    ) VALUES (?,?,?,?,?,?)
    `;

    //Ejecutamos la consulta
    db.query(sql,[
    id_articulo,
    nombre_articulo,
    precio_articulo,
    marca_articulo,
    categoria_articulo,
    descripcion_articulo
    ],(err,result) =>{
    if (err) {
        console.error('Error al insertar articulo:', err);
        res.status(500).json({mensaje:'Error al insertar articulo'});
    }else{
        res.status(201).json({mensaje:'Articulo insertado correctamente'});
    }
});

});


//Obtener articulos
router.get('/articulos',(req,res) => {
    const sql = 'SELECT id_articulo, nombre_articulo,precio_articulo FROM articulo';
    db.query(sql,(err,results)=>{
        if(err){
            console.error('Error al obtener articulos:',err);
            res.status(500).json({mensaje:'Error al obtenere articulos'})
        }else{
            res.json(results);
        }
    });

});

//Mostrar stock actual
router.get('/stock',(req,res)=>{
    const sql = `
        SELECT 
            id_articulo,
            nombre_articulo,
            precio_articulo,
            stock
        FROM articulo
        ORDER by nombre_articulo ASC
        `;
    
        db.query(sql,(err,results)=>{
            if(err){
                console.error('Error al obtener el stock',err);
                res.status(500).json({mensaje:'Error al obtener el stock'});
            }else{
                res.json(results);
            }
        });
});
//Exportamos esta ruta 
module.exports = router;

