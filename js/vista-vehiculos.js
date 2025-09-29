const tablaBody = document.querySelector('#carritoCompras tbody');

document.addEventListener("DOMContentLoaded", () =>{
    const carritosGuardados = JSON.parse(localStorage.getItem("carritoCompra")) || [];

    carritosGuardados.forEach((vehiculo) => {

        const fila = document.createElement('tr');

            const tdFoto = document.createElement('td');
                const img = document.createElement('img');
                img.src = vehiculo.foto;
                img.alt = vehiculo.nombre;
                img.width = 180; // tamaño fijo
                tdFoto.appendChild(img);

            const tdNombre = document.createElement('td');
                tdNombre.textContent = vehiculo.nombre;

            const tdMarca = document.createElement('td');
                tdMarca.textContent = vehiculo.marca;

            const tdPrecio = document.createElement('td');
                tdPrecio.textContent = vehiculo.precio;

            const tdKilometraje = document.createElement('td');
                tdKilometraje.textContent = vehiculo.kilometraje;

        fila.appendChild(tdFoto);
        fila.appendChild(tdNombre);
        fila.appendChild(tdMarca);
        fila.appendChild(tdPrecio);
        fila.appendChild(tdKilometraje);

        tablaBody.appendChild(fila);
    });
});