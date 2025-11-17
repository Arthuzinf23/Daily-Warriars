// === Controle inteligente da música de fundo ===

// Impede que o navegador bloqueie o autoplay
document.addEventListener("DOMContentLoaded", () => {
  const music = document.getElementById("bgMusic");

  // Se o usuário já deu play antes, respeita isso
  const savedVolume = localStorage.getItem("musicVolume");
  if (savedVolume !== null) {
    music.volume = parseFloat(savedVolume);
  } else {
    music.volume = 0.4; // volume padrão (0.0 a 1.0)
  }

  // Tenta tocar automaticamente
  const playPromise = music.play();
  if (playPromise !== undefined) {
    playPromise.catch(() => {
      console.log("🔇 Autoplay bloqueado. Mostrando botão manual...");
      showMusicButton();
    });
  }

  // Cria botão para controlar som
  function showMusicButton() {
    const btn = document.createElement("button");
    btn.textContent = "🎵 Tocar música";
    btn.className = "music-btn";
    document.body.appendChild(btn);

    btn.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        btn.textContent = "🔇 Pausar música";
      } else {
        music.pause();
        btn.textContent = "🎵 Tocar música";
      }
    });
  }
});
