import { app } from "./firebase.js";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const db = getFirestore(app);
const auth = getAuth(app);

let ultima = null;

// CALCULAR
window.calcular = () => {

    let km = val("km");
    let valor = val("valor");
    let consumo = val("consumo");
    let gasolina = val("gasolina");

    let manut = val("manut");
    let mei = val("mei");
    let extra = val("extra");

    let custo = (km / consumo) * gasolina;
    let lucro = valor - custo;

    let lFinal = lucro
        - lucro * (manut/100)
        - lucro * (mei/100)
        - lucro * (extra/100);

    ultima = { valor, custo, lucroFinal: lFinal, data: new Date().toISOString() };

    el("resultado").innerHTML =
        "Lucro final: R$ " + lFinal.toFixed(2);
};

// SALVAR
window.salvar = async () => {

    if (!ultima) return alert("Calcule antes");

    await addDoc(collection(db, "corridas"), {
        uid: auth.currentUser?.uid,
        ...ultima
    });

    resumo();
};

// RESUMO
async function resumo() {

    let snap = await getDocs(collection(db, "corridas"));
    let total = 0;

    snap.forEach(doc => {
        let d = doc.data();
        total += d.lucroFinal;
    });

    el("resumo").innerText = "Mês: R$ " + total.toFixed(2);
}

// helpers
const val = id => parseFloat(el(id).value) || 0;
const el = id => document.getElementById(id);

// init
resumo();