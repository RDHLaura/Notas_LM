const fs=require("fs");
const xml2js = require('xml2js');
const readline = require('readline-sync');
var insertarNota = require("./insertarNota");


function modificar(){
    let parser = new xml2js.Parser();
    console.log("Indique el id de la nota que desea modificar: ");
    var id_ = readline.question("-> ");

    let opciones = ["titulo","contenido", "categoria"];
    console.log("\nIndique que parte de la nota quiere modificar: ");
    var eleccion = readline.keyInSelect(opciones, '-> ',{ guide: false, cancel: false });

    let contenido = readline.question("Nuevo texto -> ");
    let notaExiste=false;


    fs.readFile("notas.xml", function(err, data){
        if(err){throw err;}

        parser.parseString(data, function(err, result){
            if(err){ throw err; }
            
            result.notas.nota.forEach(element => {                
                if(element.$.id==id_){
                    notaExiste=true;
                    element.fecha=insertarNota.dia_hora();
                    switch(eleccion+1){            
                        case 1:
                             element.titulo=contenido;
                             break;
                        case 2: 
                            element.contenido=contenido;
                            break;
                        case 3: 
                            element.categoria=contenido;
                            break;
                    }
                }
            });
            var builder = new xml2js.Builder();
            var nuevo_xml = builder.buildObject(result);
            fs.writeFile("notas.xml", nuevo_xml, function(err, data) {
            if (err) console.log(err);});
            if(notaExiste==false){
                console.log("No exite ninguna nota con ese id.")
            }
            
        });    
    } );
}
module.exports.modificar = modificar;
