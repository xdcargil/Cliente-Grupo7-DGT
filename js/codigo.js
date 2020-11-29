"use strict";
var oDGT = new DGT();


function altaConductor() {

    let sNif = frmAltaConductor.txtNIF.value.trim();
    let sNombre = frmAltaConductor.txtNombre.value.trim();
    let sApellido = frmAltaConductor.txtApellidos.value.trim();
    let sDireccion = frmAltaConductor.txtDireccion.value.trim();
    let dFechaCarnet = frmAltaConductor.dFechaCarnet.value.trim();


    let oNuevoConductor = new Conductor(sNif, sNombre, sApellido, sDireccion, dFechaCarnet);
    if(oDGT.altaConductor(oNuevoConductor)){
        alert("Conductor Agregado");
    }else{
        alert("El conductor no se a podido agregar");
    }

    $('#altaConductorModal').modal('hide'); //Esta función cierra el modal.
}



function altaGuardiaCivil() {
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