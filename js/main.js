//  Constantes globales

    const form = document.getElementById("vehiculo-form");
    const contCars = document.querySelector("#cont-cards .row.g-3");
    const fotoInput = document.getElementById("fotoCar");
    const nombreInput = document.getElementById("nombreCar");
    const marcaInput = document.getElementById("marcaCar");
    const modeloInput = document.getElementById("modeloCar");
    const kilometrajeInput = document.getElementById("kilometrajeCar");
    const precioInput = document.getElementById("precioCar");
    const carritoBtn = document.getElementById("carrito");
    const remov = document.getElementById("carritos")
    const panel = document.querySelector(".panel");
    const contCarrito = document.querySelector('.cont-carrito');


    // Imagen por defecto (puedes cambiar la ruta a la que tengas en tu proyecto)

        const defaultImg = 'img/21987.jpg';


//  Función para crear tarjeta 

    function crearCard(vehiculo) {

        // Creamos el contenedor padre 

            const col = document.createElement("div");

                col.classList.add("col-md-6", "item-vehiculo");

        // Ahora creamos los elementos hijos contenedor de la tarjeta

            const card = document.createElement("div");

                card.classList.add("card", "h-100");

        // Nodo hijo de la imagen

            const imagen = document.createElement("img");

                imagen.classList.add("card-img-top", "w-100");
                imagen.src = vehiculo.foto;
                imagen.alt = vehiculo.nombre;

        // contenedor del cuerpo de la tarjeta 

            const cardBody = document.createElement("div");

                cardBody.classList.add("card-body");

        // Usamos innerHTML para agregar directamente el contenido

                cardBody.innerHTML = `
                    <h3 class="card-title">${vehiculo.nombre}</h3>
                    <h4 class="card-subtitle text-muted">${vehiculo.marca}</h4>
                    <p>Modelo: ${vehiculo.modelo}</p>
                    <p>Kilometraje: ${vehiculo.kilometraje} km</p>
                    <h2 class="text-success">$${vehiculo.precio}</h2>
                `;

        // Contenedor de los botones

            const contBtns = document.createElement("div");

                contBtns.classList.add("d-flex", "justify-content-between", "mt-3");

        // Botón de compra, este boton de compra cada vez que se oprime ejecutara una funcion que agregara este producto clickeado al panel lateral y se sumara el valor que el tenga mas lo demas que el usuario tenga en el carrito

            const btnSuccess = document.createElement("button");

                btnSuccess.classList.add("btn", "btn-success");
                btnSuccess.textContent = "Comprar";
                btnSuccess.setAttribute('id', 'btnCompra');

                    btnSuccess.addEventListener("click", () => {
                        const newCardCarrito = createCardCarrito(vehiculo);
                        contCarrito.appendChild(newCardCarrito);
                        updateTotal();
                    });

        // Botón eliminar

            const btnDanger = document.createElement("button");

                btnDanger.classList.add("btn", "btn-danger");
                btnDanger.textContent = "Eliminar";

            // Evento eliminar
            btnDanger.addEventListener("click", () => {
                col.remove();
    });

        // Ensamblamos dentro del nodo padre sus nodos hijo

            contBtns.appendChild(btnSuccess);
            contBtns.appendChild(btnDanger);
            cardBody.appendChild(contBtns);

            card.appendChild(imagen);
            card.appendChild(cardBody);
            col.appendChild(card);

// Retornamos el contenedor completo

            return col;

    }


//  Evento submit del formulario

form.addEventListener("submit", (e) => {
        e.preventDefault();

// Tomamos valores de los inputs

            const vehiculo = {
                foto: fotoInput.value.trim(),
                nombre: nombreInput.value.trim(),
                marca: marcaInput.value.trim(),
                modelo: modeloInput.value.trim(),
                kilometraje: kilometrajeInput.value.trim(),
                precio: precioInput.value.trim(),
            };

// Validación: si falta algún campo obligatorio

            if (!vehiculo.nombre || !vehiculo.marca || !vehiculo.modelo || !vehiculo.kilometraje || !vehiculo.precio) {
                alert("Todos los campos son obligatorios pato");
                return;
            }

// Si no hay foto, usar la predeterminada

            if (!vehiculo.foto) {
                vehiculo.foto = defaultImg;
            }

// Crear y agregar tarjeta

            const newCard = crearCard(vehiculo);

                contCars.appendChild(newCard);

        // Limpiar formulario

            form.reset();
    });

// Botón de modo noche
    const changeStyleBtn = document.getElementById("change-style");

    changeStyleBtn.addEventListener("click", () => {

        document.body.classList.toggle("dark-mode");

        // Cambiar el texto del botón según el modo

        if (document.body.classList.contains("dark-mode")) {

            changeStyleBtn.innerHTML = '<i class="bi bi-sun-fill"></i>';

        } else {

            changeStyleBtn.innerHTML = '<i class="bi bi-moon-stars-fill"></i>';

        }

    });

//desde aca se empieza lo que es el panel para la tienda

// Botones para abrir/cerrar el panel

// Abrir panel

    carritoBtn.addEventListener("click", () => {

        panel.classList.add("active");

    });

// Cerrar panel

    remov.addEventListener("click", () => {

        panel.classList.remove("active");

    });

// Funcion que creara la tarjeta del producto en el panel

function createCardCarrito(vehiculo) {

// Contenedor principal de la tarjeta dentro del carrito

    const cont = document.createElement("div");

    cont.classList.add("row", "card-carrito", "mb-2", "p-2", "border");
    
// Columna de la imagen

    const colImg = document.createElement("div");

    colImg.classList.add("col-md-4");

    const img = document.createElement("img");

    img.classList.add("carrito-img", "w-100");

    img.src = vehiculo.foto || "img/aventador.jpg"; // si no hay foto, usa la default

    img.alt = vehiculo.nombre || "Vehículo";

// Columna con la información

    const colInfo = document.createElement("div");

    colInfo.classList.add("col-md-6");

    colInfo.innerHTML = `
        <h3 class="card-title">${vehiculo.nombre}</h3>
        <h4 class="card-subtitle text-muted">${vehiculo.marca}</h4>
        <h2 class="text-success">$${vehiculo.precio}</h2>
    `;

// Botón eliminar

    const btnEliminar = document.createElement("button");

    btnEliminar.classList.add("btn", "btn-danger", "col-md-2");

    btnEliminar.textContent = "X";

// Cuando se da clic en eliminar, se borra solo este producto y resta su valor en la suma de los totales gracias que llamamos la funcion updateTotal()

    btnEliminar.addEventListener("click", () => {
        cont.remove();
        updateTotal();
        });


// Ensamblamos todo

    colImg.appendChild(img);
    cont.appendChild(colImg);
    cont.appendChild(colInfo);
    cont.appendChild(btnEliminar);

    return cont; // devolvemos la tarjeta completa
}

// Como queremos ver el total de lo que va a comprar el usuario realizamos la siguiente funcion la cual capturara los valores que se emcuentren en las etiquetas h2 con la clase text-success, luego separamos cada valor con un forEach luego con cada valor capturado lo convertimos en un numero decimal donde tambien reemplazamos los signos de pesos por un valor vacio y hacemos lo mismo con las "," a nivel global si es un valor numerico se sumara de no ser asi se rompe la condicion. para mostrar el valor capturamos un div en el index y modificamos el contenido y concatenamos lo que queremos mostrar que es el "Total : $ + el valor total de la suma"

function updateTotal() {  
    let total = 0;

    const precios = contCarrito.querySelectorAll("h2.text-success");

    precios.forEach(precio => {
        const valor = parseFloat(precio.textContent.replace("$", "").replace(/,/g, ""));
        if (!isNaN(valor)) {
            total += valor;
        }
    });

    // Mostrar el total
    const totalDiv = document.getElementById("total_suma");
    totalDiv.textContent = "Total = $" + total.toLocaleString("es-CL");
}



