const Command = require("../../modules/Command.js")

class Ban extends Command {
constructor (client) {
super(client, {
name:"ban",
FRdescription:"Pour bannir un membre du serveur.",
ENdescription:"To bannish a member of the server.",
category:"Admin", 
usage:"ban <@mention> [reason]", 
permLevel:"XenoAdminPerm",
cooldown:5,
permissions:["BAN_MEMBERS", "USE_EXTERNAL_EMOJIS"]
})
} 


run(message, args, level, con, lang) {

const check = this.client.findEmoteByName("checkMark");

const wrong = this.client.findEmoteByName("wrongMark");

const mention = message.mentions.members.first();
	   		
var no_user = this.client.toWrongMark(lang.ban.no_user) 

var ban_yourself = this.client.toWrongMark(lang.ban.ban_yourself) 

var waiting = this.client.toTyping(lang.ban.waiting) 

var waiting_author = this.client.toValues(waiting, "{author}", message.author)

var no_perm = this.client.toWrongMark(lang.ban.no_perm) 

var cancelled = this.client.toWrongMark(lang.ban.cancelled) 

var ban_emote = this.client.toCheckMark(lang.ban.message) 
			   			
if(!mention) return message.channel.send(no_user) 

if(mention.user.id == message.author.id) return message.channel.send(ban_yourself) 

var no_perm_msg = this.client.toValues(no_perm, "{usertag}", mention.user.tag)

var ban_msg = this.client.toValues(ban_emote, "{usertag}", mention.user.tag)

if(!mention.bannable) return message.channel.send(no_perm_msg); 

var cancel = this.client.toValues(cancelled, "{user}", mention)

var waiting_msg = this.client.toValues(waiting_author, "{user}", mention.user.username)

var dm = this.client.toValues(lang.ban.dm, "{server}", message.guild.name)

var dm_msg = this.client.toValues(dm, "{reason}", !args[1] ? lang.ban.no_reason : args.slice(1).join(" ")) 
	   	
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

message.guild.ban(mention.user.id, {days: 7, reason:`${lang.ban.audits_logs_reason} ${!args[1] ? lang.ban.no_reason : args.slice(1).join(" ")}`})

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
