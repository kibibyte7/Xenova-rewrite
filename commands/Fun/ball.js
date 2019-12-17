const Command = require("../../modules/Command.js")
const rn = require('random-number');

class Ball extends Command {
constructor(client) {
super(client,{
name:"ball", 
FRdescription:"Le bot répond à la question posée.", 
ENdescriprion:"The bot answer to the asked question.", 
category:"Fun", 
usage:"ball <texte>", 
aliases:["b"] 
})
} 

run(message, args, level) {
if(!args[0]) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Pose une question.\n${this.client.config.defaulrSettings.prefix}ball est-ce un test ?`)
 
const response = ["oui.","non.","peut-être que oui peut-être que non.","absoluement !","absoluement pas.","essaye encore.","concentre toi bien et demande ça plus tard.","chut c'est secret.","je ne peux pas le prédire.","je sais pas.","j'ai des sources qui disent que oui.","j'ai des sources qui disent que non.","j'ai pas d'info à donner.","redemande plus tard.","je pourrai le dire, sauf que j'ai pas envie.","définitivement oui.","pas du tout.","à coté de la plaque."]
let r = rn({
               min: 0,
               max: response.length - 1,
               integer: true
           });
       let ball = response[r];
       message.channel.send(`:gem: ${message.author}` + ` ${ball}`)      
} 
}

module.exports = Ball;
