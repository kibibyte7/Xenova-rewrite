const pokefusion = require("pokefusion-api")
const Command = require("../../modules/Command.js")
const puppeteer = require("puppeteer") 
const path = require("path") 

class Pokefusion extends Command {
constructor(client){
super(client, {
name:"pokefusion", 
FRdescription:"Donne une image de Pokémon fusionné à un autre.", 
category:"Fun", 
usage:"pokefusion", 
aliases:[] 
}) 
} 

async run(message, args, level, con) {

await pokefusion.getRandomFusion(`${process.cwd()}${path.sep}.apt${path.sep}usr${path.sep}bin${path.sep}google-chrome`, {args: ['--no-sandbox', '--disable-setuid-sandbox']}).then(res => {
console.log(res)
});

} 
}

module.exports = Pokefusion;
