const Command = require("../../modules/Command.js")

class Purge extends Command {
constructor(client){
super(client, 
name:"purge",{ 
description:"Supprime des messages, par défaut 100."
permLevel:"XenoModPerm", 
usage:"purge [nombre]", 
aliases:["clear"] 
}) 
} 

run(message, args, level) {

const check = this.client.emojis.find("name", "checkMark")

      const wrong = this.client.emojis.find("name", "wrongMark")

	     let messagecount = parseInt(args[0]) ? parseInt(args[0]) : 100;
      
      message.channel.send(`${this.client.emojis.find("name", "typing")} Veux tu vraiment supprimer **${messagecount} messages**`).then(m => {
      	
      	m.react(check)
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
	     		
	     	r.remove(message.author);
	     	
	     	setTimeout(() => {
	     		
	     message.delete();
	     
      message.channel.fetchMessages({limit: messagecount})
      .then(messages => {
      let msg_array = messages.array();
      message.channel.bulkDelete(msg_array.length = messagecount)
      message.channel.send(`**${messagecount} messages** ont bien été éffacés !`).then(m =>
      	m.delete(2000))      
      }) 
      
      	}, 2000)   
      	
      	collect.stop();
     
     }else{
     	m.edit(`${wrong} Suppression des messages annulée. `) 
     	m.clearReactions()
     	collect.stop();
     	}
     	}) 
    },10000) 
   
} 
} 

module.exports = Purge;
