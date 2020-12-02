"use strict";
var oDGT = new DGT();

/*Objetos para prueba*/
var oConductor1 = new Conductor("1A", "Conductor1", "Apellido1 Apellido2", "Calle1", new Date());
var oConductor2 = new Conductor("2A", "Conductor2", "Apellido1 Apellido2", "Calle2", new Date());
var oGuardia1 = new GuardiaCivil("1B", "Guardia1", "Apellido1, Apellido2", "cuartel1", "puestoGuardia");
var oGuardia2 = new GuardiaCivil("2B", "Guardia2", "Apellido1, Apellido2", "cuartel1", "puestoGuardia");

var oMultaPrueba = new Multa(1, "1A", "1B", 25.5, "Multa de prueba weon", new Date());
var oMultaPrueba2 = new Grave(2, "1A", "1B", 25.5, "Multa de prueba weon", new Date(),10);
var oMultaPrueba3 = new Grave(3, "2A", "1B", 25.5, "Multa de prueba weon", new Date(),15);

oDGT.altaConductor(oConductor1);
oDGT.altaConductor(oConductor2);
oDGT.altaGuardiaCivil(oGuardia1);
oDGT.altaGuardiaCivil(oGuardia2);
oDGT._multas.push(oMultaPrueba);
oDGT._multas.push(oMultaPrueba2);
oDGT._multas.push(oMultaPrueba3);


/*---------------FIN OBJETOS PRUEBA----------*/

function altaConductor() {

    let sNif = frmAltaConductor.txtNIF.value.trim();
    let sNombre = frmAltaConductor.txtNombre.value.trim();
    let sApellido = frmAltaConductor.txtApellidos.value.trim();
    let sDireccion = frmAltaConductor.txtDireccion.value.trim();
    let dFechaCarnet = new Date(frmAltaConductor.dFechaCarnet.value);

    if (sNif && sNombre && sApellido && sDireccion.length && dFechaCarnet != "") {

        let oNuevoConductor = new Conductor(sNif, sNombre, sApellido, sDireccion, dFechaCarnet);
        if (oDGT.altaConductor(oNuevoConductor)) {
            alert("Conductor Agregado");
            $('#altaConductorModal').modal('hide'); //Esta función cierra el modal.

        } else {
            alert("El conductor no se ha podido agregar");
        }


    } else {
        alert("rellene todos los campos");
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
            alert("Guardia Agregado");
            $('#altaGuardiaCivilModal').modal('hide'); //Esta función cierra el modal.
        } else {
            alert("El guardia no se ha podido agregar");
        }


    } else {
        alert("rellene todos los campos");
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
        if ((sIdMulta && fImporte && sDescripcion /* && dFechaMulta*/ != "")) {
            if (frmRegistroMulta.txtPuntos.value.trim().length > 0) {
                //alta grave
                let iPuntos = parseInt(frmRegistroMulta.txtPuntos.value.trim());
                if (iPuntos >= 1 && iPuntos <= 15) {

                    let oGrave = new Grave(sIdMulta, sNifConductor, sNifGuardia, fImporte, sDescripcion, dFechaMulta, iPuntos);
                    oDGT.registrarMulta(oGrave) ? alert("Se ha registrado la multa") : alert("No se ha podido registrar la multa");

                } else {
                    alert("Error al introducir los puntos");
                }

            } else {
                //alta leve
                let bBonificada = (frmRegistroMulta.radioBonificada.value == "s") ? true : false;
                fImporte = bBonificada ? fImporte * 0.75 : fImporte;

                let oLeve = new Leve(sIdMulta, sNifConductor, sNifGuardia, fImporte, sDescripcion, dFechaMulta, bBonificada);

                oDGT.registrarMulta(oLeve) ? alert("Se ha registrado la multa") : alert("No se ha podido registrar la multa");
            }
        }
        else {
            alert("Rellene todos los campos");
        }
    } else {
        alert("Error al validar NIF");
    }


    $('#registroMultaModal').modal('hide');
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
                alert("No se ha cambiado nada");
            }
            else {
                //Si la multa tenia el atributo "pagada" en false, y el checkbox esta en true,
                //cambia el atributo "pagada" a true
                multaACambiar.pagada = bPagada;

            }
        }
        else {
            //Si el atributo "pagada" es != de false, entonces porque ya esta pagada=>
            alert("La multa ya está pagada");
        }
    }
    else {
        //Si la multa no existe, muestra este mensaje
        alert("La multa no existe");
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
    let oImprimir = document.getElementById("cuerpoModalListadoMultasFecha");

    oImprimir.innerHTML = sContenedorFechasMultas;


}

function imprimirMulta() {
    let idMulta = parseInt(frmImprimirMulta.txtIdMulta.value);
    let resultado = "<tr><th>IDMulta</th><th>NIF Conductor</th><th>NIF Guardia</th><th>Importe</th><th>Pagada</th><th>Desripción</th><th>Fecha</th><th>Bonificada</th></tr>";
    resultado += oDGT.delvoverDatosMulta(idMulta);

    if (resultado) {
        let ventanaImprimirMulta = open("plantilla.html");
        ventanaImprimirMulta.onload = function () {

            ventanaImprimirMulta.document.getElementById("tablaMulta").innerHTML = resultado;


        }




    } else {
        alert("no se a encontrado la multa");
    }

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


/*LISTADOS*/







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