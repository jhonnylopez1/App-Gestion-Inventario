//Uso la conexion creada en db.js
const db = require('./db');

//realizo la prueba
db.query('SELECT 1 + 1 AS resultado',(err,results)=>{
    if(err){
        console.error('Error en la consulta:',err);
    }else{
        console.log('Resultado de la consulta:',results)
    }

    db.end();
})
