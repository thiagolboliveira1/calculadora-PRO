import { app } from "./firebase.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

// ===== INPUTS =====
const emailEl = () => document.getElementById("email");
const senhaEl = () => document.getElementById("senha");

// ===== LOGIN =====
window.login = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      emailEl().value,
      senhaEl().value
    );

    window.location.href = "dashboard.html";
  } catch (e) {
    alert("Erro login: " + e.message);
  }
};

// ===== CADASTRO =====
window.register = async () => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      emailEl().value,
      senhaEl().value
    );

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

// ===== LOGOUT (CORRIGIDO) =====
window.logout = async () => {
  try {
    console.log("Tentando logout...");

    await signOut(auth);

    console.log("Logout feito");

    // força limpeza de estado
    window.location.replace("index.html");

  } catch (e) {
    console.error("ERRO LOGOUT:", e);
    alert("Erro ao sair: " + e.message);
  }
};

// ===== AUTO LOGIN =====
onAuthStateChanged(auth, (user) => {
  const isLoginPage = window.location.pathname.includes("index.html");

  if (user && isLoginPage) {
    window.location.href = "dashboard.html";
  }

  if (!user && !isLoginPage && window.location.pathname.includes("dashboard.html")) {
    window.location.href = "index.html";
  }
});