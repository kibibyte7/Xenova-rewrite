const Command = require("../../modules/Command.js") 

class Unmute extends Command {
constructor(client){
super(client, {
name :"unmute",
description :"Démute un utilisateur.",
usage:"unmute <@mention>",
category:"Modérateur", 
permLevel:"XenoModPerm"
})
} 
		
run(message, args, level) {

var mention = message.mentions.members.first(); 
    
const check = this.client.emojis.find("name", "checkMark")

const wrong = this.client.emojis.find("name", "wrongMark")

if(!mention) return message.channel.send(`${wrong} Mentionne quelqu'un.`) 

if(!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`${wrong} Je n'ai pas la permission de gérer les channels.`)

if(!message.channel.memberPermissions(mention)) return message.channel.send(`${wrong} Cet utilisateur n'est pas mute.`) 

message.channel.send(`${this.client.emojis.find("name", "typing")} Veux tu vraiment unmute **${mention.user.username}** ?`).then(m => {

m.react(check)

setTimeout(() => {m.react(wrong)},1000)

const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
var collect = m.createReactionCollector(filter)
	     
collect.on('collect', r => {
	     	
if(r.emoji.name == check.name){
	     		
r.remove(message.author);

message.guild.channels.map(c => c.overwritePermissions(mention.user.id, {
"SEND_MESSAGES":true, 
"CONNECT":true, 
"ADD_REACTIONS":true, 
})) 

m.clearReactions()

collect.stop();

m.edit(`${check} **${mention.user.username}** a été unmute !`)

} else {

m.clearReactions();

m.edit(`${wrong} Unmute de **${mention.user.username}** annulé.`) 

collect.stop();

}      

}) 

}) 

}

}

module.exports = Unmute;
