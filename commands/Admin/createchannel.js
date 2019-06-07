const Command = require("../../modules/Command.js")

class CreateChannel extends Command {
constructor(client) {
super(client, {
name:"createchannel", 
description:"Le bot crée un channel textuel.", 
category:"Admin", 
usage:"createchannel <nom du channel>",
permLevel:"XenoAdminPerm", 
aliases:["addchan"] 
}) 
} 

run(message, args, level) {
if(!message.member(client.user).hasPermission("MANAGE_CHANNELS")) {
      message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Je n'ai pas la permission de gérer les salons.`) 
      return;
      } else { 
if(!args || args.length < 1){
         message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie le nom de la channel textuel à créer.`)
         return;     
      } else {
       message.guild.createChannel(args.join(" "), "text")
       message.channel.send(`${this.client.emojis.find("name", "checkMark")} Channel textuel: **${args.join(" ")}** créée avec succès !`)
        
      }
} 

} 
}

module.exports = CreateChannel;