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

const filterCheck = (reaction, user) => reaction.emoji.name === "checkMark" && user.id === message.author.id;

const CheckReact = m.createReactionCollector(filterCheck) 

CheckReact.on('collect', r => {

m.edit(`${check} **${mention.user.tag}** a été ban !`)

message.guild.ban(mention.user.id, "banni par :" +message.author.tag, 7)

CheckReact.stop();

}, {time:10000}) 	   	  
})

const filterWrong = (reaction, user) => reaction.emoji.name === "wrongMark" && user.id === message.author.id;

const WrongReact = m.createReactionCollector(filterCheck) 

WrongReact.on('collect', r => {

m.edit(`${check} Le ban de **${mention.user.tag}** a été annulé.`)

WrongReact.stop();

}, {time:10000}) 	   	  
})
 	   	 
} 
} 

module.exports = Ban;
