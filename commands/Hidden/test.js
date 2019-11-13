const lib = require('lib');
const pokefusion = lib.Hademar.pokefusion['@0.0.1'];

const Command = require("../../modules/Command.js")

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

let result = await pokefusion();

message.channel.send({embed:{
color:Math.floor(Math.random()* 16777214) + 1,
title:`Fusion (${result.name})`,
image:{
url:`${result.imageUrl}`
},
timestamp: new Date(), 
footer:{
icon_url:this.client.user.avatarURL,
text:"© Pokefusion | Xenova | Propulsé par l'api pokemon.alexonsager" 
} 
}})

} 
}

module.exports = Pokefusion;
