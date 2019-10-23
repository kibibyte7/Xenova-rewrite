const flip_text = require ("flip-text") 

const Command = require("../../modules/Command.js")

class Flip extends Command {
constructor(client) {
super(client, {
name:"flip", 
FRdescription:"Ton texte a la tête à l'envers.", 
ENdescription:"Your text has its head upside down.",
category:"Fun",
FRusage:"flip <texte>", 
ENusage:"flip <text>" 
})
} 

run(message, args, level) {

  if(!args[0] || args.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie un texte à flip.`) 
  let flip_text = flip(args.join(" "))
  message.channel.send(`${this.client.emojis.find("name", "checkMark")} flip_text`)

} 

}

module.exports = Flip;
