"use strict";

// ------------- Clase Persona  -------------
class Persona {

    constructor(sNif, sNombre, sApellidos, sDireccion) {
        this.NIF = sNif;
        this.nombre = sNombre;
        this.apellidos = sApellidos;
        this.direccion = sDireccion;
    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.NIF + "</td>";
        sFila += "<td>" + this.nombre + "</td>";
        sFila += "<td>" + this.apellidos + "</td>";
        sFila += "<td>" + this.direccion + "</td>";
        sFila += "</tr>";

        return sFila;
    }

}
// ------------- FIN Clase Persona  -------------



// -------------  Clase DGT   -------------

class DGT {
    constructor() {
        this._multas = [];
        this._personas = [];
    }

    altaConductor(oConductor) {
        let oExisteConductor = oDGT._buscarPersona(oConductor.NIF);

        if (oExisteConductor == null) {
            this._personas.push(oConductor);
            return true;
        } else {
            return false;
        }

    }

    altaGuardiaCivil(oGuardia){
        let oExisteGuardia = oDGT._buscarPersona(oGuardia.NIF);

        if (oExisteGuardia == null) {
            this._personas.push(oGuardia);
            return true;
        } else {
            return false;
        }

    }

    _buscarPersona(iNIF) {

        let oPersonaExistente = null;

        oPersonaExistente = this._personas.find(persona => persona.NIF == iNIF);

        return oPersonaExistente;
    }

    _buscarConductor(iNIF){
        let oConductorExistente = null;
        
        let oConductores=this._personas.filter(persona => persona instanceof Conductor);
        console.log(oConductores);
        console.log(iNIF);
        oConductorExistente = oConductores.find(persona => persona.NIF == iNIF );
        console.log(oConductorExistente);
        return oConductorExistente;
    }

    _buscarGuardia(iNIF){
        let oGuardiaExistente = null;
        let oGuardias=this._personas.filter(persona => persona instanceof GuardiaCivil);
        
        console.log(oGuardias);
        oGuardiaExistente = oGuardias.find(persona => persona.NIF == iNIF );

        return oGuardiaExistente;
    }

    registrarMulta(oMulta){
        let oMultaExistente=this._multas.find(oMult => oMult.multa == oMulta.multa);
        let bExito=false;

        if(oMultaExistente===undefined){
            this._multas.push(oMulta);
            bExito=true;
        }

        return bExito;
    }

    buscarMulta(iIDMulta){
        let oMulta =  null;
        oMulta= this._multas.find(multa=>multa.multa == iIDMulta);
        return oMulta;
    }

    
    delvoverDatosMulta(idMulta){
        //Este metodo sirve para delvover los datos a código y imprimir por pantalla
        let multa = oDGT.buscarMulta(idMulta);
        let resultado = "";
        if(multa!=null){
            resultado = multa.toHTMLRow();
           return resultado;
        }else{
            return false;
        }


    }

    /*Listado de Conductores*/ 
    listarConductores(){

        
        let sTabla = '<table border="1">';
        // Encabezado de la tabla
        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th><th>Nombre</th>";
        sTabla += "<th>Apellido</th></th><th>Direccion</th>";
        sTabla += "<th>Fecha Carnet</th>";
        sTabla += "</tr></thead>";
        
        let oConductorAux = this._personas.filter(persona => persona instanceof Conductor);
        
        if(oConductorAux.length > 0){
            
            for (let oP of oConductorAux) {
                sTabla += oP.toHTMLRow();
              
            }
            sTabla += "</tbody>";
            
             return sTabla;
        }
        else{
            
           return "No hay conductores";
        }
    }

    /*Listado de Guardia*/ 
    listarGuardiaCivil(){

        
        let sTabla = '<table border="1">';
        // Encabezado de la tabla
        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th><th>Nombre</th>";
        sTabla += "<th>Apellido</th></th><th>Direccion</th>";
        sTabla += "<th>Rango</th>";
        sTabla += "</tr></thead>";
        
        let oGuardiaAux = this._personas.filter(persona => persona instanceof GuardiaCivil);
        
        if(oGuardiaAux.length > 0){
            
            for (let oP of oGuardiaAux) {
                sTabla += oP.toHTMLRow();
            }
            sTabla += "</tbody>";
            
             return sTabla;
        }
        else{
            
           return "No hay Guardia civil";
        }
    }

    listarMultasPorGuardia(){

        let sTabla = '<table border="1">';
        // Encabezado de la tabla
        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th><th>Nombre</th>";
        sTabla += "<th>Apellido</th></th><th>Direccion</th>";
        sTabla += "<th>Rango</th>";
        sTabla += "<th>Número de multas</th>";
        sTabla += "</tr></thead>";
        
        let oGuardiaAux = this._personas.filter(persona => persona instanceof GuardiaCivil);
        let contadorMultas=0;
        
        //Agrega un atributo a cada guardia con un numero de multas
        for (let oG of oGuardiaAux) {
            oG.numeroMultas=0;
        }

        //Mira si la array tiene datos
        if(oGuardiaAux.length > 0){
            
            //Recorre la array de guardias
            for (let oP of oGuardiaAux) {
               /*  sTabla += oP.toHTMLRow(); */
               //Para cada nuevo guardia le pones el contador a 0
                contadorMultas=0;
                //Recorre la array multas y mira si el nif del guardia esta en el nifGuardia de la multa
                for(let oM of this._multas){
                    if(oP.NIF == oM.NIFGuardia){
                        contadorMultas++;
                        console.log(contadorMultas);
                    }
                }
                //Agrega al atributo numeroMultas el contador
                oP.numeroMultas=contadorMultas;

                let sFila = "<tr>";
                sFila += "<td>" + oP.NIF + "</td>";
                sFila += "<td>" + oP.nombre + "</td>";
                sFila += "<td>" + oP.apellidos + "</td>";
                sFila += "<td>" + oP.direccion + "</td>";
                sFila += "<td>" + oP.puesto + "</td>";
                sFila += "<td>" + oP.numeroMultas + "</td>";     
                sFila += "</tr>";
                sTabla+=sFila;

            }
            console.log(oGuardiaAux);
            sTabla += "</tbody>";
            
             return sTabla;
        }
        else{
            
           return "No hay Guardia civil";
        }
    }

}

// ------------- FIN Clase DGT   -------------

// ------------- Clase Conductor hereda de PERSONA  -------------
class Conductor extends Persona { //Clase Conductor hereda de Persona
    constructor(sNif, sNombre, sApellidos, sDireccion, dCaducidadCarnet) {
        super(sNif, sNombre, sApellidos, sDireccion);
        this.caducidadCarnet = dCaducidadCarnet;
    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.NIF + "</td>";
        sFila += "<td>" + this.nombre + "</td>";
        sFila += "<td>" + this.apellidos + "</td>";
        sFila += "<td>" + this.direccion + "</td>";
        sFila += "<td>" + this.caducidadCarnet + "</td>";

        sFila += "</tr>";

        return sFila;
    }


}
// ------------- FIN Clase Conductor hereda de PERSONA  -------------




// ------------- Clase GuardiaCivil hereda de PERSONA  -------------
class GuardiaCivil extends Persona { //Clase GuardiaCivil hereda de Persona
    constructor(sNif, sNombre, sApellidos, sDireccion, sPuesto) {
        super(sNif, sNombre, sApellidos, sDireccion);
        this.puesto = sPuesto;
    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.NIF + "</td>";
        sFila += "<td>" + this.nombre + "</td>";
        sFila += "<td>" + this.apellidos + "</td>";
        sFila += "<td>" + this.direccion + "</td>";
        sFila += "<td>" + this.puesto + "</td>";

        sFila += "</tr>";

        return sFila;
    }

}
// ------------- FIN Clase GuardiaCivil hereda de PERSONA  -------------





// ------------- Clase Multa  -------------
function Multa(idMulta, sNIFConductor, sNIFGuardia, fImporte, sDescripcion, dFecha) { //Clase Multa
    this.multa = idMulta;
    this.NIFConductor = sNIFConductor;
    this.NIFGuardia = sNIFGuardia;
    this.importe = fImporte;
    this.pagada = false;
    this.descripcion = sDescripcion;
    this.fecha = dFecha;
}

Multa.prototype.toHTMLRow = function () { //Metodo de la clase Multa
    let sFila = "<tr>";
    sFila += "<td>" + this.multa + "</td>";
    sFila += "<td>" + this.NIFConductor + "</td>";
    sFila += "<td>" + this.NIFGuardia + "</td>";
    sFila += "<td>" + this.importe + "</td>";
    sFila += "<td>" + this.pagada + "</td>";
    sFila += "<td>" + this.descripcion + "</td>";
    sFila += "<td>" + this.fecha + "</td>";

    sFila += "</tr>";

    return sFila;
}
// ------------- FIN Clase Multa  -------------


// ------------- Clase Leve hereda de MULTA  -------------
function Leve(idMulta, sNIFConductor, sNIFGuardia, dImporte, sDescripcion, dFecha, bBonificada) { //Clase leve hereda de Multa
    Multa.call(this, idMulta, sNIFConductor, sNIFGuardia, dImporte, sDescripcion, dFecha);
    this.bonificada = bBonificada;

};

Leve.prototype = Object.create(Multa.prototype);
Leve.prototype.constructor = Leve;

Leve.prototype.toHTMLRow = function () {

    let sFila = "<tr>";
    sFila += "<td>" + this.multa + "</td>";
    sFila += "<td>" + this.NIFConductor + "</td>";
    sFila += "<td>" + this.NIFGuardia + "</td>";
    sFila += "<td>" + this.importe + "</td>";
    sFila += "<td>" + this.pagada + "</td>";
    sFila += "<td>" + this.descripcion + "</td>";
    sFila += "<td>" + this.fecha + "</td>";
    sFila += "<td>" + this.bonificada + "</td>";

    sFila += "</tr>";

    return sFila;

}
// ------------- FIN Clase Leve hereda de MULTA  -------------



// ------------- Clase Grave hereda de MULTA  -------------
function Grave(idMulta, sNIFConductor, sNIFGuardia, dImporte, sDescripcion, dFecha, iPuntos) {
    Multa.call(this, idMulta, sNIFConductor, sNIFGuardia, dImporte, sDescripcion, dFecha);
    this.puntos = iPuntos;

};

Grave.prototype = Object.create(Multa.prototype);
Grave.prototype.constructor = Grave;

Grave.prototype.toHTMLRow = function () {

    let sFila = "<tr>";
    sFila += "<td>" + this.multa + "</td>";
    sFila += "<td>" + this.NIFConductor + "</td>";
    sFila += "<td>" + this.NIFGuardia + "</td>";
    sFila += "<td>" + this.importe + "</td>";
    sFila += "<td>" + this.pagada + "</td>";
    sFila += "<td>" + this.descripcion + "</td>";
    sFila += "<td>" + this.fecha + "</td>";
    sFila += "<td>" + this.puntos + "</td>";

    sFila += "</tr>";

    return sFila;

}
// ------------- FIN Clase Grave hereda de MULTA  -------------
