console.log("AUTH CARREGADO");

import { app } from "./firebase.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

// ===== HELPERS =====
const emailEl = () => document.getElementById("email");
const senhaEl = () => document.getElementById("senha");

// ===== LOGIN =====
async function login() {
  let email = emailEl().value;
  let senha = senhaEl().value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "dashboard.html";
  } catch (error) {
    alert(error.message);
  }
}

// ===== REGISTRO =====
async function register() {
  let email = emailEl().value;
  let senha = senhaEl().value;

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Conta criada com sucesso!");
  } catch (error) {
    alert(error.message);
  }
}

// ===== GOOGLE LOGIN =====
async function googleLogin() {
  const provider = new GoogleAuthProvider();
  await signInWithRedirect(auth, provider);
}

// ===== RETORNO DO GOOGLE =====
getRedirectResult(auth)
  .then((result) => {
    if (result) {
      window.location.href = "dashboard.html";
    }
  })
  .catch((error) => {
    console.log(error);
    alert("Erro no login com Google");
  });

// ===== EXPOR PARA HTML =====
window.login = login;
window.register = register;
window.googleLogin = googleLogin;