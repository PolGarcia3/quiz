window.onload = function() {
    openTrivia();
}

function objetoAjax() {
    var xmlhttp = false;
    try {
        xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (e) {
        try {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (E) {
            xmlhttp = false;
        }
    }
    if (!xmlhttp && typeof XMLHttpRequest != 'undefined') {
        xmlhttp = new XMLHttpRequest();
    }
    return xmlhttp;
}

var question = 0;
var correcta = 0;

function openTrivia() {
    results = {};

    ajax = objetoAjax()

    ajax.open("GET", "https://opentdb.com/api.php?amount=50&type=multiple", true);
    ajax.onreadystatechange = function() {

        if (ajax.readyState == 4 && ajax.status == 200) {
            var respuesta = JSON.parse(this.responseText);
            results = respuesta.results;
            console.log(results)
            pregunta();
        }
    }
    ajax.send();
}

function pregunta() {
    var quiz = document.getElementById('quiz');
    var recarga = '';

    if (question == 10) {

        recarga += '<h1>¡HAS LLEGADO AL FINAL!</h1>'
        recarga += '<br>';
        recarga += '<h3>Respuestas correctas = ' + correcta + '</h3>';
        recarga += '<br>';
        recarga += '<h2>Quieres volver a jugar?</h2>';
        recarga += '<br>';
        recarga += '<button class="btn btn-dark" onclick="location.reload()">JUGAR</button>';
        quiz.innerHTML = recarga;

    } else {
        question++;
        var preguntas = [];
        recarga += '<h1>PREGUNTAS</h1>'
        recarga += '<h4>' + results[0]["question"] + '</h4>'
        recarga += '<br>';
        preguntas.push('<button type="button" class="btn btn-primary btn-lg btn-block" onclick="correcto(this)">' + results[0]["correct_answer"] + '</button>')
        preguntas.push('<button type="button" class="btn btn-primary btn-lg btn-block" onclick="correcto(this)">' + results[0]["incorrect_answers"][0] + '</button>')
        preguntas.push('<button type="button" class="btn btn-primary btn-lg btn-block" onclick="correcto(this)">' + results[0]["incorrect_answers"][1] + '</button>')
        preguntas.push('<button type="button" class="btn btn-primary btn-lg btn-block" onclick="correcto(this)">' + results[0]["incorrect_answers"][2] + '</button>')
        random = preguntas.sort(function() { return Math.random() - 0.5 });
        for (let i = 0; i < random.length; i++) {
            recarga += random[i]
        }
        recarga += '<button type="button" class="btn btn-secondary btn-lg btn-block" onclick="openTrivia()">Siguiente</button>'
        quiz.innerHTML = recarga;
    }
}

function correcto(variable) {
    var p_correcta = results[0]["correct_answer"];
    if (p_correcta == variable.innerHTML) {
        correcta++;
        variable.style.backgroundColor = "green";
        variable.style.borderColor = "green";
        boton = document.getElementsByClassName("btn btn-primary btn-lg btn-block");
        for (let i = 0; i < boton.length; i++) {
            boton[i].disabled = true;
        }
    } else {
        variable.style.backgroundColor = "red";
        variable.style.borderColor = "red";
        boton = document.getElementsByClassName("btn btn-primary btn-lg btn-block");
        for (let i = 0; i < boton.length; i++) {
            boton[i].disabled = true;
        }
    }
}