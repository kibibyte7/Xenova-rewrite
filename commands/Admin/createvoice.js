const Command = require("../../modules/Command.js")

class CreateVoice extends Command {
constructor(client) {
super(client, {
name:"createvoice", 
description:"Le bot crée un channel vocal.", 
category:"Admin", 
usage:"createvoice <nom du channel>",
permLevel:"XenoAdminPerm", 
aliases:["addvoice"] 
}) 
} 

run(message, args, level) {
if(!message.guild.member(this.client.user).hasPermission("MANAGE_CHANNELS")) {
      message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Je n'ai pas la permission de gérer les salons.`) 
      return;
      } else { 
if(!args || args.length < 1){
         message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie le nom du channel vocal à créer.`)
         return;
      } else {
       message.guild.createChannel(args.join(" "), "voice")
       message.channel.send(`${this.client.emojis.find("name", "checkMark")} J'ai créé le channel vocal: **${args.join(" ")}**.`)
        
      }
} 

} 
}

module.exports = CreateVoice;
