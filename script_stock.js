
const tablaStock = document.querySelector('#tablaStock tbody');

fetch('http://localhost:3000/stock')
    .then(res=>res.json())
    .then(data=>{
        data.forEach(articulo=>{
            const fila = document.createElement('tr');
            fila.innerHTML=`
                <td>${articulo.id_articulo}</td>
                <td>${articulo.nombre_articulo}</td>
                <td>${parseFloat(articulo.precio_articulo).toFixed(2)}</td>
                <td>${articulo.stock}</td>
            `;
            tablaStock.appendChild(fila);
        })
    })
    .catch(error=>{
        console.error('Error al obtener el stock',error);
        alert('Error al cargar los datos del stock');
    })