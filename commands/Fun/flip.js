const flip_text = require ("flip-text") 

const Command = require("../../modules/Command.js")

class Flip extends Command {
constructor(client) {
super(client, {
name:"flip", 
description:"Ton texte, à l'envers.", 
category:"Fun", 
usage:"flip <texte>" 
})
} 

run(message, args, level) {

  if(!args[0] || args.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie un texte à flip.`) 
  let flip_text = flip(args.join(" "))
  message.channel.send(`${this.client.emojis.find("name", "checkMark")} flip_text`)

} 

}

module.exports = Flip;
