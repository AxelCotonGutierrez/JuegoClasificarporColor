// Axel Cotón Gutiérrez Copyright 2024


let totalFormasGeneradas = 0;

function allowDrop(e) {
    e.preventDefault();
}

function dragStart(e) {
    e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    var figura = document.getElementById(data);
    e.target.appendChild(figura);
}

function generarFormas() {
    const colores = ['white', 'black', 'pink', 'brown', 'green', 'red', 'yellow', 'blue', 'orange', 'violet'];
    const formas = ['square', 'circle', 'rombus'];
    const todasLasFormas = [];
    const color1 = seleccionarColorAleatorio();
    let color2;
    do {
        color2 = seleccionarColorAleatorio();
    } while (color1 === color2);

    const totalFormas = Math.floor(Math.random() * 5) + 2;
    let formasColor1 = 1;
    let formasColor2 = 1;

    for (let i = 0; i < totalFormas - 2; i++) {
        Math.random() < 0.5 ? formasColor1++ : formasColor2++;
    }

    formasColor1 = Math.min(formasColor1, 3);
    formasColor2 = Math.min(formasColor2, 3);

    agregarFormas(todasLasFormas, color1, formasColor1, 'color1');
    agregarFormas(todasLasFormas, color2, formasColor2, 'color2');

    totalFormasGeneradas = totalFormas;

    mezclarFormas(todasLasFormas);

    todasLasFormas.forEach(forma => {
        document.getElementById('shapes-container').appendChild(forma);
    });

    document.getElementById('color-indicator-1').style.backgroundColor = color1;
    document.getElementById('color-indicator-2').style.backgroundColor = color2;
}

function seleccionarColorAleatorio() {
    const colores = ['white', 'black', 'pink', 'brown', 'green', 'red', 'yellow', 'blue', 'orange', 'violet'];
    return colores[Math.floor(Math.random() * colores.length)];
}

function agregarFormas(arr, color, num, colorClass) {
    const formas = ['square', 'circle', 'rombus'];
    for (let i = 0; i < num; i++) {
        const forma = formas[Math.floor(Math.random() * formas.length)];
        const formaDiv = document.createElement('div');
        formaDiv.id = 'forma-' + color + '-' + i;
        formaDiv.className = 'shape ' + forma + ' ' + color;
        formaDiv.classList.add(colorClass);
        formaDiv.draggable = true;
        formaDiv.addEventListener('dragstart', dragStart);
        arr.push(formaDiv);
    }
}

function mezclarFormas(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

function comprobarResultados() {
    const contenedor1 = document.getElementById('color-container-1');
    const contenedor2 = document.getElementById('color-container-2');
    const resultDisplay = document.getElementById('result');

    if (contenedor1.children.length + contenedor2.children.length < totalFormasGeneradas) {
        resultDisplay.textContent = 'Antes de comprobar, introduce todos los elementos en los contenedores.';
        resultDisplay.style.color = 'orange';
        return;
    }

    const esCorrectoContenedor1 = Array.from(contenedor1.children).every(elem => elem.classList.contains('color1'));
    const esCorrectoContenedor2 = Array.from(contenedor2.children).every(elem => elem.classList.contains('color2'));

    if (esCorrectoContenedor1 && esCorrectoContenedor2) {
        resultDisplay.textContent = '¡Correcto! Los contenedores tienen las figuras geométricas del color adecuado.';
        resultDisplay.style.color = 'green';
    } else {
        resultDisplay.textContent = 'Algunas figuras geométricas están mal colocadas. Vuelve a intentarlo';
        resultDisplay.style.color = 'red';
    }
}

function reiniciarJuego() {
    const contenedor1 = document.getElementById('color-container-1');
    const contenedor2 = document.getElementById('color-container-2');
    const shapesContainer = document.getElementById('shapes-container');
    const resultDisplay = document.getElementById('result');

    contenedor1.innerHTML = '';
    contenedor2.innerHTML = '';
    shapesContainer.innerHTML = '';
    resultDisplay.textContent = '';

    // Volver a generar y mezclar las formas
    generarFormas();
}

document.addEventListener('DOMContentLoaded', function() {
    generarFormas();

    const botonReiniciar = document.querySelector('.guess-button[onclick="nextQuestion()"]');
    if (botonReiniciar) {
        botonReiniciar.addEventListener('click', reiniciarJuego);
    }

    var menuToggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
});


// Navegación
document.addEventListener('DOMContentLoaded', function() {
    var menuToggle = document.querySelector('.menu-toggle');
    var menu = document.querySelector('.menu');
    
    menuToggle.addEventListener('click', function() {
        menu.classList.toggle('active');
    });
});
