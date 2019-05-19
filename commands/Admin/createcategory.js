const Command = require("../../modules/Command.js")

class CreateCategory extends Command {
constructor(client) {
super(client, {
name:"createcategory", 
description:"Le bot crée une catégorie.", 
category:"Admin", 
usage:"createcategory <nom du channel>",
permLevel:"XenoAdminPerm", 
aliases:["addcat"] 
}) 
} 

run(message, args, level) {
if(!args || args.length < 1){
         message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie le nom de la catégorie à créer.`)
         return;
    }else{
      if(!message.member(client.user).hasPermission("MANAGE_CHANNELS")) {
      message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Je n'ai pas la permission de gérer les salons.`) 
      return;
      } else {
       message.guild.createChannel(args.join(" "), "category")
       message.channel.send(`${this.client.emojis.find("name", "checkMark")} Catégorie: **${args.join(" ")}** créée avec succès !`)
        
      }
} 

} 
}

module.exports = CreateCategory
