const Command = require("../../modules/Command.js")

class Lockdown extends Command {
constructor(client){
super(client, {
name :"lockdown",
FRdescription :"Empêche les utilisateurs de parler temporairement dans le channel.",
ENdescription:"Prevents users from talking temporarily in the channel.", 
usage:"lockdown 2s | 2min | 2h",
category:"Modérateur",
cooldown:3,
permissions:["SEND_MESSAGES", "USE_EXTERNAL_EOMJIS", "MANAGE_CHANNELS"],
permLevel:"XenoModPerm", 
aliases:["lock"] 
})
} 

run(message, args, level) {

var mention = message.mentions.members.first(); 
    
    const check = this.client.emojis.cache.find(e => e.name === "checkMark")

    const wrong = this.client.emojis.cache.find(e => e.name === "wrongMark")

    if(isNaN(args[0].substr(0, args[0].length-1))) return message.channel.send(`${wrong} Utilise la commande comme ceci : **${this.client.config.defaultSettings.prefix}${this.client.commands.get("mute").help.usage}**`);
      
    if(args[0].endsWith("s") || args[0].endsWith("m") || args[0].endsWith("h")) {

    let unity;
    let multiplicateur;
    
    if(args[0].endsWith("s")) unity = "secondes" 
    else if(args[0].endsWith("m")) unity = "minutes"
    else if (args[0].endsWith("h")) unity = "heures"

    if(args[0].endsWith("s")) multiplicateur = 1000
    else if(args[0].endsWith("m")) multiplicateur = 6000
    else if (args[0].endsWith("h")) multiplicateur = 36000
    
    message.channel.send(`${this.client.emojis.cache.find(e => e.name === "typing")} Veux tu vraiment bloquer le channel **${message.channel.name}** pour une durée de **${parseInt(args[0].substr(0, args[0].length-1))} ${unity}** ?`).then(m => {
      
      m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
        
      message.channel.updateOverwrite(message.guild.roles.everyone, {SEND_MESSAGES:false}, {CONNECT:false})
      
      m.edit(`${check} Salon bloqué pour une durée de : **${parseInt(args[0].substr(0, args[0].length-1))} ${unity}`)
       
      setTimeout(() => {        
      message.channel.updateOverwrite(message.guild.roles.everyone, {
      "SEND_MESSAGES":null, 
      "CONNECT":null, 
      })   
      message.channel.send(`${check} Salon débloqué.`) 
    }, parseInt(args[0].substr(0, args[0].length-1))*multiplicateur);
      
      m.reactions.removeAll(); 
      m.edit(`${check} **${message.channel.name}** a été bloqué pour une durée de : **${parseInt(args[0].substr(0, args[0].length-1))} ${unity}**`)        
      collect.stop();
			
      } else {
      	m.edit(`${wrong} lockdown annulé.`) 
      	m.reactions.removeAll();
      	collect.stop();
      	} 
      	
      	}) 
        
      	}) 
      	
    	  } 	

}

}

module.exports = Lockdown;
