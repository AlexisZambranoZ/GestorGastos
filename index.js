// Obtener elementos del DOM
const saldoActual = document.getElementById("saldo-actual");
const barraProgreso = document.querySelector("#barra-progreso .relleno");
const listaGastos = document.getElementById("lista-gastos");

// Inicializar el saldo actual con el saldo ingresado por el usuario
let saldoInicial = parseFloat(prompt("Ingrese su saldo actual:"));
let saldo = saldoInicial;
saldoActual.textContent = `Saldo actual: $${saldo.toFixed(2)}`;
// Crear una variable para almacenar los gastos
const gastos = [];

// Función para actualizar el saldo actual y la barra de progreso
function actualizarSaldo() {
    // Calcular el total de gastos
    const totalGastos = gastos.reduce((total, gasto) => total + gasto.cantidad, 0);

    // Actualizar el saldo actual y la barra de progreso
    saldo -= totalGastos;
    saldoActual.textContent = `Saldo actual: $${saldo.toFixed(2)}`;
    barraProgreso.style.width = `${saldo * 100 / saldoInicial}%`;
    localStorage.setItem("gastos", JSON.stringify(gastos));
}

// Función para mostrar la lista de gastos
function mostrarGastos() {
    // Vaciar la lista de gastos
    listaGastos.innerHTML = "";

    // Crear un elemento <li> para cada gasto y agregarlo a la lista de gastos
    gastos.forEach((gasto) => {
        const li = document.createElement("li");
        li.textContent = `${gasto.nombre} - $${gasto.cantidad.toFixed(2)} - ${gasto.fecha}`;
        listaGastos.appendChild(li);
    });
}

// Escuchar el evento submit del formulario para agregar gastos
const formulario = document.querySelector("form");
formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    // Obtener los valores ingresados por el usuario
    const nombre = formulario.nombre.value;
    const cantidad = parseFloat(formulario.cantidad.value);
    const fecha = formulario.fecha.value;

    // Crear un objeto para representar el gasto
    const gasto = { nombre, cantidad, fecha };

    // Agregar el gasto a la lista de gastos y actualizar el saldo actual
    gastos.push(gasto);
    actualizarSaldo();
    mostrarGastos();

    // Limpiar los campos del formulario
    formulario.reset();
});
