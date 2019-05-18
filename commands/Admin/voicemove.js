const Command = require("../../modules/Command.js")

class VoiceMove extends Command {
constructor(client) {
super(client, {
name:"voicemove", 
description:"Move les utilisateurs dans le prochain channel.",
usage:"voicemove", 
permLevel:"XenoAdminPerm", 
aliases:["vm"] 
}) 
} 

run(message, args, level) {
	
	if(!message.member.voiceChannel) message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu n'es pas dans un channel vocal.`);
	
	if(!args[0]) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie la direction : **previous** ou **next**.`); 
	
 var voices = message.guild.channels.filter(v => v.type === "voice").array().sort((p, c) => p.position > c.position ? 1 : -1).map(vc => vc.id)

 var nextvoice = voices[message.member.voiceChannel.position+1];
 
 var previousvoice = voices[message.member.voiceChannel.position-1];
 
 if(args[0] === "next") {

 var maxmove = message.guild.channels.filter(v => v.type === "voice").size-1
 
 console.log(maxmove) 
 
 var currentvoiceposition = message.member.voiceChannel.position;
 
 if(currentvoiceposition == maxmove){
 
 message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu es déjà tout en bas, utilise **${prefix}voicemove previous** pour aller dans le channel précédent`) 
 
 return;

 }
 
 message.member.voiceChannel.members.map(c => c.setVoiceChannel(nextvoice))
	   	 	
	message.channel.send(`${this.client.emojis.find("name", "checkMark")} Je move **${message.member.voiceChannel.members.size} membres** dans **${bot.channels.get(nextvoice).name}**`) 
	
} 

 if(args[0] === "previous") {

 var currentvoiceposition = message.member.voiceChannel.position;
 
 if(currentvoiceposition == 0){
 
 message.channel.send(`${bot.emojis.find("name", "wrongMark")} Tu es déjà tout en haut, utilise **${prefix}voicemove next** pour aller dans le prochain channel. `) 
 
 return;
 
 } 
 
 message.member.voiceChannel.members.map(c => c.setVoiceChannel(previousvoice))
	   	 	
	message.channel.send(`${this.client.emojis.find("name", "checkMark")} Je move **${message.member.voiceChannel.members.size} membres** dans **${bot.channels.get(previousvoice).name}**`) 
   
	} 
	
	} 
} 

module.exports = VoiceMove;
