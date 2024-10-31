const fs = require('fs');

fs.copyFileSync('file1.txt', 'file2.txt');
console.log('Archivo copiado con éxito.');

fs.readFile('file1.txt', (err, data) => {
    if (!err) {
        console.log('Contenido del archivo: ' + data);
    } else {
        console.log(err);
    }
});


fs.writeFile('helloworld.txt', 'Hello World!', (err) => {
    if (err) return console.log(err);
    
    console.log('Hello World > helloworld.txt');
    
    // Leer el archivo y mostrar su contenido
    fs.readFile('helloworld.txt', (err, data) => {
        if (err) return console.log(err);
        console.log('Contenido: ' + data);
    });
});

var sh = import("superheroes");

var mySHname = sh.random();

console.log("Fear not! Here is " + mySHname);

var sh =import("superheroes");

var sv = import("supervillains");

var mySHname = sh.random();

var mySVname = sv.random();

console.log("- Look it is " + mySVname + " ready to do its evil deeds!\n- Who could save us!\n- Fear not! Here is " + mySHname + " to the rescue!");