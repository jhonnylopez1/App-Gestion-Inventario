
//Se crea el servidor
const express = require('express'); //Importa express
const cors = require('cors'); //Importa cors(evita bloqueos del navegador al realizar peticiones del font a back )
const app = express(); //Crea instancia de Express

//importacion de rutas
const articulosRuta = require('./articulos');
const proveedorRuta = require('./proveedores');
const facturaRuta = require('./factura');
const inventarioRuta = require('./inventario');
const clienteRuta = require('./cliente');
const cajeroRuta = require('./cajero');

//puerto
const PORT = 3000;

app.use(cors()); //Uso de cors por parte de express

app.use(express.json());//Permite al servidor leer datos JSON

//carga de las rutas principales de cada uno de los modulos del proyecto
app.use('/', articulosRuta);
app.use('/', proveedorRuta);
app.use('/',facturaRuta);
app.use('/', inventarioRuta);
app.use('/', clienteRuta);
app.use('/',cajeroRuta)

//Ruta de prueba para verificar funcionamiento
app.get('/',(req,res)=>{
    res.send('Servidor funcionando correctamente')
});

//Se inicia el servidor para que escuche por el puerto 3000
app.listen(PORT,()=>{
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
});


