import { app } from "./firebase.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

// ===== ELEMENTOS =====
const emailEl = () => document.getElementById("email");
const senhaEl = () => document.getElementById("senha");

// ===== LOGIN =====
window.login = async () => {
  const email = emailEl().value;
  const senha = senhaEl().value;

  try {
    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "dashboard.html";
  } catch (e) {
    alert("Erro login: " + e.message);
  }
};

// ===== CADASTRO =====
window.register = async () => {
  const email = emailEl().value;
  const senha = senhaEl().value;

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Conta criada com sucesso!");
    window.location.href = "dashboard.html";
  } catch (e) {
    alert("Erro cadastro: " + e.message);
  }
};

// ===== GOOGLE LOGIN =====
window.googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    window.location.href = "dashboard.html";
  } catch (e) {
    alert("Erro Google: " + e.message);
  }
};

// ===== PROTEÇÃO DE TELA =====
onAuthStateChanged(auth, (user) => {
  const isLoginPage = window.location.pathname.includes("index.html");

  if (!user && !isLoginPage) {
    window.location.href = "index.html";
  }
});