document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const usuario = document.getElementById("usuario").value.trim();
        const contrasena = document.getElementById("contrasena").value.trim();

        const usuariosRegistrados = JSON.parse(sessionStorage.getItem("usuarios")) || [];
        const usuarioEncontrado = usuariosRegistrados.find(
            (u) => u.usuario === usuario && u.contrasena === contrasena
        );

        if (usuarioEncontrado) {
            sessionStorage.setItem("usuarioActivo", JSON.stringify(usuarioEncontrado));
            alert(`¡Bienvenido(a), ${usuarioEncontrado.nombre}!`);
            window.location.href = "./usuario.html";
        } else {
            mostrarErrorLogin("Usuario o contraseña incorrectos.");
        }
    });

    function mostrarErrorLogin(mensaje) {
        const mensajeError = document.getElementById("mensaje-error-login");
        mensajeError.textContent = mensaje;
        mensajeError.style.display = "block";
    }
});
