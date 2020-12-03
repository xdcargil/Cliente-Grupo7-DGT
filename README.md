# Cliente-Grupo7-DGT
Proyecto DGT
URL: https://xdcargil.github.io/Cliente-Grupo7-DGT/

## Integrantes:
-Daniel Carmona Gilibert <br>
-Bruno Rodriguez Mendoza <br>
-Julio Vinaza Baena <br>
-Daniel Arana Boza <br>


## /-------INFORMACIÓN PARA CARLOS-------/
Carlos, te adjuntamos información respecto al proyecto:

## Datos de Prueba: 
-Se han introducidos algunos objetos de prueba para mayor comodidad al realizar tests. <br>
/-ADJUNTAMOS CODIGO DE PRUEBA-/ <br>
//Los datos ya están introducidos, esto solo señala cuales son las líneas que los representan <br>

var oDGT = new DGT(); <br>

/*Objetos para prueba*/ <br>
var oConductor1 = new Conductor("1", "Conductor1", "Apellido1 Apellido2", "Calle1", new Date("2020-10-4")); <br>
var oConductor2 = new Conductor("2", "Conductor2", "Apellido1 Apellido2", "Calle2", new Date("2030-4-17")); <br>
var oGuardia1 = new GuardiaCivil("1", "Guardia1", "Apellido1, Apellido2", "cuartel1", "puestoGuardia"); <br>
var oGuardia2 = new GuardiaCivil("3", "Guardia2", "Apellido1, Apellido2", "cuartel1", "puestoGuardia");<br>

//var oMultaPrueba = new Multa(1, "1", "3", 25.5, "Multa de prueba weon", new Date()); <br>
var oMultaPrueba2 = new Leve(2, "1","3",100,"Multa leve",new Date(),true); <br>
var oMultaPrueba3 = new Grave(3, "1", "3", 25.5, "Multa de prueba Grave weon", new Date("2020-12-3"),10); <br>
var oMultaPrueba4 = new Grave(4, "2", "1", 25.5, "Multa de prueba Grave weon", new Date("2020-12-8"),15); <br>

oDGT.altaConductor(oConductor1); <br>
oDGT.altaConductor(oConductor2); <br>
oDGT.altaGuardiaCivil(oGuardia1); <br>
oDGT.altaGuardiaCivil(oGuardia2); <br>
//oDGT._multas.push(oMultaPrueba); <br>
oDGT._multas.push(oMultaPrueba2); <br>
oDGT._multas.push(oMultaPrueba3); <br>
oDGT._multas.push(oMultaPrueba4); <br>


 # 2020/12/03 #
