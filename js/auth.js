// LOGIN
window.login = async () => {
  let email = emailEl().value;
  let senha = senhaEl().value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(traduzErro(error.code));
  }
};

// REGISTRO
window.register = async () => {
  let email = emailEl().value;
  let senha = senhaEl().value;

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Conta criada com sucesso!");
  } catch (error) {
    alert(traduzErro(error.code));
  }
};

// GOOGLE
window.googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert("Erro no login com Google");
  }
};

function traduzErro(code) {
  switch (code) {
    case "auth/email-already-in-use":
      return "Esse email já está em uso.";
    case "auth/invalid-email":
      return "Email inválido.";
    case "auth/weak-password":
      return "A senha precisa ter pelo menos 6 caracteres.";
    case "auth/user-not-found":
      return "Usuário não encontrado.";
    case "auth/wrong-password":
      return "Senha incorreta.";
    default:
      return "Erro: " + code;
  }
}