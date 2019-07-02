const Command = require("../../modules/Command.js")

class Reset extends Command {
constructor(client){
super(client, {
name:"reset", 
description:"Dev bot uniquement, reset un joueur.", 
category:"Game", 
usage:"reset",
permLevel:"XenoOwner", 
aliases:[] 
}) 
} 

run(message, args, level, con) {

var mention = message.mentions.users.first();

if(!mention) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Mentionne ou id un utilisateur.`);
	  
con.query(`DELETE FROM inventory WHERE id = ${mention.id}`)
		 
message.channel.send(`**${mention.tag}** a été reset !`)

} 
} 

module.exports = Reset;	
