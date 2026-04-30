import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyB_UmbwA2O-7_rTLY_TmgRiUl2dP5tmmfM",
  authDomain: "calcpro-b2f4c.firebaseapp.com",
  projectId: "calcpro-b2f4c",
  storageBucket: "calcpro-b2f4c.firebasestorage.app",
  messagingSenderId: "999996315749",
  appId: "1:999996315749:web:5667398eec16c0eb940e8c",
  measurementId: "G-0BW51LT9G2"
};

export const app = initializeApp(firebaseConfig);

import { app } from "./firebase.js";

import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

// inputs
const emailEl = () => document.getElementById("email");
const senhaEl = () => document.getElementById("senha");

// LOGIN
async function login() {
  const email = emailEl().value;
  const senha = senhaEl().value;

  await signInWithEmailAndPassword(auth, email, senha);
  window.location.href = "dashboard.html";
}

// CADASTRO
async function register() {
  const email = emailEl().value;
  const senha = senhaEl().value;

  await createUserWithEmailAndPassword(auth, email, senha);
  alert("Conta criada!");
}

// GOOGLE
async function googleLogin() {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
  window.location.href = "dashboard.html";
}

// expor funções pro HTML
window.login = login;
window.register = register;
window.googleLogin = googleLogin;