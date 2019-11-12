const pokefusion = require("pokefusion-api")
const Command = require("../../modules/Command.js")
const puppeteer = require("puppeteer") 

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

const browser = await puppeteer.launch({args: ['--no-sandbox', '--disable-setuid-sandbox']});

pokefusion.getRandomFusion(browser).then(res => {
console.log(res)
});

} 
}

module.exports = Pokefusion;
