const fs=require("fs");
const xml2js = require('xml2js');
var readlineSync = require('readline-sync');
var leerNotas = require("./leerNotas");
var insertarNota = require("./insertarNota");
var modificarNota=require("./modificarNota");


function inicio(){
    console.log("\n\n*********************************************");
    console.log("**************** NOTAS **********************");
    console.log("*********************************************");
   //se crea un menú con las opciones disponibles del programa
    const lista= ["Imprimir todas las notas","Insertar una nueva nota", "Modificar una nota", "Buscar una nota." ];
    const eleccion= readlineSync.keyInSelect(lista, "Elija una opción: ",{guide: false, cancel :'Cerrar el programa' });
    var continuar=true;
   
    switch (eleccion+1){
        case 1:
            //imprimir notas
            leerNotas.listarNotas();            
            break;
        case 2:
            //insertar nota         
            insertarNota.nuevaNota()             
            break;
        case 3:
            //modificar una nota 
            modificarNota.modificar()          
            break;
        case 4:
            //buscar una nota
            leerNotas.buscar1Nota(); 
            break;
        case 0:                
            continuar=false;
            break;                
    };   
}
inicio();



