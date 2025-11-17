// ==========================
// Funções globais de login
// ==========================

// Salvar novo usuário (cadastro)
function cadastrarUsuario(nome, email, senha) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  // Verifica se e-mail já existe
  if (usuarios.some(u => u.email === email)) {
    alert("E-mail já cadastrado!");
    return false;
  }

  usuarios.push({ nome, email, senha });
  localStorage.setItem('usuarios', JSON.stringify(usuarios));
  alert("Cadastro realizado com sucesso!");
  window.location.href = "../assets/login.html"; // vai para login
}

// Fazer login
function fazerLogin(email, senha) {
  const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
  const usuario = usuarios.find(u => u.email === email && u.senha === senha);

  if (!usuario) {
    alert("E-mail ou senha incorretos!");
    return;
  }

  localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
  window.location.href = "../assets/cadastro.html"; // volta para home
}

// Verifica se há usuário logado
function getUsuarioLogado() {
  return JSON.parse(localStorage.getItem('usuarioLogado'));
}

// Logout
function logout() {
  localStorage.removeItem('usuarioLogado');
  window.location.href = "index.html";
}
