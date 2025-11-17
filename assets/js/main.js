// Abrir modais
document.getElementById("btnLogin").onclick = () => {
  document.getElementById("loginModal").style.display = "flex";
};

document.getElementById("btnRegister").onclick = () => {
  document.getElementById("registerModal").style.display = "flex";
};

// Fechar modal
function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

// Fechar clicando fora
window.onclick = function(event) {
  if (event.target.classList.contains("modal")) {
    event.target.style.display = "none";
  }
};
