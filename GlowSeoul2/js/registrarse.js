document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("registro-form");

    // Recuperar datos del formulario desde localStorage al cargar la página
    const campos = ["nombre", "correo", "telefono", "usuario", "contrasena", "confirmar-contrasena", "fecha-nacimiento"];
    campos.forEach((campo) => {
        const elemento = document.getElementById(campo);
        if (localStorage.getItem(campo)) {
            elemento.value = localStorage.getItem(campo); // Rellenar con los datos guardados
        }
    });

    // Guardar los datos del formulario en tiempo real
    form.addEventListener("input", (e) => {
        const campo = e.target;
        localStorage.setItem(campo.id, campo.value); // Guardar en localStorage
        const error = document.getElementById(`error-${campo.id}`);

        // Validaciones dinámicas
        if (campo.value.trim() === "") {
            error.textContent = "Este campo es obligatorio.";
        } else if (campo.id === "correo" && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(campo.value)) {
            error.textContent = "Debe ser un correo válido.";
        } else if (campo.id === "telefono" && !/^\d{7,10}$/.test(campo.value)) {
            error.textContent = "Debe contener entre 7 y 10 dígitos.";
        } else if (campo.id === "confirmar-contrasena" && campo.value !== document.getElementById("contrasena").value) {
            error.textContent = "Las contraseñas no coinciden.";
        } else if (campo.id === "fecha-nacimiento" && !validarEdad(campo.value)) {
            error.textContent = "Debes ser mayor de 18 años.";
        } else {
            error.textContent = "";
        }
    });

    // Validar edad mayor de 18 años
    function validarEdad(fechaNacimiento) {
        const hoy = new Date();
        const fechaNac = new Date(fechaNacimiento);
        const edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mes = hoy.getMonth() - fechaNac.getMonth();
        if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
            return edad - 1 >= 18;
        }
        return edad >= 18;
    }

    // Guardar usuario en sessionStorage al enviar el formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const fechaNacimiento = document.getElementById("fecha-nacimiento").value;
        if (!validarEdad(fechaNacimiento)) {
            alert("Debes ser mayor de 18 años para registrarte.");
            return;
        }

        const usuariosRegistrados = JSON.parse(sessionStorage.getItem("usuarios")) || [];
        const usuarioIngresado = document.getElementById("usuario").value.trim();

        // Validar que el nombre de usuario no se repita
        const usuarioExistente = usuariosRegistrados.find((u) => u.usuario === usuarioIngresado);
        if (usuarioExistente) {
            alert("El nombre de usuario ya está registrado. Por favor, elige otro.");
            return;
        }

        // Si el usuario es único, guardar los datos
        const usuario = {
            nombre: document.getElementById("nombre").value.trim(),
            correo: document.getElementById("correo").value.trim(),
            telefono: document.getElementById("telefono").value.trim(),
            usuario: usuarioIngresado,
            contrasena: document.getElementById("contrasena").value.trim(),
        };

        usuariosRegistrados.push(usuario);
        sessionStorage.setItem("usuarios", JSON.stringify(usuariosRegistrados));

        // Limpiar localStorage al enviar el formulario
        campos.forEach((campo) => localStorage.removeItem(campo));

        alert("Registro exitoso. Ahora puedes iniciar sesión.");
        window.location.href = "./login.html";
    });
});
