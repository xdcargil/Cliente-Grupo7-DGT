"use strict";
var oDGT = new DGT();


function altaConductor() {

    let sNif = parseInt(frmAltaConductor.txtNIF.value.trim());
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

    let sNif = parseInt(frmAltaGuardiaCivil.txtNIF.value.trim());
    let sNombre = frmAltaGuardiaCivil.txtNombre.value.trim();
    let sApellido = frmAltaGuardiaCivil.txtApellidos.value.trim();
    let sDireccion = frmAltaGuardiaCivil.txtDireccion.value.trim();
    let sPuesto = frmAltaGuardiaCivil.txtPuesto.value.trim();


    let oNuevoGuardiaCivil = new GuardiaCivil(sNif, sNombre, sApellido, sDireccion, sPuesto);

    if (oDGT.altaGuardiaCivil(oNuevoGuardiaCivil)) {
        alert("Guardia Agregado");
    } else {
        alert("El guardia no se ha podido agregar");
    }

    $('#altaGuardiaCivilModal').modal('hide'); //Esta función cierra el modal.
}

function registrarMulta(){
    let sIdMulta = parseInt(frmRegistroMulta.txtID.value.trim());
    let sNifConductor = parseInt(frmRegistroMulta.txtNIFConductor.value.trim());
    let sNifGuardia = parseInt(frmRegistroMulta.txtNIFGuardiaCivil.value.trim());
    let fImporte = parseFloat(frmRegistroMulta.txtImporte.value.trim());
    let sDescripcion = frmRegistroMulta.txtDescripcion.value.trim();
    let dFechaMulta = new Date(frmRegistroMulta.txtFechaAltaMulta.value);
    
    if(oDGT._buscarConductor(sNifConductor)!=null && oDGT._buscarGuardia(sNifGuardia)!=null){
        if(frmRegistroMulta.txtPuntos.value.trim().length>0){
            //alta grave
            let iPuntos=parseInt(frmRegistroMulta.txtPuntos.value.trim());
            if(iPuntos>=1 && iPuntos<=15){
                
                 let oGrave=new Grave(sIdMulta,sNifConductor,sNifGuardia,fImporte,sDescripcion,dFechaMulta,iPuntos);
                 oDGT.registrarMulta(oGrave)?alert("Se ha registrado la multa"):alert("No se ha podido registrar la multa");
    
            }else{
                alert("Error al introducir los puntos");
            }
            
        }else{
            //alta leve
            let bBonificada=(frmRegistroMulta.radioBonificada.value=="s")?true:false;
            fImporte=bBonificada?fImporte*0.75:fImporte;
    
            let oLeve=new Leve(sIdMulta,sNifConductor,sNifGuardia,fImporte,sDescripcion,dFechaMulta,bBonificada);
    
            oDGT.registrarMulta(oLeve)?alert("Se ha registrado la multa"):alert("No se ha podido registrar la multa");
        }
    }else{
        alert("Error al validar algún NIF");
    }
    

    $('#registroMultaModal').modal('hide');
}

function pagarMulta() {

    //Recoge los valores de los formularios
    
    let iIDMulta = parseInt(frmPagarMulta.txtID.value.trim());
    let bPagada = frmPagarMulta.checkPagada.checked;

    //Los muestra en consola para ver que los coge bien
    console.log( "id multa a pagar: "+iIDMulta);
    console.log("valor del check: "+bPagada);
    //Busca si existe la multa dentro de la array _multas del objeto oDGT
    if(oDGT.buscarMulta(iIDMulta)){
      /*  let multaACambiar= oDGT._multas.find(multa => multa.multa == iIDMulta) */
      //Si existe, busca de nuevo y guardala en una variable
      let multaACambiar = oDGT.buscarMulta(iIDMulta);
      //Si el atributo "pagada" es igual a false, entonces haces =>
      if(multaACambiar.pagada == false){
          //Si el checkbox "bPagada" no tiene el valor (checked==true) avisa 
          //que no ha cambiado nada porque la multa ya tenia el atributo pagada en false
          if(bPagada==false){
              alert("No se ha cambiado nada");
          }
          else{
              //Si la multa tenia el atributo "pagada" en false, y el checkbox esta en true,
              //cambia el atributo "pagada" a true
            multaACambiar.pagada=bPagada;
            
          }
      }
      else{
          //Si el atributo "pagada" es != de false, entonces porque ya esta pagada=>
          alert("La multa ya está pagada");
      }
    }
    else{
        //Si la multa no existe, muestra este mensaje
        alert("La multa no existe");
    }


}