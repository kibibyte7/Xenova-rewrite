const Command = require("../../modules/Command.js")

class CreateCategory extends Command {
constructor(client) {
super(client, {
name:"createcategory", 
FRdescription:"Créer une catégorie.",
ENdescription:"Create a category.", 
category:"Admin", 
usage:"createcategory <name>", 
cooldown: 5,
permissions:["MANAGE_CHANNELS"], 
permLevel:"XenoAdminPerm", 
aliases:["addcat"] 
}) 
} 

run(message, args, level) {
if(!args || args.length < 1) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie le nom de la catégorie à créer.`); 
         
      if(!message.guild.member(this.client.user).hasPermission("MANAGE_CHANNELS")) {
      message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Je n'ai pas la permission de gérer les salons.`) 
      return;
      } else {
      message.guild.createChannel(args.join(" "), "category")
      message.channel.send(`${this.client.emojis.find("name", "checkMark")} J'ai créé la catégorie: **${args.join(" ")}**.`)        
      } 

} 
}

module.exports = CreateCategory
