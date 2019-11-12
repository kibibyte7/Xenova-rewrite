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

let browser = await puppeteer.launch({
ignoreDefaultArgs: ['--disable-extensions'],
})

pokefusion.getRandomFusion(browser).then(res => {
console.log(res)
});

} 
}

module.exports = Pokefusion;
