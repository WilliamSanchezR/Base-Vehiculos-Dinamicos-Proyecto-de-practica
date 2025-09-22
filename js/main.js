//  Constantes globales

    const form = document.getElementById("vehiculo-form");
    const contCars = document.querySelector("#cont-cards .row.g-3");
    const fotoInput = document.getElementById("fotoCar");
    const nombreInput = document.getElementById("nombreCar");
    const marcaInput = document.getElementById("marcaCar");
    const modeloInput = document.getElementById("modeloCar");
    const kilometrajeInput = document.getElementById("kilometrajeCar");
    const precioInput = document.getElementById("precioCar");

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

        // Botón de compra

            const btnSuccess = document.createElement("button");

                btnSuccess.classList.add("btn", "btn-success");
                btnSuccess.textContent = "Comprar";
                btnSuccess.setAttribute('id', 'btnCompra');

                btnSuccess.addEventListener('click', () => {
                    alert('Ya nos comunicaremos con usted');
                });

        // Botón eliminar

            const btnDanger = document.createElement("button");

                btnDanger.classList.add("btn", "btn-danger");
                btnDanger.textContent = "Eliminar";

            // Evento eliminar
            btnDanger.addEventListener("click", () => col.remove());

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

            if (!vehiculo.nombre || !vehiculo.marca || !vehiculo.modelo || 
                !vehiculo.kilometraje || !vehiculo.precio) {
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

