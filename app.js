let lista_amigos_total = [];

function esNombreValido(nombre) {
    // No vacío, solo letras y espacios, mínimo 2 caracteres, máximo 25 caracteres
    const regex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,25}$/;
    return regex.test(nombre.trim());
}

function mostrarMensaje(mensaje, tipo = "error") {
    const resultado = document.getElementById('resultado');
    resultado.innerHTML = mensaje;
    resultado.style.color = tipo === "error" ? "red" : "green";
}

function limpiarInput() {
    document.getElementById('amigo').value = "";
}

function actualizarListaVisual() {
    const lista_amigos = document.getElementsByClassName("name-list")[0];
    lista_amigos.innerHTML = lista_amigos_total.map(nombre => `<li>${nombre}</li>`).join('');
}

function agregarAmigo() {
    const nombre = document.getElementById('amigo').value;
    if (!esNombreValido(nombre)) {
        mostrarMensaje("Nombre inválido. Solo letras, mínimo 2 caracteres y maximo 25 caracteres.", "error");
        limpiarInput();
        return;
    }
    if (lista_amigos_total.includes(nombre.trim())) {
        mostrarMensaje("Ese nombre ya está en la lista.", "error");
        limpiarInput();
        return;
    }
    lista_amigos_total.push(nombre.trim());
    actualizarListaVisual();
    mostrarMensaje("Amigo agregado correctamente.", "success");
    limpiarInput();
    document.getElementById('amigo').focus();
}

function sortearAmigo() {
    if (lista_amigos_total.length < 2) {
        mostrarMensaje("Agrega al menos dos amigos para sortear.", "error");
        return;
    }
    const num_amigos_secreto = Math.floor(Math.random() * lista_amigos_total.length);
    mostrarMensaje(`Tu amigo secreto es: ${lista_amigos_total[num_amigos_secreto]}`, "success");
    lista_amigos_total = [];
    actualizarListaVisual();
}

document.getElementById('amigo').addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        agregarAmigo();
    }
});
