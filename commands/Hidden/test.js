const lib = require('lib');
const pokefusion = lib.danjordan.pokefusion['@2.2.0'];

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

message.channel.startTyping();

let result = await pokefusion();

message.channel.send({embed:{
color:Math.floor(Math.random()* 16777214) + 1,
title:`Fusion [${result.name}] (l'image ne s'affiche pas ? Clique ici)`,
url:`${result.imageUrl}`, 
image:{
url:`${result.imageUrl}`
},
timestamp: new Date(), 
footer:{
icon_url:this.client.user.avatarURL,
text:"© Pokefusion | Xenova | Propulsé par l'api pokemon.alexonsager" 
} 
}}).then(m => {
message.channel.stopTyping()
})

} 
}

module.exports = Pokefusion;
