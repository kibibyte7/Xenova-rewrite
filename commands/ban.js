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
	   		
const wrong = this.client.emojis.find("name", "wrongMark")
	   		
const check = this.client.emojis.find("name", "checkMark")
	   			
if(!mention) return message.channel.send(`${wrong} Mentionne un utilisateur à ban.`) 
	   	
message.channel.send(`${this.client.emojis.find("name", "typing")} ${message.author} veux tu vraiment ban ${mention.user.username} ?`).then(m => {
	   	 
m.react(check).then(m.react(wrong)) 

const filter = (reaction, user) => {user.id === message.author.id} 

const collector = m.createReactionCollector(filter, {time:10000}) 

collector.on('collect', r => {
if(r.emoji.name === check.name){
collect.stop()
console.log("reçu") 
}
}) 	   	  
})
 	   	 
} 
} 

module.exports = Ban;
