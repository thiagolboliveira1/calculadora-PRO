import { app } from "./firebase.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

// LOGIN
window.login = async () => {
    let email = emailEl().value;
    let senha = senhaEl().value;

    await signInWithEmailAndPassword(auth, email, senha);
    window.location.href = "dashboard.html";
};

// REGISTRO
window.register = async () => {
    let email = emailEl().value;
    let senha = senhaEl().value;

    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Conta criada!");
};

// GOOGLE
window.googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    window.location.href = "dashboard.html";
};

// helpers
const emailEl = () => document.getElementById("email");
const senhaEl = () => document.getElementById("senha");