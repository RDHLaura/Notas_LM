const fs=require("fs");
const xml2js = require('xml2js');
var readline = require('readline-sync');


function dia_hora(){
    var today = new Date();
    var dia = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    var hora = today.getHours() + ":" + today.getMinutes();
    
    return dia +" - "+ hora
}
function nuevaNota(){
    console.log("Título: ");
    let titulo_ = readline.question("-> ");
    console.log("Contenido: ");
    let contenido_ = readline.question("-> ");
    console.log("Categoria: ");
    let categoria_ = readline.question("-> ");
  
    fs.readFile("notas.xml", "utf-8", (err, data)=>{
        if(err){throw err;}
        xml2js.parseString(data, (err, result) => {
            if (err) {
                throw err;
            }
            //variable con la información de la nueva nota
            let nuevaNota={
                $:{id: parseInt(result.notas.nota.at(-1).$.id) + 1}, 
                titulo:titulo_,
                contenido: contenido_,
                fecha: dia_hora(),
                categoria: categoria_           
            };
            result.notas.nota.push(nuevaNota);

            // JSON a XML
            const builder = new xml2js.Builder();
            const nuevo_xml = builder.buildObject(result);

            //sobreescribe el xml con la información del JSON
            fs.writeFile("notas.xml", nuevo_xml, (err) => {
                if (err) {
                    throw err;
                }
                console.log("\nNota almacenada correctamente.\n");
                
            });
    });
});
  
}
module.exports.nuevaNota = nuevaNota;
module.exports.dia_hora = dia_hora;


