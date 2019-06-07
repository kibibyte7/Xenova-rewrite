const Command = require("../../modules/Command.js")

class Mute extends Command {
constructor(client){
super(client, {
name :"mute",
description :"Empêche un utilisateur de parler temporairement.",
usage:"mute <@mention> <nombre> <min/h>",
category:"Modérateur", 
permLevel:"XenoModPerm"
})
} 

run(message, args, level) {

var mention = message.mentions.members.first(); 
    
    const check = this.client.emojis.find("name", "checkMark")

    const wrong = this.client.emojis.find("name", "wrongMark")

    if(!mention || isNaN(args[1]) || !args[2]){
      
      message.channel.send(`${wrong} Utilise la commande comme ceci : **${this.client.config.defaultSettings.prefix}${this.client.commands.get("mute").help.usage}**`);
      
      return;
      
    }else{
      if(args[2] == "min") {
      message.channel.send(`${this.client.emojis.find("name","typing")} Veux tu vraiment mute **${mention.user.username}** pour une durée de **${parseInt(args[1])} ${parseInt(args[1]) == 1 ? "minute" : "minutes"}** ?`).then(m => {
      
      m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
	     		
	     r.remove(message.author);
        
      message.guild.channels.map(c => c.overwritePermissions(mention.user.id, {
      "SEND_MESSAGES":false, 
      "CONNECT":false, 
      "ADD_REACTIONS":false, 
      })) 
        
      setTimeout(() => {        
      message.guild.channels.map(c => c.permissionOverwrites.get(mention.user.id).delete())        
      }, parseInt(args[1])*60000);
      
      m.clearReactions(); 
      m.edit(`${check} **${mention.user.username}** a été mute pour une durée de : **${parseInt(args[1])} ${parseInt(args[1]) == 1 ? "minute" : "minutes"}**`)        
      collect.stop();
      } else {
      	m.edit(`${wrong} mute annulé. `) 
      	m.clearReactions();
      	collect.stop();
      	} 
      	
      	}) 
        
        
      	}) 
      	}
        }

        if(args[2] == "h") {
        message.channel.send(`${this.client.emojis.find("name","typing")} Veux tu vraiment mute **${mention.user.username}** pour une durée de **${parseInt(args[1])} ${parseInt(args[1]) == 1 ? "heure" : "heures"}** ?`).then(m => {
      
      m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
	     		
	     r.remove(message.author);
        
      message.guild.channels.map(c => c.overwritePermissions(mention.user.id, {
      "SEND_MESSAGES":false, 
      "CONNECT":false, 
      "ADD_REACTIONS":false, 
      })) 
        
      setTimeout(() => {        
      message.guild.channels.map(c => c.permissionOverwrites.get(mention.user.id).delete())        
      }, parseInt(args[1])*360000);
      
      m.clearReactions(); 
      m.edit(`${check} **${mention.user.username}** a été mute pour une durée de : **${parseInt(args[1])} ${parseInt(args[1]) == 1 ? "heure" : "heures"}**`)        
      collect.stop();
      } else {
      	m.edit(`${wrong} mute annulé. `) 
      	m.clearReactions();
      	collect.stop();
      	} 
      	
      	}) 
        
        
      	}) 
      	} 
        
      	


}  

} 

module.exports = Mute;
