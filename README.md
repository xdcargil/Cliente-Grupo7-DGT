# Cliente-Grupo7-DGT
Proyecto DGT
URL: https://xdcargil.github.io/Cliente-Grupo7-DGT/

# Integrantes:
-Daniel Carmona Gilibert
-Bruno Rodriguez Mendoza
-Julio Vinaza Baena
-Daniel Arana Boza


# /-------INFORMACIÓN PARA CARLOS-------/
Carlos, te adjuntamos información respecto al proyecto:

# Datos de Prueba: 
-Se han introducidos algunos objetos de prueba para mayor comodidad al realizar tests.
/-ADJUNTAMOS CODIGO DE PRUEBA-/

var oDGT = new DGT();

/*Objetos para prueba*/
var oConductor1 = new Conductor("1", "Conductor1", "Apellido1 Apellido2", "Calle1", new Date("2020-10-4"));
var oConductor2 = new Conductor("2", "Conductor2", "Apellido1 Apellido2", "Calle2", new Date("2030-4-17"));
var oGuardia1 = new GuardiaCivil("1", "Guardia1", "Apellido1, Apellido2", "cuartel1", "puestoGuardia");
var oGuardia2 = new GuardiaCivil("3", "Guardia2", "Apellido1, Apellido2", "cuartel1", "puestoGuardia");

//var oMultaPrueba = new Multa(1, "1", "3", 25.5, "Multa de prueba weon", new Date());
var oMultaPrueba2 = new Leve(2, "1","3",100,"Multa leve",new Date(),true);
var oMultaPrueba3 = new Grave(3, "1", "3", 25.5, "Multa de prueba Grave weon", new Date("2020-12-3"),10);
var oMultaPrueba4 = new Grave(4, "2", "1", 25.5, "Multa de prueba Grave weon", new Date("2020-12-8"),15);

oDGT.altaConductor(oConductor1);
oDGT.altaConductor(oConductor2);
oDGT.altaGuardiaCivil(oGuardia1);
oDGT.altaGuardiaCivil(oGuardia2);
//oDGT._multas.push(oMultaPrueba);
oDGT._multas.push(oMultaPrueba2);
oDGT._multas.push(oMultaPrueba3);
oDGT._multas.push(oMultaPrueba4);


 # 2020/12/03 #
