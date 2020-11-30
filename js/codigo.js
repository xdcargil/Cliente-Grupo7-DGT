"use strict";
var oDGT = new DGT();


function altaConductor() {

    let sNif = frmAltaConductor.txtNIF.value.trim();
    let sNombre = frmAltaConductor.txtNombre.value.trim();
    let sApellido = frmAltaConductor.txtApellidos.value.trim();
    let sDireccion = frmAltaConductor.txtDireccion.value.trim();
    let dFechaCarnet = new Date(frmAltaConductor.dFechaCarnet.value);


    let oNuevoConductor = new Conductor(sNif, sNombre, sApellido, sDireccion, dFechaCarnet);
    if (oDGT.altaConductor(oNuevoConductor)) {
        alert("Conductor Agregado");
    } else {
        alert("El conductor no se ha podido agregar");
    }

    $('#altaConductorModal').modal('hide'); //Esta función cierra el modal.
}



function altaGuardiaCivil() {

    let sNif = frmAltaGuardiaCivil.txtNIF.value.trim();
    let sNombre = frmAltaGuardiaCivil.txtNombre.value.trim();
    let sApellido = frmAltaGuardiaCivil.txtApellidos.value.trim();
    let sDireccion = frmAltaGuardiaCivil.txtDireccion.value.trim();
    let sPuesto = frmAltaGuardiaCivil.txtPuesto.value.trim();


    let oNuevoGuardiaCivil = new GuardiaCivil(sNif, sNombre, sApellido, sDireccion, sPuesto);

    if (oDGT.altaConductor(oNuevoGuardiaCivil)) {
        alert("Guardia Agregado");
    } else {
        alert("El guardia no se ha podido agregar");
    }

    $('#altaGuardiaCivilModal').modal('hide'); //Esta función cierra el modal.
}