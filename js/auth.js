import { app } from "./firebase.js";

import {
  getAuth
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const auth = getAuth(app);

console.log("AUTH + FIREBASE OK");

// TESTE
window.login = () => alert("login ok");
window.register = () => alert("register ok");
window.googleLogin = () => alert("google ok");