
let tipo = "motorista";

// ===== TOGGLE MODE =====
window.setMode = function(mode) {
    tipo = mode;

    document.getElementById("btnMotorista").classList.remove("active");
    document.getElementById("btnEntregador").classList.remove("active");

    if (mode === "motorista") {
        document.getElementById("btnMotorista").classList.add("active");
    } else {
        document.getElementById("btnEntregador").classList.add("active");
    }
};

// ===== BOTÃO CALCULAR =====
window.calcular = function () {

    if (tipo === "motorista") {
        calcularMotorista();
    } else {
        calcularEntregador();
    }
};

// ===== MOTORISTA =====
function calcularMotorista() {

    let km = parseFloat(document.getElementById('km').value) || 0;
    let valor = parseFloat(document.getElementById('valor').value) || 0;

    let consumo = parseFloat(document.getElementById('consumo').value) || 10;
    let gasolina = parseFloat(document.getElementById('gasolina').value) || 7;

    let manut = parseFloat(document.getElementById('manut').value) || 0;
    let mei = parseFloat(document.getElementById('mei').value) || 0;
    let extra = parseFloat(document.getElementById('extra').value) || 0;

    // ===== CORRIDA =====
    let valorKm = km ? (valor / km) : 0;

    let litros = km / consumo;
    let custoCombustivel = litros * gasolina;

    // ===== CUSTO FIXO MENSAL (explicado) =====
    let custoMensal = manut + mei + extra;

    // dilui custo por corrida (simulação simples)
    let custoPorCorrida = custoMensal * 0.05;

    let lucro = valor - custoCombustivel - custoPorCorrida;

    // ===== STATUS =====
    let status = "";

    if (valorKm < 1.30) status = "❌ RUIM (não compensa)";
    else if (valorKm < 1.70) status = "⚠️ ATENÇÃO";
    else if (valorKm < 2.00) status = "✅ BOA";
    else status = "🔥 EXCELENTE";

    document.getElementById("resultado").innerHTML = `
        🚗 <b>ANÁLISE DA CORRIDA</b><br><br>

        📍 KM total: ${km} km<br>
        💰 Valor/km: R$ ${valorKm.toFixed(2)}<br><br>

        ⛽ Combustível: R$ ${custoCombustivel.toFixed(2)}<br>
        📊 Custo operacional (estimado): R$ ${custoPorCorrida.toFixed(2)}<br><br>

        💵 Lucro real estimado: <b>R$ ${lucro.toFixed(2)}</b><br><br>

        ⚠️ Status: <b>${status}</b><br><br>

        <small>
        ℹ️ Custos mensais são diluídos automaticamente para simular impacto por corrida.
        </small>
    `;
}

// ===== ENTREGADOR =====
function calcularEntregador() {

    let km = parseFloat(document.getElementById('km').value) || 0;
    let valor = parseFloat(document.getElementById('valor').value) || 0;

    let valorKm = km ? (valor / km) : 0;

    document.getElementById("resultado").innerHTML = `
        📦 MODO ENTREGADOR<br><br>
        📍 KM: ${km}<br>
        💰 Valor/km: R$ ${valorKm.toFixed(2)}<br>
        ⚡ Simples e direto
    `;
}

// ===== SALVAR (placeholder) =====
window.salvar = function () {
    alert("Função salvar em desenvolvimento");
};