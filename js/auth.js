import { signInWithRedirect } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.googleLogin = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
};

import { getRedirectResult } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

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

  window.login = login;
window.register = register;
window.googleLogin = googleLogin;