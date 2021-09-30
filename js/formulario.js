var formulario = document.getElementById("formulario");
var mensaje = document.getElementById("mensaje");
// Funcion para limpiar los datos del formulario
function limpiarDatos() {
    formulario.reset();
}
formulario.addEventListener("submit", function (event) {
    // Validación de los requerimientos
    if (validar()) {
        formulario.style.display = "none";
        mensaje.style.display = "block";
        mensaje.innerHTML = "Hemos recibido sus datos, pronto nos estaremos comunicando con usted";
        mensaje.style.color = "red";
        mensaje.style.margin = "50px";
    }
    else {
        alert('Error Ingrese datos correctemente');
    }
    event.preventDefault(); //evitar que se refresque
});
function validar() {
    if (validarCheckboxLenguaje() && validarRut() && validarTelefono() && validarTextArea()) {
        return true;
    }
    else {
        return false;
    }
}
// Validación de que se marca por lo menos una checkbox
function validarCheckboxLenguaje() {
    var lenguaje = document.getElementsByName("checkbox-grupo");
    var divLenguajes = document.getElementById("checkbox-lenguajes");
    var warning = document.getElementById("advertencia-checkbox");
    // Verificación para saber si escogió un lenguaje programacion
    for (var i = 0; i < lenguaje.length; i++) {
        if (lenguaje[i].checked) {
            warning === null || warning === void 0 ? void 0 : warning.remove();
            return true;
        }
    }
    if (!warning) {
        console.log(lenguaje);
        advertencia("Eliga al menos un lenguaje", divLenguajes, "advertencia-checkbox");
    }
    return false;
}
// Validar que el RUT tiene numeros en formato sin punto, con guion y digito verificador
function validarRut() {
    var rut = document.getElementById("rut");
    var digito_verificador = '0123456789kK';
    var guion = '-';
    var numeros = "0123456789";
    var punto = '.';
    var warning = document.getElementById("advertencia-rut");
    // Verificacion para que el rut ingresado tenga punto
    if (rut.value.includes(punto)) {
        if (!warning) {
            advertencia("Ejemplo: 12345678-9", rut, "advertencia-rut");
        }
        alert('No incluya puntos en el RUT');
        return false;
    }
    // Verificar que el guion se encuentre en la penultima posicion del rut ingresado
    var posicion_guion = rut.value.length - 2;
    if (rut.value.charAt(posicion_guion) !== guion) {
        if (!warning) {
            advertencia("Ejemplo: 12345678-9", rut, "advertencia-rut");
        }
        alert('Ingrese un guion seguido del digito verificador');
        return false;
    }
    // Restricción para que solo tenga un guion
    var contador = 0;
    for (var i = 0; i < rut.value.length - 1; i++) {
        if (rut.value.charAt(i) === guion) {
            contador++;
        }
        if (contador > 1) {
            if (!warning) {
                advertencia("Ejemplo: 12345678-9", rut, "advertencia-rut");
            }
            alert('Ingresar solo un guion');
            return false;
        }
    }
    // Se verifica que se ingresen digitos numericos, excluyendo al digito verificador
    for (var i = 0; i < rut.value.length - 2; i++) {
        var contiene_numero = numeros.indexOf(rut.value.charAt(i));
        if (contiene_numero === -1) {
            if (!warning) {
                advertencia("Ejemplo: 11222333-K", rut, "advertencia-rut");
            }
            alert('Ingrese solo numeros');
            return false;
        }
    }
    // Se restringen los caracteres permitidos en el dv
    var ultima_posicion = rut.value.length - 1;
    if (digito_verificador.indexOf(rut.value.charAt(ultima_posicion)) === -1) {
        if (!warning) {
            advertencia("Ejemplo: 11222333-K", rut, "advertencia-rut");
        }
        alert('Ingrese solo caracteres permitidos en el digito verificador');
        return false;
    }
    warning === null || warning === void 0 ? void 0 : warning.remove();
    return true;
}
// Funcion para validar que el numero ingresado tenga exactamente 9 digitos
function validarTelefono() {
    var numero = document.getElementById("telefono");
    var warning = document.getElementById("advertencia-telefono");
    if (numero.value.length !== 9) {
        //prueba
        if (!warning) {
            advertencia("Error, ingrese 9 digitos como se indica:", numero, "advertencia-telefono");
        }
        return false;
    }
    warning === null || warning === void 0 ? void 0 : warning.remove();
    return true;
}
// Funcion para validar de que text Area tenga un tope de 300 caracteres maximos.
function validarTextArea() {
    var opinion = document.getElementById("opinion");
    var warning = document.getElementById("advertencia-textArea");
    if (opinion.value.length > 500) {
        if (!warning) {
            advertencia("Prohibido agregar mas de 500 caracteres", opinion, "advertencia-textArea");
        }
        return false;
    }
    warning === null || warning === void 0 ? void 0 : warning.remove();
    return true;
}
//Funcion para agregar una advertencia a los errores.
function advertencia(mensaje, elemento, id) {
    var nuevoDiv = document.createElement("div");
    nuevoDiv.setAttribute("id", id);
    nuevoDiv.style.color = 'red';
    nuevoDiv.innerHTML = mensaje;
    //agrego
    elemento.insertAdjacentElement("afterend", nuevoDiv);
}
