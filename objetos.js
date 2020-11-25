

class Persona { 

    constructor(sNif,sNombre,sApellidos,sDireccion){
        this.NIF=sNif;
        this.nombre=sNombre;
        this.apellidos=sApellidos;
        this.direccion=sDireccion;
    }

    toHTMLRow()  {
        let sFila = "<tr>";
        sFila += "<td>" + this.NIF + "</td>";
        sFila += "<td>" + this.nombre + "</td>";
        sFila += "<td>" + this.apellidos + "</td>";
        sFila += "<td>" + this.direccion + "</td>";
        sFila += "</tr>";
    
        return sFila;
    }

}



class Conductor extends Persona { //Clase Conductor hereda de Persona
    constructor(sNif, sNombre, sApellidos, sDireccion,dCaducidadCarnet){
        super(sNif, sNombre, sApellidos, sDireccion);
        this.caducidadCarnet = dCaducidadCarnet;
    }

    toHTMLRow()  {
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



class GuardiaCivil extends Persona { //Clase GuardiaCivil hereda de Persona
    constructor(sNif, sNombre, sApellidos, sDireccion,sPuesto){
        super(sNif, sNombre, sApellidos, sDireccion);
        this.puesto = sPuesto;
    }

    toHTMLRow()  {
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