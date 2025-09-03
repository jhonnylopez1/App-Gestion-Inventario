const form = document.getElementById('facturaForm');
const clienteSelect = document.getElementById('clienteSelect');
const cajeroSelect = document.getElementById('cajeroSelect');
const articuloSelect = document.getElementById('articuloSelect');
const listaArticulos = document.getElementById('listaArticulos');
const impuestosInput = document.getElementById('impuestos');
const metodoPago = document.getElementById('metodo_pago');
const totalInput = document.getElementById('total');
const respuesta = document.getElementById('respuesta');

let articulosSelecccionados = [];
let total = 0;

//Cargar clientes
fetch('http://localhost:3000/cliente')
    .then(res=>res.json())
    .then(data=>{
        data.forEach(cliente => {
            const option = document.createElement('option');
            option.value =cliente.id_cliente;
            option.textContent = cliente.nombre_cliente;
            clienteSelect.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error al cargar clientes:', error);
      });

//Cargar cajeros
fetch('http://localhost:3000/cajero')
    .then(res=>res.json())
    .then(data=>{
        data.forEach(cajero => {
             const option = document.createElement('option');
             option.value =cajero.id_cajero;
             option.textContent = cajero.nombre_cajero;
             cajeroSelect.appendChild(option);
        });
    });

//cargar articulos

let articulos =[];
fetch('http://localhost:3000/articulos')
    .then(res=>res.json())
    .then(data=>{
        articulos=data;
        data.forEach(articulo=>{
            const option = document.createElement('option');
            option.value =articulo.id_articulo;
            option.textContent =`${articulo.nombre_articulo} : $${articulo.precio_articulo}`
            articuloSelect.appendChild(option);
        });
    });

//Agregar articulo a la lista
document.getElementById('agregarArticulo').addEventListener('click',()=>{
    const idArticulo = articuloSelect.value;
    const cantidad = parseInt(document.getElementById('cantidadArticulo').value);

    if(!idArticulo || isNaN(cantidad) || cantidad<=0) return;

    const articulo = articulos.find(a=>a.id_articulo == idArticulo);
    if(!articulo) return;

    articulosSelecccionados.push({
        id_articulo:idArticulo,
        nombre_articulo:articulo.nombre_articulo,
        precio:parseFloat(articulo.precio_articulo),
        cantidad:cantidad
    });

    total += articulo.precio_articulo*cantidad

    const item = document.createElement('li');
    item.textContent=`${articulo.nombre_articulo} x${cantidad} : $${(articulo.precio_articulo * cantidad).toFixed(2)}`
    listaArticulos.appendChild(item);

    const iva = total *0.19;
    impuestosInput.value =iva.toFixed(2);
    totalInput.value = total.toFixed(2);
})

//Enviar formulario
form.addEventListener('submit',e=>{
    e.preventDefault();

    const datos = new FormData(form);
    const objeto ={};

    datos.forEach((valor,clave)=>{
        objeto[clave]=valor;
    });
    
    objeto.impuestos=parseFloat(impuestosInput.value);
    objeto.total=parseFloat(totalInput.value);
    objeto.articulos = articulosSelecccionados;

    fetch('http://localhost:3000/factura',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(objeto)
    })
    .then(res=>res.json())
    .then(data=>{
        respuesta.textContent= data.mensaje;
        form.reset();
        listaArticulos.innerHTML=''
        impuestosInput.value='';
        totalInput.value='';
        articulosSelecccionados=[];
        total=0;
        metodoPago.value=""
    })
    .catch(error=>{
        console.error('Error',error);
        respuesta.textContent= 'Error al registrar la venta'
    })
})