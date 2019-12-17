const Command = require("../../modules/Command.js")

class Kick extends Command {
constructor (client) {
super(client, {
name:"kick",
category:"Modérateur", 
FRdescription:"Kick un membre du serveur.",
ENdescription:"Kick a guild member.", 
usage:"kick <@mention>",
permLevel:"XenoModPerm"
})
} 


run(message, args, level) {

const mention = message.mentions.members.first();
	   		
const check = this.client.emojis.find("name", "checkMark")

const wrong = this.client.emojis.find("name", "wrongMark")
	   			   			
if(!mention) return message.channel.send(`${wrong} Mentionne un utilisateur à kick.`) 

if(mention.user.id == message.author.id) return message.channel.send(`${wrong} Tu ne peux pas te kick toi même.`) 

if(!mention.kickable) return message.channel.send(`${wrong} Je n'ai pas la permission de kick **${mention.user.username}**.`); 
	   	
message.channel.send(`${this.client.emojis.find("name", "typing")} ${message.author} veux tu vraiment kick ${mention.user.username} ?`).then(m => {
	   	 
m.react(check)

this.client.wait(1000)

m.react(wrong)   

const filterCheck = (reaction, user) => reaction.emoji.name === "checkMark" && user.id === message.author.id;

const CheckReact = m.createReactionCollector(filterCheck) 

CheckReact.on('collect', r => {

m.edit(`${check} **${mention.user.tag}** a été kick !`)

r.remove(message.author)  

mention.user.send(`Tu as été kick du serveur: **${message.guild.name}**`) 

message.guild.kick(mention.user.id, `Expulsé par : ${message.author.tag}`)

m.clearReactions();

CheckReact.stop();
WrongReact.stop();

}, {time:10000})

const filterWrong = (reaction, user) => reaction.emoji.name === "wrongMark" && user.id === message.author.id;

const WrongReact = m.createReactionCollector(filterWrong) 

WrongReact.on('collect', r => {

m.edit(`${wrong} Le kick de **${mention.user.tag}** a été annulé.`)

m.clearReactions();

CheckReact.stop();
WrongReact.stop();

}, {time:10000}) 

})	   	  
 	   	 
} 
} 

module.exports = Kick;
