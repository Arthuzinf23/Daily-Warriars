// Seleciona o nível de classe
let nivelSelecionado = "";
document.querySelectorAll(".nivel").forEach(nivel => {
  nivel.addEventListener("click", () => {
    document.querySelectorAll(".nivel").forEach(n => n.classList.remove("ativo"));
    nivel.classList.add("ativo");
    nivelSelecionado = nivel.dataset.nivel;
  });
});

// Troca de foto
const fotoInput = document.getElementById("fotoInput");
const fotoPreview = document.getElementById("fotoPreview");
document.querySelector("label[for='fotoInput']").addEventListener("click", () => fotoInput.click());
fotoInput.addEventListener("change", e => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = ev => (fotoPreview.src = ev.target.result);
    reader.readAsDataURL(file);
  }
});

// Cadastro
const form = document.getElementById("formCadastro");
const msgSucesso = document.getElementById("msgSucesso");

form.addEventListener("submit", e => {
  e.preventDefault();
  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  if (!nivelSelecionado) return alert("Selecione seu nível de classe!");
  if (senha.length < 8 || !/[A-Z]/.test(senha) || !/[0-9]/.test(senha))
    return alert("A senha deve ter pelo menos 8 caracteres, incluindo 1 número e 1 maiúscula!");
  if (senha !== confirmarSenha) return alert("As senhas não coincidem!");

  const novoUsuario = { nome, email, senha, nivel: nivelSelecionado, foto: fotoPreview.src };
  localStorage.setItem("usuarioLogado", JSON.stringify(novoUsuario));

  msgSucesso.classList.remove("hidden");

  setTimeout(() => {
    window.location.href = "login.html"; // redireciona após 2,5s
  }, 1500);
});
