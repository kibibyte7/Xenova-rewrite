const Command = require("../../modules/Command.js")

class CreateChannel extends Command {
constructor(client) {
super(client, {
name:"createchannel", 
FRdescription:"Créer un salon textuel.",
ENdescription:"Create a text channel.", 
category:"Admin", 
FRusage:"createchannel <nom>",
ENusage:"createchannel <name>"
cooldown: 5,
permissions:["MANAGE_CHANNELS"], 
permLevel:"XenoAdminPerm", 
aliases:["addchan"] 
}) 
} 

run(message, args, level) {
if(!message.guild.member(this.client.user).hasPermission("MANAGE_CHANNELS")) {
      message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Je n'ai pas la permission de gérer les salons.`) 
      return;
      } else { 
if(!args || args.length < 1){
         message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie le nom de la channel textuel à créer.`)
         return;     
      } else {
       message.guild.createChannel(args.join(" "), "text")
       message.channel.send(`${this.client.emojis.find("name", "checkMark")} J'ai créé le channel textuel: **${args.join(" ")}**.`)
        
      }
} 

} 
}

module.exports = CreateChannel;
