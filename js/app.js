window.addEventListener('DOMContentLoaded', appDate);

// Datos input
const inputDay = document.querySelector('#appDay');
const inputMonth = document.querySelector("#appMonth");
const inputYear = document.querySelector("#appYear");

// Resultados
const resultadoYears = document.querySelector('#responseYears');
const resultadoMonths = document.querySelector('#responseMonths');
const resultadoDays = document.querySelector('#responseDays');

// Arreglo para almacenar y ordenar la fecha
const datos = []; 


function appDate() {
    // Leer input mientras se va escribiendo
    inputDay.addEventListener('input', function(e){
        datos[0] = e.target.value;
        inputValidate = inputDay.parentElement.parentElement;
        verificarInputs(inputValidate);
    });

    inputMonth.addEventListener('input', function(e){
        datos[1] = e.target.value;
        inputValidate = inputMonth.parentElement.parentElement;
        verificarInputs(inputValidate);
    });

    inputYear.addEventListener('input', function(e){
        datos[2] = e.target.value;
        inputValidate = inputYear.parentElement.parentElement;
        verificarInputs(inputValidate);
    });

    // Boton Calcular
    const calcularEdad = document.querySelector('#calcularEdad');

    // Calcular edad
    calcularEdad.addEventListener('click', function(){
        let day = datos[0];
        let month = datos[1];
        let year = datos[2];

        // Si la funcion validacion devuelve false (no hay errores) se realizara el calculo
        if(validacionInputs() == false) {
            let fechaActual = new Date().toLocaleDateString();
            let fechaUser = `${day}/${month}/${year}`;
            
            daysMonthsYearsInDates(fechaUser,fechaActual);
            animacionBoton();
        }
    });

    // Boton limpiar
    const limpiarDatos= document.querySelector('#limpiarDatos');
    limpiarDatos.addEventListener('click', limpiarDatosApp);
}


// Obtener numero de dias entre fechas
function numDayInDates(dateStart, dateEnd) {
    var arrayDateStart = dateStart.split('/');
    var arrayDateEnd = dateEnd.split('/');
    var msegDateStart = Date.UTC(arrayDateStart[2], arrayDateStart[1] - 1, arrayDateStart[0]);
    var msegDateEnd = Date.UTC(arrayDateEnd[2], arrayDateEnd[1] - 1, arrayDateEnd[0]);
    var diff = msegDateEnd - msegDateStart;
    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    return days;
}

// Dias por mes
function daysInMonth(month, year) {
    return new Date(year, month, 0).getDate();
}

// Sumar dias por fecha
function sumDaysToDate(numDays, date){
    var arrayDate = date.split('/');
    var newDate = new Date(arrayDate[2]+'/'+arrayDate[1]+'/'+arrayDate[0]);
    newDate.setDate(newDate.getDate()+parseInt(numDays));        
    return newDate.getDate() + '/' + (newDate.getMonth()+1) + '/'+ newDate.getFullYear();
}

// Dias, meses, años por fechas
function daysMonthsYearsInDates(dateStart, dateEnd) {
    var daysTotals = numDayInDates(dateStart, dateEnd);
    // console.log(daysTotals);
    var daysCal = 0;
    var cantDays = 0;
    var cantMonths = 0;
    var cantYears = 0;
    while (daysCal < daysTotals) {
        var arrayDateStart = dateStart.split('/');
        var daysOfMonth = daysInMonth(arrayDateStart[1], arrayDateStart[2]);
        daysCal = daysCal + daysOfMonth;
        if (daysCal <= daysTotals) {
            cantMonths++;
            if (cantMonths == 12) {
                cantYears++;
                cantMonths = cantMonths - 12;
            }
        } else {
            cantDays = Math.abs(numDayInDates(dateStart, dateEnd));
        }
        dateStart = sumDaysToDate(daysOfMonth, dateStart);
    }

    mostrarResultado(cantDays,cantMonths,cantYears);
}

// Mostrar resultados 
function mostrarResultado(days,months,years) {
    // Years
    resultadoYears.setAttribute('data-total',years)
    contadorYears();
    // Months
    resultadoMonths.setAttribute('data-total',months)
    contadorMonths();
    // Days
    resultadoDays.setAttribute('data-total',days)      
    contadorDays();
}

// Resultado Years
function contadorYears(){
    $('#responseYears').html("");
    $('#responseYears').each(function () {
        var $this = $(this),
            countTo = $this.attr('data-total');

        $({ countNum: $this.text() }).animate({
            countNum: countTo
        },
            {
                duration: 500,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                }
            });
    });
}

// Resultado Months
function contadorMonths(){
    $('#responseMonths').html("");
    $('#responseMonths').each(function () {
        var $this = $(this),
            countTo = $this.attr('data-total');

        $({ countNum: $this.text() }).animate({
            countNum: countTo
        },
            {
                duration: 500,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                }
            });
    });
}

// Resultado Days
function contadorDays(){
    $('#responseDays').html("");
    $('#responseDays').each(function () {
        var $this = $(this),
            countTo = $this.attr('data-total');

        $({ countNum: $this.text() }).animate({
            countNum: countTo
        },
            {
                duration: 500,
                easing: 'linear',
                step: function () {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function () {
                    $this.text(this.countNum);
                }
            });
    });
}

// Agregar animacion
function animacionBoton() {
    const calcularEdad = document.querySelector('#calcularEdad');

    calcularEdad.classList.add('animation-boton-calcular');

    setTimeout(function(){
        calcularEdad.classList.remove('animation-boton-calcular');
    },800);
}

// Limpiar datos de la app
function limpiarDatosApp() {
    const limpiarDatos= document.querySelector('#limpiarDatos');
    
    // Ljmpiar inputs y resultado
    limpiarInputs();
    limpiarResultados();
    
    // Agregar animacion
    limpiarDatos.classList.add('animation-boton-limpiar');

    // Quitar animacion
    setTimeout(function(){
        limpiarDatos.classList.remove('animation-boton-limpiar');
    },800);
}

// Limpiar resultados
function limpiarResultados() {
    resultadoYears.textContent = '- -';
    resultadoMonths.textContent = '- -';
    resultadoDays.textContent = '- -';
}


// Limpiar inputs
function limpiarInputs() {
    inputDay.value = '';
    inputMonth.value = '';
    inputYear.value = '';

    inputDayValidate = inputDay.parentElement.parentElement;
    verificarInputs(inputDayValidate);
    inputMonthValidate = inputMonth.parentElement.parentElement;
    verificarInputs(inputMonthValidate);
    inputYearValidate = inputYear.parentElement.parentElement;
    verificarInputs(inputYearValidate);
}

// Desahabilitar la opcion de pegar
desactivarPegar();
function desactivarPegar() {
    inputDay.onpaste = function(e) {
        e.preventDefault();
    }
    inputMonth.onpaste = function(e) {
        e.preventDefault();
    }
    inputYear.onpaste = function(e) {
        e.preventDefault();
    }
}

// Validacion de inputs
function validacionInputs() {

    // Respuesta si hay errores
    let respuesta = false;

    // Valores de los inputs
    let validarDay = inputDay.value;
    let validarMonth = inputMonth.value;
    let validarYear = inputYear.value;

    // Fecha Actual para validar
    let fechaActual = new Date().getFullYear();

    // Maximo dias por mes (para validar el numero maximo de dias para ingresar por mes y de acuerdo a cada año)
    let maxDiasPorMes = daysInMonth(validarMonth, validarYear);

    // Verificamos si los valores que ingresa el usuario son numeros
    function verificarValor(valor,tipo) {
        // Arreglo para verificar valor
        let datoIngresado = valor;

        if(tipo == 'day' || tipo == 'month') {
            const datos = [];
            datos.push(datoIngresado.substring(0,1));
            datos.push(datoIngresado.substring(1,2));
            let primerValor = datos[0].charCodeAt();
            let segundoValor = datos[1].charCodeAt();
    
            if(primerValor < 48 || primerValor > 57 || segundoValor < 48 || segundoValor > 57) {
                return false;
            }
        } else {
            const datos = [];
            datos.push(datoIngresado.substring(0,1));
            datos.push(datoIngresado.substring(1,2));
            datos.push(datoIngresado.substring(2,3));
            datos.push(datoIngresado.substring(3,4));
            let primerValor = datos[0].charCodeAt();
            let segundoValor = datos[1].charCodeAt();
            let tercerValor = datos[2].charCodeAt();
            let cuartoValor = datos[3].charCodeAt();
    
            if(primerValor < 48 || primerValor > 57 || segundoValor < 48 || segundoValor > 57 || tercerValor < 48 || tercerValor > 57 || cuartoValor < 48 || cuartoValor > 57) {
                return false;
            }
        }
    }

    // Day
    // Si no es un numero entero
    if(verificarValor(validarDay,'day') == false) {
        errorDiaValidacion('Incorrect format');
        respuesta = true;
    }
    // Validando si campos vacios
    if( validarDay == '' ) {
        errorDiaValidacion('This field is required');
        respuesta = true;
    }
    // Si el dia ingresado es mayor al maximo de dias por mes
    if( parseInt(validarDay) > maxDiasPorMes || parseInt(validarDay) < 1) {
        errorDiaValidacion('Must be a valid day');
        respuesta = true;
    }

    // Month
    // Si no es un número entero
    if(verificarValor(validarMonth,'month') == false) {
        errorMesValidacion('Incorrect format');
        respuesta = true;
    }
    // Validando si campos vacios
    if( validarMonth == '' ) {
        errorMesValidacion('This field is required');
        respuesta = true;
    }

    // Si el mes ingresado es mayor a 12 o menor a 1
    if( parseInt(validarMonth) < 1 || parseInt(validarMonth) > 12 ) {
        errorMesValidacion('Must be a valid month');
        respuesta = true;
    }



    // Year
    // Si no es un número entero
    if(verificarValor(validarYear,'year') == false) {
        errorYearValidacion('Incorrect format');
        respuesta = true;
    }
    // Validando si campos vacios
    if( validarYear == '' ) {
        errorYearValidacion('This field is required');
        respuesta = true;
    }

    // Error año mayor que el actual
    if ( parseInt(validarYear) > fechaActual ) {
        errorYearValidacion('Must be in the past');
        respuesta = true;
    }
    
    // Año minimo 1000
    if ( parseInt(validarYear) < 100 ) {
        errorYearValidacion('Minimun year 100');
        respuesta = true;
    }

    return respuesta;
}

// Si el usuario vuelve ingresar datos en el input con error, este se eliminara y se validara de nuevo
function verificarInputs(inputValidate) {
    if(inputValidate.classList.contains('validation-app')) {
        inputValidate.classList.remove('validation-app');
        inputValidate.lastElementChild.remove();
    }
}


// Mostrar errores y mensaje
// Error Day
function errorDiaValidacion(mensaje) {
    limpiarResultados();
    const infoDay = document.querySelector('.info__app:nth-child(1)');
    if(infoDay.classList.contains('validation-app') == false) {
        const errorDay = document.createElement('div');
        infoDay.classList.add('validation-app');
        errorDay.classList.add('info-error');
        errorDay.textContent = mensaje;
        infoDay.appendChild(errorDay);
    }
}
// Error Month
function errorMesValidacion(mensaje) {
    limpiarResultados();
    const infoMonth = document.querySelector('.info__app:nth-child(2)');
    if(infoMonth.classList.contains('validation-app') == false) {
        infoMonth.classList.add('validation-app');
        const errorMonth = document.createElement('div');
        errorMonth.classList.add('info-error');
        errorMonth.textContent = mensaje;
        infoMonth.appendChild(errorMonth);
    }
}
// Error Year
function errorYearValidacion(mensaje) {
    limpiarResultados();
    const infoYear = document.querySelector('.info__app:nth-child(3)');
    if(infoYear.classList.contains('validation-app') == false) {
        infoYear.classList.add('validation-app');
        const errorYear = document.createElement('div');
        errorYear.classList.add('info-error');
        errorYear.textContent = mensaje;
        infoYear.appendChild(errorYear);
    }
}