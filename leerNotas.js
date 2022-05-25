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
                console.log(elemento);
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
                            console.log(elemento);
                            existe=true;                    
                        }
                    case 2: 
                        if( JSON.stringify(elemento.titulo).toUpperCase().indexOf(busqueda.toUpperCase())!==-1){
                            console.log(elemento);
                            existe=true;
                        }
                    case 3:
                        if( JSON.stringify(elemento.contenido).toUpperCase().indexOf(busqueda.toUpperCase())!==-1){
                            console.log(elemento);
                            existe=true;
                        }
                }
                 
            });
            if(existe==false){console.log(`No se ha encontrado ninguna nota con ese ${opciones[eleccion]}.`)}
        
        });
    });
}


module.exports.buscar1Nota = buscar1Nota;
module.exports.listarNotas = listarNotas;
