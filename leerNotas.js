const fs=require("fs");
const xml2js = require('xml2js');
const readline = require('readline-sync');


//leer las notas
function listarNotas(){
    var parser =new xml2js.Parser({attrkey:"nota"});
    fs.readFile('notas.xml', "utf-8",(err,data) => {
        if(err){
            throw err;
        }
        parser.parseString(data, (err, result) => {
            if (err) {
                throw err;
            }
    
            result.notas.nota.forEach((elemento) =>{
                console.log("-----");
                imprimirNodo(elemento);
            });
        });
    });
}

function buscar1Nota(){
    let opciones = ["ID","Título", "Contenido"];
    console.log("\nBuscar por: ");
    eleccion = readline.keyInSelect( opciones, '-> ',{ guide: false, cancel: false });
    busqueda = readline.question(`${opciones[eleccion]}-> ` );
    var existe=false;


    var parser =new xml2js.Parser({attrkey:"nota"});
    fs.readFile('notas.xml', "utf-8",(err,data) => {
        if(err){
            throw err;
        }
        parser.parseString(data, (err, result) => {
            if (err) {
                throw err;
            }
            
            result.notas.nota.forEach((elemento) =>{
                switch(eleccion+1){
                    case 1:
                        if(elemento.$.id==busqueda){
                            imprimirNodo(elemento);
                            existe=true;                    
                        }
                    case 2: 
                        if( JSON.stringify(elemento.titulo).toUpperCase().indexOf(busqueda.toUpperCase())!==-1){
                            imprimirNodo(elemento);
                            existe=true;
                        }
                    case 3:
                        if( JSON.stringify(elemento.contenido).toUpperCase().indexOf(busqueda.toUpperCase())!==-1){
                            imprimirNodo(elemento);
                            existe=true;
                        }
                }
                 
            });
            if(existe==false){console.log(`No se ha encontrado ninguna nota con ese ${opciones[eleccion]}.`)}
        
        });
    });

}
function imprimirNodo(nodo){ 
    console.log(`Título: ${nodo.titulo} (id: ${nodo.nota.id}).`);
    console.log(`Fecha: ${nodo.fecha}`);
    console.log(`Categoria: ${nodo.categoria}`);
    console.log(`Contenido: ${nodo.contenido}\n`);
}

module.exports.buscar1Nota = buscar1Nota;
module.exports.listarNotas = listarNotas;
