import { app } from "./firebase.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

const emailEl = () => document.getElementById("email");
const senhaEl = () => document.getElementById("senha");

// REGISTER REAL
window.register = async () => {
  let email = emailEl().value;
  let senha = senhaEl().value;

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Conta criada!");
  } catch (e) {
    if (e.code === "auth/email-already-in-use") {
      alert("Esse e-mail já está cadastrado.");
    } else if (e.code === "auth/weak-password") {
      alert("Senha precisa ter pelo menos 6 caracteres.");
    } else {
      alert("Erro: " + e.message);
    }
  }
};
  let email = emailEl().value;
  let senha = senhaEl().value;

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Conta criada!");
  } catch (e) {
    alert(e.message);
  }
};

// TESTE LOGIN (temporário)
window.login = () => alert("login funcionando");

// TESTE GOOGLE (temporário)
window.googleLogin = () => alert("google funcionando");