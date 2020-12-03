"use strict";
var oDGT = new DGT();

/*Objetos para prueba*/
var oConductor1 = new Conductor("1", "Conductor1", "Apellido1 Apellido2", "Calle1", new Date());
var oConductor2 = new Conductor("2", "Conductor2", "Apellido1 Apellido2", "Calle2", new Date());
var oGuardia1 = new GuardiaCivil("1", "Guardia1", "Apellido1, Apellido2", "cuartel1", "puestoGuardia");
var oGuardia2 = new GuardiaCivil("3", "Guardia2", "Apellido1, Apellido2", "cuartel1", "puestoGuardia");

//var oMultaPrueba = new Multa(1, "1", "3", 25.5, "Multa de prueba weon", new Date());
var oMultaPrueba2 = new Leve(2, "1", "3", 100, "Multa leve", new Date(), true);
var oMultaPrueba3 = new Grave(3, "1", "3", 25.5, "Multa de prueba Grave weon", new Date(), 10);
var oMultaPrueba4 = new Grave(4, "2", "1", 25.5, "Multa de prueba Grave weon", new Date(), 15);

oDGT.altaConductor(oConductor1);
oDGT.altaConductor(oConductor2);
oDGT.altaGuardiaCivil(oGuardia1);
oDGT.altaGuardiaCivil(oGuardia2);
//oDGT._multas.push(oMultaPrueba);
oDGT._multas.push(oMultaPrueba2);
oDGT._multas.push(oMultaPrueba3);
oDGT._multas.push(oMultaPrueba4);


/*---------------FIN OBJETOS PRUEBA----------*/

function altaConductor() {

    let sNif = frmAltaConductor.txtNIF.value.trim();
    let sNombre = frmAltaConductor.txtNombre.value.trim();
    let sApellido = frmAltaConductor.txtApellidos.value.trim();
    let sDireccion = frmAltaConductor.txtDireccion.value.trim();
    let dFechaCarnet = new Date(frmAltaConductor.dFechaCarnet.value);

    if (sNif != "" && sNombre != "" && sApellido != "" && sDireccion.length != "" && dFechaCarnet != "Invalid Date") {

        let oNuevoConductor = new Conductor(sNif, sNombre, sApellido, sDireccion, dFechaCarnet);
        if (oDGT.altaConductor(oNuevoConductor)) {
            mostrarExito("Conductor Agregado", '#altaConductorModal');
            limpiarModal();
            $('#altaConductorModal').modal('hide'); //Esta función cierra el modal.

        } else {
            mostrarError("El conductor no se ha podido agregar", '#altaConductorModal');
        }


    } else {
        mostrarError("Rellene todos los campos", '#altaConductorModal')
    }
}

function mostrarPuntosConductor() {

    if (oDGT.PuntosConductor() != 1) {
        let div = document.getElementById("cuerpoModalListadoPuntosConductor");
        div.innerHTML = "<table id='tablaPuntosConductor'><tr><th>NIF Conductor</th><th>Puntos Conductor</th></tr><table>";
        document.getElementById("tablaPuntosConductor").innerHTML += oDGT.PuntosConductor();
    } else {
        document.getElementById("cuerpoModalListadoPuntosConductor").innerHTML = "No hay multas";
    }


}

function altaGuardiaCivil() {

    let sNif = frmAltaGuardiaCivil.txtNIF.value.trim();
    let sNombre = frmAltaGuardiaCivil.txtNombre.value.trim();
    let sApellido = frmAltaGuardiaCivil.txtApellidos.value.trim();
    let sDireccion = frmAltaGuardiaCivil.txtDireccion.value.trim();
    let sPuesto = frmAltaGuardiaCivil.txtPuesto.value.trim();

    if (sNif && sNombre && sApellido && sDireccion && sPuesto != "") {

        let oNuevoGuardiaCivil = new GuardiaCivil(sNif, sNombre, sApellido, sDireccion, sPuesto);

        if (oDGT.altaGuardiaCivil(oNuevoGuardiaCivil)) {
            mostrarExito("Guardia Agregado", '#altaGuardiaCivilModal');
            limpiarModal();
            $('#altaGuardiaCivilModal').modal('hide'); //Esta función cierra el modal.
        } else {
            mostrarError("El guardia no se ha podido agregar", '#altaGuardiaCivilModal');
        }


    } else {
        mostrarError("Rellene todos los campos", '#altaGuardiaCivilModal');
    }
}

function registrarMulta() {
    let sIdMulta = parseInt(frmRegistroMulta.txtID.value.trim());
    let sNifConductor = frmRegistroMulta.txtNIFConductor.value.trim();
    let sNifGuardia = frmRegistroMulta.txtNIFGuardiaCivil.value.trim();
    let fImporte = parseFloat(frmRegistroMulta.txtImporte.value.trim());
    let sDescripcion = frmRegistroMulta.txtDescripcion.value.trim();
    let dFechaMulta = new Date(frmRegistroMulta.txtFechaAltaMulta.value);


    if (oDGT._buscarConductor(sNifConductor) != null && oDGT._buscarGuardia(sNifGuardia) != null) {
        if ((sIdMulta != "" && fImporte != "" && sDescripcion != "" && dFechaMulta != "Invalid Date")) {
            if (sNifConductor != sNifGuardia) {
                if (frmRegistroMulta.txtPuntos.value.trim().length > 0) {
                    //alta grave
                    let iPuntos = parseInt(frmRegistroMulta.txtPuntos.value.trim());
                    if (iPuntos >= 1 && iPuntos <= 15) {

                        let oGrave = new Grave(sIdMulta, sNifConductor, sNifGuardia, fImporte, sDescripcion, dFechaMulta, iPuntos);
                        // oDGT.registrarMulta(oGrave) ? alert("Se ha registrado la multa")  : alert("No se ha podido registrar la multa");

                        if (oDGT.registrarMulta(oGrave)) {
                            mostrarExito("Se ha registrado la multa", '#registroMultaModal');
                            limpiarModal();
                            $('#registroMultaModal').modal('hide');
                        } else {
                            mostrarError("No se ha podido registrar la multa", '#registroMultaModal');
                        }


                    } else {
                        mostrarError("Error al introducir los puntos", '#registroMultaModal');
                    }

                } else {
                    //alta leve
                    let bBonificada = (frmRegistroMulta.radioBonificada.value == "s") ? true : false;
                    fImporte = bBonificada ? fImporte * 0.75 : fImporte;

                    let oLeve = new Leve(sIdMulta, sNifConductor, sNifGuardia, fImporte, sDescripcion, dFechaMulta, bBonificada);

                    // oDGT.registrarMulta(oLeve) ? alert("Se ha registrado la multa") : alert("No se ha podido registrar la multa");

                    if (oDGT.registrarMulta(oLeve)) {
                        mostrarExito("Se ha registrado la multa", '#registroMultaModal');
                        limpiarModal();
                        $('#registroMultaModal').modal('hide');
                    } else {
                        mostrarError("No se ha podido registrar la multa", '#registroMultaModal');
                    }
                }
            } else {
                mostrarError("Un guardia civil no puede multarse a sí mismo", '#registroMultaModal');
            }
        }
        else {
            mostrarError("Rellene todos los campos", '#registroMultaModal');
        }

    } else {
        mostrarError("Error al validar NIF", '#registroMultaModal');
    }





}





function pagarMulta() {

    //Recoge los valores de los formularios

    let iIDMulta = parseInt(frmPagarMulta.txtID.value.trim());
    let bPagada = frmPagarMulta.checkPagada.checked;

    //Los muestra en consola para ver que los coge bien
    console.log("id multa a pagar: " + iIDMulta);
    console.log("valor del check: " + bPagada);
    //Busca si existe la multa dentro de la array _multas del objeto oDGT
    if (oDGT.buscarMulta(iIDMulta)) {
        /*  let multaACambiar= oDGT._multas.find(multa => multa.multa == iIDMulta) */
        //Si existe, busca de nuevo y guardala en una variable
        let multaACambiar = oDGT.buscarMulta(iIDMulta);
        //Si el atributo "pagada" es igual a false, entonces haces =>
        if (multaACambiar.pagada == false) {
            //Si el checkbox "bPagada" no tiene el valor (checked==true) avisa 
            //que no ha cambiado nada porque la multa ya tenia el atributo pagada en false
            if (bPagada == false) {
                mostrarError("No se ha cambiado nada", "#pagarMultaModal");
            }
            else {
                //Si la multa tenia el atributo "pagada" en false, y el checkbox esta en true,
                //cambia el atributo "pagada" a true
                multaACambiar.pagada = bPagada;
                mostrarExito("Multa pagada", "#pagarMultaModal");
                $('#pagarMultaModal').modal('hide');
                limpiarModal();

            }
        }
        else {
            //Si el atributo "pagada" es != de false, entonces porque ya esta pagada=>
            mostrarError("La multa ya está pagada", "#pagarMultaModal");
        }
    }
    else {
        //Si la multa no existe, muestra este mensaje
        mostrarError("La multa no existe", "#pagarMultaModal");
    }


}

function mostrarMultasFecha() {
    let oFechaIni = new Date(frmListarMultPorFechas.fechaComienzoMultas.value);
    let oFechaFin = new Date(frmListarMultPorFechas.fechaFinMultas.value);
    let oAuxIntercambio = null;

    //intercambiando fechas en el caso de que el usuario introduzca las fechas al revés

    if (oFechaIni.getTime() > oFechaFin.getTime()) {
        oAuxIntercambio = oFechaIni;
        oFechaIni = oFechaFin;
        oFechaFin = oAuxIntercambio;
    }


    let sContenedorFechasMultas = oDGT.listadoMultasPorFecha(oFechaIni, oFechaFin);
    let oImprimir = document.getElementById("resultadoFechas");

    oImprimir.innerHTML = sContenedorFechasMultas;


}

function imprimirMulta() {
    let idMulta = parseInt(frmImprimirMulta.txtIdMulta.value);

    if (frmImprimirMulta.txtIdMulta.value.length > 0) {
        let resultado = oDGT.delvoverDatosMulta(idMulta);

        if (resultado) {
            resultado = "<tr><th>IDMulta</th><th>NIF Conductor</th><th>NIF Guardia</th><th>Importe</th><th>Pagada</th><th>Desripción</th><th>Fecha</th><th>Bonificada</th></tr>";
            resultado += oDGT.delvoverDatosMulta(idMulta);

            let ventanaImprimirMulta = open("plantilla.html");
            ventanaImprimirMulta.onload = function () {
                ventanaImprimirMulta.document.getElementById("tablaMulta").innerHTML = resultado;
            }
        } else {
            mostrarError("La multa no existe", "#listadoMultaModal");
        }

    } else {
        mostrarError("Rellene el campo ID", "#listadoMultaModal");
    }


}

function cerrarFechaModal(){
    let oImprimir = document.getElementById("resultadoFechas");
    oImprimir.innerHTML ="";
    limpiarModal();
}

/* MANIPULAR UI */


//Ocultamos los botones cuando puslsamos el boton de registrar multa
function ocultarLeveYGrave() {
    document.getElementById("multiCollapseRadios").style.display = "none";
    document.getElementById("multiCollapsePuntos").style.display = "none";
}

//Oculta grave y muestra leve

function btnLevePulsado() {

    document.getElementById("multiCollapseRadios").style.display = "block";
    document.getElementById("multiCollapsePuntos").style.display = "none";

}


//Oculta leve y muestra grave

function btnGravePulsado() {
    document.getElementById("multiCollapseRadios").style.display = "none";
    document.getElementById("multiCollapsePuntos").style.display = "block";

}

//Limpia los modales cuando se clickea en cerrar de cualquier modal
function limpiarModal() {
    let inputs = document.getElementsByTagName('input');
    for (let index = 0; index < inputs.length; index++) {
        if (inputs[index].type == "text") {
            inputs[index].value = "";
        }

    }
}



function mostrarError(sTexto, Modal) {

    document.getElementById("alerta").innerHTML = sTexto;
    document.getElementById("alerta").style.display = "block";
    setTimeout("ocultarError()", 2000);
    $(Modal).modal('hide');

}

function ocultarError() {
    document.getElementById("alerta").style.display = "none";
}

function mostrarExito(sTexto, Modal) {

    document.getElementById("alertaExito").innerHTML = sTexto;
    document.getElementById("alertaExito").style.display = "block";
    setTimeout("ocultarExito()", 2000);
    $(Modal).modal('hide');

}

function ocultarExito() {
    document.getElementById("alertaExito").style.display = "none";
}

//Limpia el cuerpo del modal cuando se abre, por si el usuario pulsa la x de la esquina en vez de los botones

function limpiarCuerpoModal(iDCapa) {
    document.getElementById(iDCapa).innerHTML = "";
}

/*LISTADOS*/


function mostrarSaldoConductor() {



    let sContenedorSaldoConductor = oDGT.listarSaldoConductor();
    let oImprimir = document.getElementById("cuerpoModalListadoSaldoConductor");
    oImprimir.innerHTML = sContenedorSaldoConductor;

}




function mostrarMultasGuardia() {


    let sContenedorMultasPorGuardia = oDGT.listarMultasPorGuardia();
    let oImprimir = document.getElementById("cuerpoModalListadoMultasGuardia");
    oImprimir.innerHTML = sContenedorMultasPorGuardia;


}


function mostrarListadoConductores() {

    let sContenedorConductores = oDGT.listarConductores();
    let oImprimir = document.getElementById("cuerpoModalListadoConductores");

    oImprimir.innerHTML = sContenedorConductores;
}


function mostrarListadoGuardiasCiviles() {

    let sContenedorGuardia = oDGT.listarGuardiaCivil();
    let oImprimir = document.getElementById("cuerpoModalListadoGuardiasCiviles");

    oImprimir.innerHTML = sContenedorGuardia;
}