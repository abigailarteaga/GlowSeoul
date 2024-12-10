document.addEventListener("DOMContentLoaded", () => {
    const cerrarSesionBtn = document.getElementById("cerrar-sesion");

    cerrarSesionBtn.addEventListener("click", () => {
        // Eliminar el usuario activo de sessionStorage
        sessionStorage.removeItem("usuarioActivo");

        // Vaciar el carrito eliminándolo de localStorage
        localStorage.removeItem("carrito");

        // Mostrar un mensaje de confirmación
        alert("Has cerrado sesión. Tu carrito ha sido limpiado.");

        // Redirigir al usuario a la página de inicio de sesión
        window.location.href = "./login.html";
    });

    // Verificar si hay un usuario activo
    const usuarioActivo = JSON.parse(sessionStorage.getItem("usuarioActivo"));

    if (usuarioActivo) {
        // Mostrar información del usuario activo
        document.getElementById("info-usuario").innerHTML = `
            <p><strong>👤  Nombre:</strong> ${usuarioActivo.nombre}</p>
            <p><strong>📧  Correo:</strong> ${usuarioActivo.correo}</p>
            <p><strong>📱  Teléfono:</strong> ${usuarioActivo.telefono}</p>
            <p><strong>👥  Usuario:</strong> ${usuarioActivo.usuario}</p>
        `;
    } else {
        // Redirigir si no hay usuario activo
        alert("No has iniciado sesión. Redirigiendo al inicio...");
        window.location.href = "./login.html";
    }
});
