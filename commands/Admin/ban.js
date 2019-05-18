const Command = require("../../modules/Command.js")

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

if(!mention.bannable) return message.channel.send(`${wrong} Je n'ai pas la permission de ban **${mention.user.username}**.`); 
	   	
message.channel.send(`${this.client.emojis.find("name", "typing")} ${message.author} veux tu vraiment ban ${mention.user.username} ?`).then(m => {
	   	 
m.react(check)

this.client.wait(1000)

m.react(wrong)   

const filterCheck = (reaction, user) => reaction.emoji.name === "checkMark" && user.id === message.author.id;

const CheckReact = m.createReactionCollector(filterCheck) 

CheckReact.on('collect', r => {

m.edit(`${check} **${mention.user.tag}** a été ban !`)

r.remove(message.author)  

mention.user.send(`Tu as été ban du serveur: **${message.guild.name}**`) 

message.guild.ban(mention.user.id, `Banni par : ${message.author.tag}` , 7)

m.clearReactions();

CheckReact.stop();
WrongReact.stop();

}, {time:10000})

const filterWrong = (reaction, user) => reaction.emoji.name === "wrongMark" && user.id === message.author.id;

const WrongReact = m.createReactionCollector(filterWrong) 

WrongReact.on('collect', r => {

m.edit(`${wrong} Le ban de **${mention.user.tag}** a été annulé.`)

m.clearReactions();

CheckReact.stop();
WrongReact.stop();

}, {time:10000}) 

})	   	  
 	   	 
} 
} 

module.exports = Ban;
