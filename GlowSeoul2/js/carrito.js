document.addEventListener("DOMContentLoaded", () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || []; // Recupera el carrito o inicia vacío
    const carritoContenedor = document.getElementById("carrito-contenedor"); // Contenedor principal del carrito
    const carritoItems = document.querySelector(".carrito-items"); // Contenedor de los items del carrito
    const carritoTotal = document.querySelector("#carrito-total"); // Contenedor del total
    const abrirCarritoBtn = document.getElementById("abrir-carrito");
    const cerrarCarritoBtn = document.getElementById("cerrar-carrito");
    const hacerPedidoBtn = document.getElementById("hacer-pedido"); // Selecciona el botón Hacer Pedido

    // Verifica si el botón existe antes de agregar el evento
    if (hacerPedidoBtn) {
        hacerPedidoBtn.addEventListener("click", (e) => {
            e.preventDefault();

            // Verificar si el usuario ha iniciado sesión
            const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));

            if (!usuarioActivo) {
                // Redirigir al inicio de sesión si no hay usuario activo
                alert("Debes iniciar sesión para realizar un pedido.");
                window.location.href = "./login.html"; // Redirige al login
            } else {
                // Mostrar alerta de pedido realizado
                if (JSON.parse(localStorage.getItem("carrito"))?.length === 0) {
                    alert("No tienes productos en el carrito.");
                } else {
                    alert(`Pedido realizado con éxito. Gracias por tu compra, ${usuarioActivo.nombre}!`);
                    // Vaciar el carrito
                    localStorage.removeItem("carrito");
                    location.reload(); // Recargar para reflejar el carrito vacío
                }
            }
        });
    }
    // Mostrar el carrito
    abrirCarritoBtn.addEventListener("click", (e) => {
        e.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
        carritoContenedor.classList.add("abierto"); // Abrir el contenedor principal del carrito
    });

    // Cerrar el carrito
    cerrarCarritoBtn.addEventListener("click", () => {
        carritoContenedor.classList.remove("abierto"); // Cerrar el contenedor principal del carrito
    });
    
    // Mostrar alerta personalizada
function mostrarAlerta(mensaje) {
    const alertaModal = document.getElementById("alerta-modal");
    const alertaMensaje = document.getElementById("alerta-mensaje");
    const cerrarAlerta = document.getElementById("cerrar-alerta");

    alertaMensaje.textContent = mensaje; // Establecer el mensaje
    alertaModal.style.display = "flex"; // Mostrar el modal

    // Cerrar la alerta al hacer clic en el botón
    cerrarAlerta.addEventListener("click", () => {
        alertaModal.style.display = "none";
    });

    // Ocultar automáticamente después de 3 segundos
    setTimeout(() => {
        alertaModal.style.display = "none";
    }, 3000);
}

// Modifica la función agregarAlCarrito para incluir la alerta
function agregarAlCarrito(producto) {
    const productoExistente = carrito.find(item => item.nombre === producto.nombre);

    if (productoExistente) {
        productoExistente.cantidad += producto.cantidad; // Incrementa la cantidad si ya existe
    } else {
        carrito.push(producto); // Agrega el producto si no existe
    }

    actualizarCarrito();
    guardarCarrito();

    // Mostrar la alerta de producto añadido
    mostrarAlerta(`Has añadido ${producto.cantidad} unidad(es) de "${producto.nombre}" al carrito.`);
}


    // Función para actualizar el carrito visualmente
    function actualizarCarrito() {
        carritoItems.innerHTML = ""; // Limpiar los items existentes

        let total = 0;

        carrito.forEach((producto, index) => {
            // Validación de datos del producto
            if (!producto.precio || !producto.nombre || !producto.cantidad || !producto.imagen) {
                console.error("Producto inválido en el carrito:", producto);
                return; // Ignorar productos inválidos
            }

            const item = document.createElement("div");
            item.classList.add("item-carrito");
            item.innerHTML = `
                <img src="${producto.imagen}" alt="${producto.nombre}" class="imagen-carrito">
                <div class="info-carrito">
                    <h4>${producto.nombre}</h4>
                    <p>Precio: $${producto.precio.toFixed(2)}</p>
                    <label for="cantidad-${index}">Cantidad:</label>
                    <input type="number" id="cantidad-${index}" class="cantidad-carrito" value="${producto.cantidad}" min="1">
                    <p>Total: $${(producto.precio * producto.cantidad).toFixed(2)}</p>
                    <button class="eliminar-carrito" data-index="${index}">Eliminar</button>
                </div>
            `;
            carritoItems.appendChild(item);
            total += producto.precio * producto.cantidad;
        });

        // Calcular Subtotal e IVA
        const subtotal = total / 1.12; // El total ya incluye IVA
        const iva = total - subtotal;

        carritoTotal.innerHTML = `
            <p>Subtotal: $${subtotal.toFixed(2)}</p>
            <p>IVA (12%): $${iva.toFixed(2)}</p>
            <p>Total: $${total.toFixed(2)}</p>
        `;

        // Funcionalidad para actualizar la cantidad
        document.querySelectorAll(".cantidad-carrito").forEach((input, index) => {
            input.addEventListener("change", (e) => {
                const nuevaCantidad = parseInt(e.target.value);
                if (nuevaCantidad > 0) {
                    carrito[index].cantidad = nuevaCantidad; // Actualizar cantidad
                    actualizarCarrito();
                    guardarCarrito();
                }
            });
        });

        // Funcionalidad para eliminar productos
        document.querySelectorAll(".eliminar-carrito").forEach(boton => {
            boton.addEventListener("click", (e) => {
                const index = parseInt(e.target.dataset.index);
                carrito.splice(index, 1); // Eliminar producto del carrito
                actualizarCarrito();
                guardarCarrito();
            });
        });
    }

    // Función para guardar el carrito en localStorage
    function guardarCarrito() {
        localStorage.setItem("carrito", JSON.stringify(carrito));
    }

    // Capturar eventos de "Añadir al carrito"
    document.querySelectorAll(".añadir_carrito").forEach(boton => {
        boton.addEventListener("click", () => {
            const producto = {
                nombre: boton.parentElement.querySelector("h3").innerText,
                precio: parseFloat(
                    boton.parentElement.querySelector(".precio").innerText.replace("$", "")
                ),
                imagen: boton.parentElement.querySelector("img").src,
                cantidad: parseInt(
                    boton.parentElement.querySelector(".cantidad_producto").value || "1"
                ),
            };

            // Validar datos del producto antes de agregar
            if (!producto.nombre || isNaN(producto.precio) || !producto.imagen || isNaN(producto.cantidad)) {
                alert("Datos del producto inválidos. Por favor, revisa los datos.");
                return;
            }

            agregarAlCarrito(producto);
        });
    });

    // Inicializa el carrito al cargar la página
    actualizarCarrito();
});
