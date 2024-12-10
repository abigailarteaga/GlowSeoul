document.addEventListener("DOMContentLoaded", () => {
    const modoOscuroToggle = document.getElementById("modo-oscuro-toggle");
    const tamañoLetraSelect = document.getElementById("tamaño-letra");

    // Aplicar preferencias al cargar la página
    const aplicarPreferencias = () => {
        const modoOscuro = localStorage.getItem("modoOscuro") === "true";
        const tamañoLetra = localStorage.getItem("tamañoLetra") || "normal";

        // Aplicar modo oscuro
        if (modoOscuro) {
            document.body.classList.add("modo-oscuro");
            document.querySelector("header")?.classList.add("modo-oscuro");
            document.querySelector("footer")?.classList.add("modo-oscuro");
        } else {
            document.body.classList.remove("modo-oscuro");
            document.querySelector("header")?.classList.remove("modo-oscuro");
            document.querySelector("footer")?.classList.remove("modo-oscuro");
        }

        // Aplicar tamaño de letra
        document.body.classList.remove("tamaño-letra-normal", "tamaño-letra-grande", "tamaño-letra-extra-grande");
        document.body.classList.add(`tamaño-letra-${tamañoLetra}`);
    };

    // Llamar a aplicar preferencias al cargar la página
    aplicarPreferencias();

    // Escuchar cambios en modo oscuro
    modoOscuroToggle?.addEventListener("click", () => {
        const isModoOscuro = document.body.classList.toggle("modo-oscuro");
        document.querySelector("header")?.classList.toggle("modo-oscuro");
        document.querySelector("footer")?.classList.toggle("modo-oscuro");
        localStorage.setItem("modoOscuro", isModoOscuro);
    });

    // Escuchar cambios en tamaño de letra
    tamañoLetraSelect?.addEventListener("change", (e) => {
        const tamaño = e.target.value;
        localStorage.setItem("tamañoLetra", tamaño);

        // Actualizar tamaño de letra dinámicamente
        document.body.classList.remove("tamaño-letra-normal", "tamaño-letra-grande", "tamaño-letra-extra-grande");
        document.body.classList.add(`tamaño-letra-${tamaño}`);
    });
});
