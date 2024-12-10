document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("medio");
    const playButton = document.getElementById("reproducir");
    const muteButton = document.getElementById("silenciar");
    const volumeSlider = document.getElementById("volumen");
    const progressBar = document.getElementById("barra");
    const progress = document.getElementById("progreso");

    // Reproducir y Pausar
    playButton.addEventListener("click", () => {
        if (video.paused || video.ended) {
            video.play();
            playButton.value = "Pausar";
        } else {
            video.pause();
            playButton.value = "Reproducir";
        }
    });

    // Silenciar y Activar sonido
    muteButton.addEventListener("click", () => {
        video.muted = !video.muted;
        muteButton.value = video.muted ? "Activar Sonido" : "Silenciar";
    });

    // Ajustar Volumen
    volumeSlider.addEventListener("input", (e) => {
        video.volume = e.target.value;
    });

    // Actualizar Barra de Progreso
    video.addEventListener("timeupdate", () => {
        const porcentaje = (video.currentTime / video.duration) * 100;
        progress.style.width = `${porcentaje}%`;
    });

    // Hacer clic en la barra de progreso
    progressBar.addEventListener("click", (e) => {
        const rect = progressBar.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const nuevoTiempo = (offsetX / progressBar.offsetWidth) * video.duration;
        video.currentTime = nuevoTiempo;
    });
});
