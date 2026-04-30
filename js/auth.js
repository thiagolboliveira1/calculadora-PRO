import { app } from "./firebase.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

const emailEl = () => document.getElementById("email");
const senhaEl = () => document.getElementById("senha");

// LOGIN
window.login = async () => {
  try {
    await signInWithEmailAndPassword(
      auth,
      emailEl().value,
      senhaEl().value
    );
    window.location.href = "dashboard.html";
  } catch (e) {
    alert(e.message);
  }
};

// CADASTRO
window.register = async () => {
  try {
    await createUserWithEmailAndPassword(
      auth,
      emailEl().value,
      senhaEl().value
    );
    alert("Conta criada!");
  } catch (e) {
    alert(e.message);
  }
};

// GOOGLE
window.googleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    window.location.href = "dashboard.html";
  } catch (e) {
    alert(e.message);
  }
};