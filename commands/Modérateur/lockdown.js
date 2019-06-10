const Command = require("../../modules/Command.js")

class Lockdown extends Command {
constructor(client){
super(client, {
name :"lockdown",
description :"Empêche les utilisateurs de parler temporairement dans le channel.",
usage:"lockdown <nombre> <min/h>",
category:"Modérateur", 
permLevel:"XenoModPerm", 
aliases:["lock"] 
})
} 

run(message, args, level) {

var mention = message.mentions.members.first(); 
    
    const check = this.client.emojis.find("name", "checkMark")

    const wrong = this.client.emojis.find("name", "wrongMark")

    if(isNaN(args[0]) || !args[1]){
      
      message.channel.send(`${wrong} Utilise la commande comme ceci : **${this.client.config.defaultSettings.prefix}${this.client.commands.get("mute").help.usage}**`);
      
      return;
      
    }else{
    	  if(args[1] == "s") {
    	  	message.channel.send(`${this.client.emojis.find("name","typing")} Veux tu vraiment bloquer le channel **${message.channel.name}** pour une durée de **${parseInt(args[0])} ${parseInt(args[0]) == 1 ? "heure" : "heures"}** ?`).then(m => {
      
      m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
	     		
	     r.remove(message.author);
        
      message.channel.overwritePermissions(message.guild.id, {
      "SEND_MESSAGES":false, 
      "CONNECT":false, 
      })
      
      m.edit(`${check} Salon bloqué pour une durée de : **${parseInt(args[0])} ${parseInt(args[0]) == 1 ? "seconde" : "secondes"}**`)
       
      setTimeout(() => {        
      	message.channel.overwritePermissions(message.guild.id, {
      "SEND_MESSAGES":null, 
      "CONNECT":null, 
      })   
      message.channel.send(`${check} Salon débloqué.`) 
      }, parseInt(args[0])*1000);
      
      m.clearReactions(); 
      m.edit(`${check} **${message.channel.name}** a été bloqué pour une durée de : **${parseInt(args[0])} ${parseInt(args[0]) == 1 ? "seconde" : "secondes"}**`)        
      collect.stop();
      } else {
      	m.edit(`${wrong} lockdown annulé. `) 
      	m.clearReactions();
      	collect.stop();
      	} 
      	
      	}) 
        
        
      	}) 
      	
    	  } 
    	
    	
      if(args[1] == "min") {
      message.channel.send(`${this.client.emojis.find("name","typing")} Veux tu vraiment bloquer le channel **${message.channel.name}** pour une durée de **${parseInt(args[0])} ${parseInt(args[0]) == 1 ? "heure" : "heures"}** ?`).then(m => {
      
      m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
	     		
	     r.remove(message.author);
        
      message.channel.overwritePermissions(message.guild.id, {
      "SEND_MESSAGES":false, 
      "CONNECT":false, 
      }) 
      
      m.edit(`${check} Salon bloqué pour une durée de : **${parseInt(args[0])} ${parseInt(args[1]) == 1 ? "minute" : "minutes"}**`)
       
      setTimeout(() => {        
      	message.channel.overwritePermissions(message.guild.id, {
      "SEND_MESSAGES":null, 
      "CONNECT":null, 
      })   
      message.channel.send(`${check} Salon débloqué.`) 
      }, parseInt(args[0])*60000);
      
      m.clearReactions(); 
      m.edit(`${check} **${message.channel.name}** a été bloqué pour une durée de : **${parseInt(args[0])} ${parseInt(args[0]) == 1 ? "minute" : "minutes"}**`)        
      collect.stop();
      } else {
      	m.edit(`${wrong} lockdown annulé. `) 
      	m.clearReactions();
      	collect.stop();
      	} 
      	
      	}) 
        
        
      	}) 
      	      
      }

        if(args[1] == "h") {
        	
        message.channel.send(`${this.client.emojis.find("name","typing")} Veux tu vraiment bloquer le channel **${message.channel.name}** pour une durée de **${parseInt(args[0])} ${parseInt(args[0]) == 1 ? "heure" : "heures"}** ?`).then(m => {
      
      m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
	     		
	     r.remove(message.author);
        
      message.channel.overwritePermissions(message.guild.id, {
      "SEND_MESSAGES":false, 
      "CONNECT":false, 
      }) 
      
      m.edit(`${check} Salon bloqué pour une durée de : **${parseInt(args[0])} ${parseInt(args[1]) == 1 ? "heure" : "heures"}**`)
       
      setTimeout(() => {        
      	message.channel.overwritePermissions(message.guild.id, {
      "SEND_MESSAGES":null, 
      "CONNECT":null, 
      })   
      message.channel.send(`${check} Salon débloqué.`) 
      }, parseInt(args[0])*360000);
      
      m.clearReactions(); 
      m.edit(`${check} **${message.channel.name}** a été bloqué pour une durée de : **${parseInt(args[0])} ${parseInt(args[0]) == 1 ? "heure" : "heures"}**`)        
      collect.stop();
      } else {
      	m.edit(`${wrong} lockdown annulé. `) 
      	m.clearReactions();
      	collect.stop();
      	} 
      	
      	}) 
        
        
      	}) 
      	
      	} 
        
      	

}

}  

} 

module.exports = Lockdown;
