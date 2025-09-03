//Importa el modulo mysql2 que permite conectarse a bases de datos MySQL
const mysql =require('mysql2'); //se guarda en la variable mysql

//crear la conexion a la db
const connection = mysql.createConnection({
    host:'localhost', //servidor donde esta la base de datos
    user:'root', // Nombre de usuario MySQL, "root" por defecto
    password:'', //No aplica en este caso
    database:'gestion_inventario', //Nombre de la base de datos
    port: 3307 //Puerto que usa el servidor MySQL
});

//conectar
//Intenta conectarse usando el metodo connect
connection.connect((err)=>{ //Usa el parametro err
    if(err){
        console.error('Error al conectar la db:',err); //Si hay error muestra este mensaje
    }else{
        console.log('Conexion exitosa a la db de MySQL') //Si no hay error muestra este mensaje
    }
});

//Exporta la conexion para poder reutilizarla
module.exports=connection; 