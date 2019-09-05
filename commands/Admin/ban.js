const Command = require("../../modules/Command.js")

class Ban extends Command {
constructor (client) {
super(client, {
name:"ban",
description:"Bannir un membre du serveur.",
category:"Admin", 
permLevel:"XenoAdminPerm"
})
} 


run(message, args, level, lang) {

const mention = message.mentions.members.first();
	   		
const check = this.client.emojis.find("name", "checkMark")

const wrong = this.client.emojis.find("name", "wrongMark")

const typing = this.client.emojis.find("name", "typing")

var no_user = lang.ban.no_user.replace("{wrong}", wrong)) 

var ban_yourself = lang.ban.ban_yourself.replace("{wrong}", wrong) 

var waiting lang.ban.waiting.replace("{typing}", typing) 

var waiting_author = waiting.replace("{author}", message.author)

var no_perm = lang.ban.no_perm.replace("{wrong}", wrong) 

var cancelled = lang.ban.cancelled.replace("{wrong}", wrong) 

var ban_emote = lang.ban.message.replace("{check}", check)
			   			
if(!mention) return message.channel.send(no_user) 

if(mention.user.id == message.author.id) return message.channel.send(ban_yourself) 

var no_perm_msg = no_perm.replace("{usertag}", mention.user.tag)

var ban_msg = ban_emote.replace("{usertag}", mention.user.tag)

if(!mention.bannable) return message.channel.send(no_perm_msg); 

var cancel = cancelled.replace("{user}", mention)

var waiting_msg = waiting_author.replace("{user}", mention.user.username)

var dm = lang.ban.dm.replace("{server}", message.guild.name)

var dm_msg = dm.replace("{reason}", !args[1] ? lang.ban.no_reason : args.slice(1).join(" ")) 
	   	
message.channel.send(waiting_msg).then(m => {
	   	 
m.react(check)

this.client.wait(1000)

m.react(wrong)   

const filterCheck = (reaction, user) => reaction.emoji.name === "checkMark" && user.id === message.author.id;

const CheckReact = m.createReactionCollector(filterCheck) 

CheckReact.on('collect', r => {

m.edit(ban_msg)

r.remove(message.author)  

mention.user.send(dm_msg) 

message.guild.ban(mention.user.id, {days: 7, reason:`${lang.ban.audits_log_reason} ${!args[1] ? lang.ban.no_reason : args.slice(1).join(" ")}`})

m.clearReactions();

CheckReact.stop();
WrongReact.stop();

}, {time:10000})

const filterWrong = (reaction, user) => reaction.emoji.name === "wrongMark" && user.id === message.author.id;

const WrongReact = m.createReactionCollector(filterWrong) 

WrongReact.on('collect', r => {

m.edit(cancel)

m.clearReactions();

CheckReact.stop();
WrongReact.stop();

}, {time:10000}) 

})	   	  
 	   	 
} 
} 

module.exports = Ban;
