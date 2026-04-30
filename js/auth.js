import { app } from "./firebase.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

console.log("AUTH + FIREBASE OK");

// TESTE
window.login = () => alert("login ok");
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const emailEl = () => document.getElementById("email");
const senhaEl = () => document.getElementById("senha");

window.register = async () => {
  let email = emailEl().value;
  let senha = senhaEl().value;

  try {
    await createUserWithEmailAndPassword(auth, email, senha);
    alert("Conta criada!");
  } catch (e) {
    alert(e.message);
  }
};
window.googleLogin = () => alert("google ok");