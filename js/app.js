
let tipo = "motorista";

// ================= MODE =================
window.setMode = function(mode) {
    tipo = mode;

    document.getElementById("btnMotorista").classList.remove("active");
    document.getElementById("btnEntregador").classList.remove("active");

    if (mode === "motorista") {
        document.getElementById("btnMotorista").classList.add("active");
    } else {
        document.getElementById("btnEntregador").classList.add("active");
    }

    limparCampos();
};

// ================= LIMPAR =================
function limparCampos() {
    document.getElementById("km").value = "";
    document.getElementById("valor").value = "";
    document.getElementById("resultado").innerHTML = "";
}

// ================= BOTÃO PRINCIPAL =================
window.calcular = function () {
    if (tipo === "motorista") {
        calcularMotorista();
    } else {
        calcularEntregador();
    }
};

// ================= MOTORISTA =================
function calcularMotorista() {

    let km = +document.getElementById('km').value || 0;
    let valor = +document.getElementById('valor').value || 0;
    let consumo = +document.getElementById('consumo').value || 10;
    let gasolina = +document.getElementById('gasolina').value || 7;

    
let manut = +document.getElementById('manut').value || 0;
let mei = +document.getElementById('mei').value || 0;
let extra = +document.getElementById('extra').value || 0;

let custoFixoTotal = manut + mei + extra;
let custoFixoPorCorrida = custoFixoTotal * 0.05;

    if (km === 0 || valor === 0) {
        alert("Preencha KM e valor da corrida");
        return;
    }

    let valorKm = valor / km;
    let custoCombustivel = (km / consumo) * gasolina;

    let custoFixo = manut + mei + extra;
    let lucro = valor - custoCombustivel - custoFixo * 0.05;

    let status = "";

    if (valorKm < 1.30) status = "❌ NÃO VALE";
    else if (valorKm < 1.70) status = "⚠️ CUIDADO";
    else if (valorKm < 2.00) status = "✅ BOA";
    else status = "🔥 EXCELENTE";

    salvarHistorico("motorista", km, valor, lucro);

    document.getElementById("resultado").innerHTML = `
        🚗 MOTORISTA<br><br>

        📍 KM: ${km}<br>
        💰 Valor: R$ ${valor.toFixed(2)}<br>
        💰 R$/KM: R$ ${valorKm.toFixed(2)}<br><br>

        ⛽ Combustível: R$ ${custoCombustivel.toFixed(2)}<br>
        📊 Custos fixos: R$ ${custoFixo.toFixed(2)}<br><br>

        💵 Lucro: <b>R$ ${lucro.toFixed(2)}</b><br><br>

        ⚠️ ${status}
    `;
}

// ================= ENTREGADOR =================


function calcularEntregador() {

    let km = +document.getElementById('km').value || 0;
    let valor = +document.getElementById('valor').value || 0;
    let consumo = +document.getElementById('consumo').value || 10;
    let gasolina = +document.getElementById('gasolina').value || 7;

    let manut = +document.getElementById('manut').value || 0;
    let mei = +document.getElementById('mei').value || 0;
    let extra = +document.getElementById('extra').value || 0;

    if (km === 0 || valor === 0) {
        alert("Preencha KM e valor");
        return;
    }

    let valorKm = valor / km;

    // combustível
    let litros = km / consumo;
    let custoGasolina = litros * gasolina;

    // custos fixos (mesmo do motorista, mas diluídos)
    let custoFixoTotal = manut + mei + extra;
    let custoFixoPorCorrida = custoFixoTotal * 0.03; // menor impacto no entregador

    // lucro real
    let lucroLiquido = valor - custoGasolina - custoFixoPorCorrida;

    salvarHistorico("entregador", km, valor, lucroLiquido);

    document.getElementById("resultado").innerHTML = `
📦 ENTREGADOR<br><br>

📍 KM: ${km}<br>
💰 Valor: R$ ${valor.toFixed(2)}<br>
💰 R$/KM: R$ ${valorKm.toFixed(2)}<br><br>

⛽ Combustível: R$ ${custoGasolina.toFixed(2)}<br>
📊 Custos fixos: R$ ${custoFixoPorCorrida.toFixed(2)}<br><br>

💵 Lucro: R$ ${lucroLiquido.toFixed(2)}
`;
}
// ================= HISTÓRICO =================
function salvarHistorico(tipo, km, valor, lucro) {

    let dados = JSON.parse(localStorage.getItem("historico")) || [];

    dados.push({
        tipo,
        km,
        valor,
        lucro,
        data: new Date().toLocaleString()
    });

    localStorage.setItem("historico", JSON.stringify(dados));
}

// ================= VER HISTÓRICO =================
window.verHistorico = function () {

    let dados = JSON.parse(localStorage.getItem("historico")) || [];

    let html = "<h3>📊 Histórico</h3>";

    dados.slice(-10).reverse().forEach(item => {
        html += `
        <div class="card">
            <b>${item.tipo}</b><br>
            KM: ${item.km}<br>
            Valor: R$ ${item.valor}<br>
            Lucro: R$ ${item.lucro.toFixed(2)}<br>
            <small>${item.data}</small>
        </div>
        `;
    });

    document.getElementById("resumo").innerHTML = html;
};

// ================= SALVAR BOTÃO =================
window.salvar = function () {
    verHistorico();
};