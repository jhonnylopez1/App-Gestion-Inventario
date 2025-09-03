
const proveedorSelect = document.getElementById('proveedorSelect');
const articuloSelect = document.getElementById('articuloSelect');
const form = document.getElementById('inventarioForm');
const respuesta = document.getElementById('respuesta');

//Funcion para llenar los valores en el Select de proveedores
fetch('http://localhost:3000/proveedores')
    .then(res => res.json())
    .then (data =>{
        data.forEach(proveedor => {
            const option = document.createElement('option');
            option.value = proveedor.id_proveedor;
            option.textContent = proveedor.nombre_proveedor;
            proveedorSelect.appendChild(option)
        });
    });

//Funcion para llenar los valores en el Select de articulos
fetch('http://localhost:3000/articulos')
    .then(res=>res.json())
    .then (data=>{
        data.forEach(articulo=>{
            const option = document.createElement('option');
            option.value = articulo.id_articulo;
            option.textContent = articulo.nombre_articulo;
            articuloSelect.appendChild(option)
        });
    });

//Enviar formulario
form.addEventListener('submit', function(e){
    e.preventDefault();

    const datos = new FormData(form);
    const objeto = {};

    datos.forEach((valor,clave) => {
        objeto[clave] = valor;
    });

    fetch('http://localhost:3000/inventario',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(objeto)
    })
        .then(res=>res.json())
        .then(data => {
            respuesta.textContent = data.mensaje;
            form.reset();
        })
        .catch(error=>{
            console.error('Error:',error);
            respuesta.textContent = 'Error al registrar inventario;'
        });
    

    });

//Mostrar los registros en la tabla
function cargarInventario(){
    fetch('http://localhost:3000/inventario')
        .then(res => res.json())
        .then(data=>{
            const tbody = document.querySelector('#tablaInventario tbody');
            tbody.innerHTML = '';

            data.forEach(item=>{
                const fila = document.createElement('tr');
                fila.innerHTML= `
                    <td>${item.nombre_proveedor}</td>
                    <td>${item.nombre_articulo}</td>
                    <td>${item.fecha}</td>
                    <td>${item.cantidad_suministrada}</td>
                    <td>${item.estado}</td>
                    `;
                tbody.appendChild(fila);
            });
        });
}
cargarInventario();



