"use strict";

// ------------- Clase Persona  -------------
function Persona(sNif, sNombre, sApellidos, sDireccion) {
    this.NIF = sNif;
    this.nombre = sNombre;
    this.apellidos = sApellidos;
    this.direccion = sDireccion;
}

Persona.prototype.toHTMLRow = function () {
    let sFila = "<tr>";
    sFila += "<td>" + this.NIF + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.direccion + "</td>";
    sFila += "</tr>";

    return sFila;
}


// ------------- FIN Clase Persona  -------------



// -------------  Clase DGT   -------------

class DGT {
    constructor() {
        this._multas = [];
        this._personas = [];
    }

    altaConductor(oConductor) {
        let oExisteConductor = oDGT._buscarConductor(oConductor.NIF);

        if (oExisteConductor == null) {
            this._personas.push(oConductor);
            return true;
        } else {
            return false;
        }

    }

    altaGuardiaCivil(oGuardia) {
        let oExisteGuardia = oDGT._buscarGuardia(oGuardia.NIF);

        if (oExisteGuardia == null) {
            this._personas.push(oGuardia);
            return true;
        } else {
            return false;
        }

    }

    _/* buscarPersona(iNIF) {

        let oPersonaExistente = null;

        oPersonaExistente = this._personas.find(persona => persona.NIF == iNIF);

        return oPersonaExistente;
    } */

    _buscarConductor(iNIF) {
        let oConductorExistente = null;

        let oConductores = this._personas.filter(persona => persona instanceof Conductor);
        console.log(oConductores);
        console.log(iNIF);
        oConductorExistente = oConductores.find(persona => persona.NIF == iNIF);
        console.log(oConductorExistente);
        return oConductorExistente;
    }

    _buscarGuardia(iNIF) {
        let oGuardiaExistente = null;
        let oGuardias = this._personas.filter(persona => persona instanceof GuardiaCivil);

        console.log(oGuardias);
        oGuardiaExistente = oGuardias.find(persona => persona.NIF == iNIF);

        return oGuardiaExistente;
    }

    registrarMulta(oMulta) {
        let oMultaExistente = this._multas.find(oMult => oMult.multa == oMulta.multa);
        let bExito = false;

        if (oMultaExistente === undefined) {
            this._multas.push(oMulta);
            bExito = true;
        }

        return bExito;
    }

    buscarMulta(iIDMulta) {
        let oMulta = null;
        oMulta = this._multas.find(multa => multa.multa == iIDMulta);
        return oMulta;
    }


    delvoverDatosMulta(idMulta) {
        //Este metodo sirve para delvover los datos a código y imprimir por pantalla
        let multa = oDGT.buscarMulta(idMulta);
        let resultado = "";

        if (multa != undefined) {
            resultado = multa.toHTMLRow();
            return resultado;
        } else {
            return false;
        }
    }

    PuntosConductor() {

        let aConductores = this._personas.filter(persona => persona instanceof Conductor);
        let aMultasGraves = this._multas.filter(multa => multa instanceof Grave);
        let resultadoConductor = "";
        aConductores.forEach(conductor => {
            aMultasGraves.forEach(multa => {
                if (conductor.NIF == multa.NIFConductor) {
                    resultadoConductor += "<tr>";
                    resultadoConductor += "<td>" + conductor.NIF + "</td>";
                    resultadoConductor += "<td>" + (15-multa.puntos) + "</td>";
                    resultadoConductor += "</tr>";

                }
            });
        });
        if (resultadoConductor.length > 0) {
            return resultadoConductor;
        } else {
            return 1; //1 es igual a no hay multas
        }

    }

    /*Listado de Conductores*/
    listarConductores() {



        let sTabla = '<table border="1">';
        // Encabezado de la tabla
        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th><th>Nombre</th>";
        sTabla += "<th>Apellido</th></th><th>Direccion</th>";
        sTabla += "<th>Fecha Carnet</th>";
        sTabla += "</tr></thead>";

        let oConductorAux = this._personas.filter(persona => persona instanceof Conductor);

        if (oConductorAux.length > 0) {

            for (let oP of oConductorAux) {
                sTabla += oP.toHTMLRow();

            }
            sTabla += "</tbody>";

            return sTabla;
        }
        else {

            return "No hay conductores";
        }
    }

    /*Listado de Guardia*/
    listarGuardiaCivil() {


        let sTabla = '<table border="1" id="TablaListarGuardiaCivil">';
        // Encabezado de la tabla
        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th><th>Nombre</th>";
        sTabla += "<th>Apellido</th></th><th>Direccion</th>";
        sTabla += "<th>Rango</th>";
        sTabla += "</tr></thead>";

        let oGuardiaAux = this._personas.filter(persona => persona instanceof GuardiaCivil);

        if (oGuardiaAux.length > 0) {

            for (let oP of oGuardiaAux) {
                sTabla += oP.toHTMLRow();
            }
            sTabla += "</tbody>";

            return sTabla;
        }
        else {

            return "No hay Guardia civil";
        }
    }
    
    listadoMultasPorFecha(dFechaIni, dFechaFin) {
        let oListaMultas = this._multas.filter(oMul => oMul.fecha.getTime() >= dFechaIni.getTime() && oMul.fecha.getTime() <= dFechaFin.getTime());
        let sTabla = "";

        if (oListaMultas.length > 0) {

            sTabla = '<table border="1">';

            // Encabezado de la tabla
            sTabla += "<thead><tr>";
            sTabla += "<th>ID Multa</th><th>Fecha</th>";
            sTabla += "<th>Importe</th>";
            sTabla += "</tr></thead><tbody>";

            // array de multas entre las fechas dadas

            let sumaTotal = 0;

            for (let oM of oListaMultas) {
                sTabla += oM._ListadoImporte();
                sumaTotal += oM.importe;
            }

            sTabla += `<tr><td colspan="2"> Importe total </td><td>${sumaTotal}</td></tr>`;

        } else {
            mostrarError("¡No se han encontrado multas entre ese rango de Fechas!",'#listadoMultasFecha');
        }

        sTabla += "</tbody>";

        return sTabla;
    }

    listarMultasPorGuardia() {

        let sTabla = '<table border="1">';
        // Encabezado de la tabla
        sTabla += "<thead><tr>";
        sTabla += "<th>NIF</th><th>Nombre</th>";
        sTabla += "<th>Apellido</th></th><th>Direccion</th>";
        sTabla += "<th>Rango</th>";
        sTabla += "<th>Número de multas</th>";
        sTabla += "</tr></thead>";

        let oGuardiaAux = this._personas.filter(persona => persona instanceof GuardiaCivil);
        let contadorMultas = 0;

        //Agrega un atributo a cada guardia con un numero de multas
        for (let oG of oGuardiaAux) {
            oG.numeroMultas = 0;
        }

        //Mira si la array tiene datos
        if (oGuardiaAux.length > 0) {

            //Recorre la array de guardias
            for (let oP of oGuardiaAux) {
                /*  sTabla += oP.toHTMLRow(); */
                //Para cada nuevo guardia le pones el contador a 0
                contadorMultas = 0;
                //Recorre la array multas y mira si el nif del guardia esta en el nifGuardia de la multa
                for (let oM of this._multas) {
                    if (oP.NIF == oM.NIFGuardia) {
                        contadorMultas++;
                        console.log(contadorMultas);
                    }
                }
                //Agrega al atributo numeroMultas el contador
                oP.numeroMultas = contadorMultas;

                let sFila = "<tr>";
                sFila += "<td>" + oP.NIF + "</td>";
                sFila += "<td>" + oP.nombre + "</td>";
                sFila += "<td>" + oP.apellidos + "</td>";
                sFila += "<td>" + oP.direccion + "</td>";
                sFila += "<td>" + oP.puesto + "</td>";
                sFila += "<td>" + oP.numeroMultas + "</td>";
                sFila += "</tr>";
                sTabla += sFila;

            }
            console.log(oGuardiaAux);
            sTabla += "</tbody>";

            return sTabla;
        }
        else {

            return "No hay Guardia civil";
        }
    }


    listarSaldoConductor(){

        let arrayConductores = [];
        let iImporte=0;
        let sResultado="<table id='mostrarSaldoConductor'> <th>Nombre Conductor </th> <th> Importe</th>";
        //Introduce en una array a las personas que sean conductores
        for (let oP of this._personas) {
            if (oP instanceof Conductor) {
                arrayConductores.push(oP);
            }
        }

        //Recorre la arary
        for(let oC of arrayConductores){
            //Inicializa el importe a 0 para cada conductor
            iImporte=0;
            for (let index = 0; index < this._multas.length; index++) {
               
                if (oC.NIF == this._multas[index].NIFConductor) {
                    //Si el NIF del conductor es igual al NIFConductor de la multa sumale al importe total
                    //No es necesario multiplicar por 0.25 debido a que las multas leves y modificadas ya entran con el descuento
                    //Y las graves cuentan como tal, sin cambios
                    
                    iImporte+=this._multas[index].importe;
                }
                
              
            }
            //Muestra cada conductor con su importe
            sResultado+="<tr> " + "<td>" + oC.nombre + "</td>" + "<td>" + iImporte + "</td>"  +"</tr>";
        }

        sResultado+="</table>";
        return sResultado;

    }

}

// ------------- FIN Clase DGT   -------------

// ------------- Clase Conductor hereda de PERSONA  -------------
function Conductor(sNif, sNombre, sApellidos, sDireccion, dCaducidadCarnet) { //Clase Conductor hereda de Persona
    Persona.call(this, sNif, sNombre, sApellidos, sDireccion);
    this.caducidadCarnet = dCaducidadCarnet;

}



Conductor.prototype.toHTMLRow = function () {
    let sFila = "<tr>";
    sFila += "<td>" + this.NIF + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.direccion + "</td>";
    sFila += "<td>" + `${this.caducidadCarnet.getDate()}/${this.caducidadCarnet.getMonth() + 1}/${this.caducidadCarnet.getFullYear()}` + "</td>";

    sFila += "</tr>";

    return sFila;

}


// ------------- FIN Clase Conductor hereda de PERSONA  -------------




// ------------- Clase GuardiaCivil hereda de PERSONA  -------------
function GuardiaCivil(sNif, sNombre, sApellidos, sDireccion, sPuesto) { //Clase GuardiaCivil hereda de Persona
    Persona.call(this, sNif, sNombre, sApellidos, sDireccion);
    this.puesto = sPuesto;

}

GuardiaCivil.prototype.toHTMLRow = function () {
    let sFila = "<tr>";
    sFila += "<td>" + this.NIF + "</td>";
    sFila += "<td>" + this.nombre + "</td>";
    sFila += "<td>" + this.apellidos + "</td>";
    sFila += "<td>" + this.direccion + "</td>";
    sFila += "<td>" + this.puesto + "</td>";

    sFila += "</tr>";

    return sFila;
}
// ------------- FIN Clase GuardiaCivil hereda de PERSONA  -------------



// ------------- Clase Multa  -------------

class Multa {
    constructor(idMulta, sNIFConductor, sNIFGuardia, fImporte, sDescripcion, dFecha) {
        this.multa = idMulta;
        this.NIFConductor = sNIFConductor;
        this.NIFGuardia = sNIFGuardia;
        this.importe = fImporte;
        this.pagada = false;
        this.descripcion = sDescripcion;
        this.fecha = dFecha;
    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.multa + "</td>";
        sFila += "<td>" + this.NIFConductor + "</td>";
        sFila += "<td>" + this.NIFGuardia + "</td>";
        sFila += "<td>" + this.importe + "</td>";
        sFila += "<td>" + this.pagada + "</td>";
        sFila += "<td>" + this.descripcion + "</td>";
        sFila += "<td>" + `${this.fecha.getDate()}/${this.fecha.getMonth() + 1}/${this.fecha.getFullYear()}` + "</td>";
        sFila += "</tr>";
        return sFila;
    }

    _ListadoImporte() {
        let sFila = "<tr>";
        sFila += "<td>" + this.multa + "</td>";
        sFila += "<td>" + `${this.fecha.getDate()}/${this.fecha.getMonth() + 1}/${this.fecha.getFullYear()}` + "</td>";
        sFila += "<td>" + this.importe + "</td>";
        sFila += "</tr>";

        return sFila;
    }

}

// ------------- FIN Clase Multa  -------------


// ------------- Clase Leve hereda de MULTA  -------------

class Leve extends Multa {
    constructor(idMulta, sNIFConductor, sNIFGuardia, dImporte, sDescripcion, dFecha, bBonificada) {
        super(idMulta, sNIFConductor, sNIFGuardia, dImporte, sDescripcion, dFecha)
        this.bonificada = bBonificada;

    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.multa + "</td>";
        sFila += "<td>" + this.NIFConductor + "</td>";
        sFila += "<td>" + this.NIFGuardia + "</td>";
        sFila += "<td>" + this.importe + "</td>";
        sFila += "<td>" + this.pagada ? "<td>Si</td>" : "<td>No</td>"+ "</td>";
        sFila += "<td>" + this.descripcion + "</td>";
        sFila += "<td>" + `${this.fecha.getDate()}/${this.fecha.getMonth() + 1}/${this.fecha.getFullYear()}` + "</td>";
        sFila += "<td>" + this.bonificada? "<td>Si</td>" : "<td>No</td>" + "</td>";
        sFila += "</tr>";

        return sFila;

    }


}

// ------------- FIN Clase Leve hereda de MULTA  -------------


// ------------- Clase Grave hereda de MULTA  -------------


class Grave extends Multa {
    constructor(idMulta, sNIFConductor, sNIFGuardia, dImporte, sDescripcion, dFecha, iPuntos) {
        super(idMulta, sNIFConductor, sNIFGuardia, dImporte, sDescripcion, dFecha)
        this.puntos = iPuntos;
    }

    toHTMLRow() {
        let sFila = "<tr>";
        sFila += "<td>" + this.multa + "</td>";
        sFila += "<td>" + this.NIFConductor + "</td>";
        sFila += "<td>" + this.NIFGuardia + "</td>";
        sFila += "<td>" + this.importe + "</td>";
        sFila += "<td>" + this.pagada ? "<td>Si</td>" : "<td>No</td>" + "</td>";
        sFila += "<td>" + this.descripcion + "</td>";
        sFila += "<td>" + `${this.fecha.getDate()}/${this.fecha.getMonth() + 1}/${this.fecha.getFullYear()}` + "</td>";
        sFila += "<td>" + this.puntos + "</td>";
    
        sFila += "</tr>";

        return sFila;
    }
}

// ------------- FIN Clase Grave hereda de MULTA  -------------
