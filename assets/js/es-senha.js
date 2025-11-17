// senha
const form = document.getElementById("formEsenha");
const msgSucesso = document.getElementById("msgSucesso");

form.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (!nivelSelecionado) return alert("Selecione seu nível de classe!");
  if (senha.length < 8 || !/[A-Z]/.test(senha) || !/[0-9]/.test(senha))
    return alert("A senha deve ter pelo menos 8 caracteres, incluindo 1 número e 1 maiúscula!");
  if (senha !== confirmarSenha) return alert("As senhas não coincidem!");

  const novoUsuario = { nome, senha};
  localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));

  msgSucesso.classList.remove("hidden");

  setTimeout(() => {
    window.location.href = "login.html"; // redireciona após 2,5s
  }, 1500);
});