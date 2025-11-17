// Carregar dados do usuário
const user = JSON.parse(localStorage.getItem('usuarioLogado'));
if (!user) {
  window.location.href = "../login.html";
}

// Preenche dados do perfil
document.getElementById('nomeUsuario').textContent = user.nome;
document.getElementById('emailUsuario').textContent = user.email;
document.getElementById('nomeAntigo').value = user.nome;
document.getElementById('emailAntigo').value = user.email;

// Botão de logout
document.getElementById('logout').addEventListener('click', () => {
  localStorage.removeItem('usuarioLogado');
  window.location.href = "../../index.html";
});

// Trocar entre seções
document.querySelectorAll('.menu-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.menu-btn').forEach(b => b.classList.remove('ativo'));
    document.querySelectorAll('.conteudo-section').forEach(s => s.classList.remove('ativo'));
    btn.classList.add('ativo');
    document.getElementById(btn.dataset.section).classList.add('ativo');
  });
});

// Trocar nome/email
document.getElementById('salvarDados').addEventListener('click', () => {
  const novoNome = document.getElementById('novoNome').value.trim();
  const novoEmail = document.getElementById('novoEmail').value.trim();

  if (novoNome) user.nome = novoNome;
  if (novoEmail) user.email = novoEmail;

  localStorage.setItem('usuarioLogado', JSON.stringify(user));
  alert("Dados atualizados com sucesso!");
  window.location.reload();
});

// Redefinir senha
document.getElementById('salvarSenha').addEventListener('click', () => {
  const atual = document.getElementById('senhaAtual').value;
  const nova = document.getElementById('novaSenha').value;

  if (atual !== user.senha) {
    alert("Senha atual incorreta!");
    return;
  }

  if (nova.length < 6) {
    alert("A nova senha deve ter pelo menos 6 caracteres!");
    return;
  }

  user.senha = nova;
  localStorage.setItem('usuarioLogado', JSON.stringify(user));
  alert("Senha alterada com sucesso!");
});

// Trocar foto
const uploadFoto = document.getElementById('uploadFoto');
const fotoPerfil = document.getElementById('fotoPerfil');

document.getElementById('btnTrocarFoto').addEventListener('click', () => uploadFoto.click());
uploadFoto.addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    fotoPerfil.src = e.target.result;
    user.foto = e.target.result;
    localStorage.setItem('usuarioLogado', JSON.stringify(user));
  };
  reader.readAsDataURL(file);
});
// ==== Evolução no jogo ====
const progresso = JSON.parse(localStorage.getItem('progressoMapa')) || { nivel: 1 };
const totalNiveis = 12;

const nivelBarra = document.getElementById('nivelBarra');
const descricaoNiveis = document.getElementById('descricaoNiveis');

// Cria a barra de níveis
for (let i = 1; i <= totalNiveis; i++) {
  const div = document.createElement('div');
  div.classList.add('nivel');
  div.dataset.nivel = i;
  div.textContent = `${i}°`;
  if (i > progresso.nivel) div.classList.add('bloqueado');
  nivelBarra.appendChild(div);
}

// Descrição dos níveis
for (let i = 1; i <= 4; i++) {
  const card = document.createElement('div');
  card.classList.add('nivel-card');

  if (i <= progresso.nivel) {
    card.innerHTML = `<img src="../assets/img/unlock.png" alt="Desbloqueado"><p>Nível ${i} desbloqueado!</p>`;
  } else {
    card.classList.add('bloqueado');
    card.innerHTML = `<img src="../assets/img/lock.png" alt="Bloqueado"><p>Nível bloqueado<br>Avance o anterior para desbloqueá-lo!</p>`;
  }

  descricaoNiveis.appendChild(card);
}

// Voltar ao mapa
document.getElementById('voltarMapa').addEventListener('click', () => {
  window.location.href = "../jogos/mapa.html";
});
