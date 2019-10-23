const Command = require("../../modules/Command.js")

class Softban extends Command {
constructor (client) {
super(client, {
name:"softban",
FRdescription:"Cette commande équivaut à un kick et une purge de message.",
ENdescription:"This command is equivalent to a kick and a message purge.",
category:"Admin", 
FRusage:"softban <@mention> [raison]", 
ENusage:"softban <@mention> [reason]", 
permLevel:"XenoAdminPerm",
cooldown:5,
permissions:["BAN_MEMBERS", "USE_EXTERNAL_EMOJIS"]
})
} 


run(message, args, level) {

const mention = message.mentions.members.first();
	   		
const check = this.client.emojis.find("name", "checkMark")

const wrong = this.client.emojis.find("name", "wrongMark")
	   			   			
if(!mention) return message.channel.send(`${wrong} Mentionne un utilisateur à ban.`) 

if(mention.user.id == message.author.id) return message.channel.send(`${wrong} Tu ne peux pas te bannir toi même.`) 

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

message.guild.ban(mention.user.id, {days: 7, reason:`Softban par : ${message.author.tag}`})

message.guild.unban(mention.user.id, `Softban par : ${message.author.tag}`)

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

module.exports = Softban;
