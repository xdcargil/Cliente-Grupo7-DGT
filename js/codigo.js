"use strict";
var oDGT = new DGT();


function altaConductor(){
    alert("hola Conductor");
    $('#altaConductorModal').modal('hide'); //Esta función cierra el modal.
}

function altaGuardiaCivil(){
    alert("hola Guardia Civil");
    let sNif = frmAltaGuardiaCivil.txtNIF.value;
    let sNombre = frmAltaGuardiaCivil.txtNombre.value;
    let sApellido = frmAltaGuardiaCivil.txtApellidos.value;
    let sDireccion = frmAltaGuardiaCivil.txtDireccion.value;
    let sPuesto = frmAltaGuardiaCivil.txtPuesto.value;
    alert("Datos");
    alert(sNif);
    alert(sNombre);
    alert(sPuesto);

   let oNuevoGuardiaCivil = new GuardiaCivil(sNif,sNombre,sApellido,sDireccion,sPuesto);

    alert(oNuevoGuardiaCivil);



    $('#altaGuardiaCivilModal').modal('hide'); //Esta función cierra el modal.
}