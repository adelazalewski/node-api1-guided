// const name = process.argv[2] || "World";
// console.log(`Hello ${name}`);
const fs = require("fs");
//create a alphabet folder at the current location
fs.mkdirSync("alphabet");
//create a folder for each letter of the alphabet inside the folder crated above
for (let i = 0; i<=25; i++) {
    const letter = String.fromCharCode(i + 97);
    //97 is the caracther code for A
    //create a folder for the current letter
    fs.mkdirSync(`alphabet/${letter}`)
}