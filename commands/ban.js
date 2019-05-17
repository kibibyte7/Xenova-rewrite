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
	   		
const check = this.client.emojis.find("name", "checkMark")

const wrong = this.client.emojis.find("name", "wrongMark")
	   			   			
if(!mention) return message.channel.send(`${wrong} Mentionne un utilisateur à ban.`) 
	   	
message.channel.send(`${this.client.emojis.find("name", "typing")} ${message.author} veux tu vraiment ban ${mention.user.username} ?`).then(m => {
	   	 
m.react(check)

this.client.wait(1000)

m.react(wrong)   

const filterCheck = (reaction, user) => {reaction.emoji.name === "checkMark" && user.id === message.author.id} 

const CheckReact = m.createReactionCollector(filterCheck) 

CheckReact.on('collect', r => {

console.log(r.emoji.name)
CheckReact.stop()
m.edit(`${check} **${mention.user.tag}** a été ban !`) 
console.log("reçu") 

}, {time:10000}) 	   	  
})
 	   	 
} 
} 

module.exports = Ban;
