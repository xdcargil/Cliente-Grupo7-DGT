"use strict";
var oDGT = new DGT();


function altaConductor() {

    let sNif = frmAltaConductor.txtNIF.value.trim();
    let sNombre = frmAltaConductor.txtNombre.value.trim();
    let sApellido = frmAltaConductor.txtApellidos.value.trim();
    let sDireccion = frmAltaConductor.txtDireccion.value.trim();
    let dFechaCarnet = frmAltaConductor.dFechaCarnet.value.trim();


    let oNuevoConductor = new Conductor(sNif, sNombre, sApellido, sDireccion, dFechaCarnet);
    oDGT.altaConductor(oNuevoConductor);

    $('#altaConductorModal').modal('hide'); //Esta función cierra el modal.
}

function altaGuardiaCivil() {
    alert("hola Guardia Civil");
    let sNif = frmAltaGuardiaCivil.txtNIF.value;
    let sNombre = frmAltaGuardiaCivil.txtNombre.value;
    let sApellido = frmAltaGuardiaCivil.txtApellidos.value;
    let sDireccion = frmAltaGuardiaCivil.txtDireccion.value;
    let sPuesto = frmAltaGuardiaCivil.txtPuesto.value;



    $('#altaGuardiaCivilModal').modal('hide'); //Esta función cierra el modal.
}