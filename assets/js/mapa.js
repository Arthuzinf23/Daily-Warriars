function entrarNaArea(area) {
  alert(`Você entrou em ${area}!`);
  // Aqui você pode redirecionar para o jogo ou NPC, exemplo:
  // window.location.href = `quiz.html?area=${area}`;
}

function mostrarTutorial() {
  document.getElementById('tutorial').classList.remove('hidden');
}


function fecharTutorial() {
  document.getElementById('tutorial').classList.add('hidden');
}
