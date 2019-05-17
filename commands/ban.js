const Command = require("../modules/Command.js")

class Ban extends Command {
constructor (client) {
super(client, {
name:"ban",
description:"Bannir un membre du serveur.",
permLevel:"XenoAdminPerm"
})
} 


run(message, args, level) {
const mention = message.mentions.members.first();
	   		
const wrong = client.emojis.find("name", "wrongMark")
	   		
const check = client.emojis.find("name", "checkMark")
	   			
if(!mention) return message.channel.send(`${wrong} Mentionne un utilisateur à ban.`) 
	   	
message.channel.send(`${client.emojis.find("name", "typing")} ${message.author} veux tu vraiment ban ${mention.user.username} ?`).then(m => {
	   	 
m.react(check)
	   	 
m.react(wrong)
	   	  
})
 	   	 
} 
} 
