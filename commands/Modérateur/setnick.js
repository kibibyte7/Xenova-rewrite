const Command = require("../../modules/Command.js")

class Setnick extends Command {
constructor(client){
super(client, {
name :"setnick",
description :"Renome un utilisateur uniquement dans un serveur.",
usage:"setnick <surnom>",
category:"Modérateur", 
permLevel:"XenoModPerm", 
aliases:["rename"] 
})
} 

run(message, args, level) {
    
    let mention = message.mentions.users.first();
    
    if(!mention) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Mentionné un utilisateur à renommer.`);
    
    if(!args[1] || args.join(" ").length > 32) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Le surnom doit contenir entre un et 32 caractères.`) 
    
    const check = this.client.emojis.find("name", "checkMark")

    const wrong = this.client.emojis.find("name", "wrongMark")

    
   	  	message.channel.send(`${this.client.emojis.find("name","typing")} Veux tu vraiment renommer **${mention.user.username}** en : **${args.join(" ")}**?`).then(m => {
      
      m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
	     		
	     r.remove(message.author);
        
      mention.setNickname(args.join(" "))
      
      m.edit(`${check} **${mention.user.username}**: **${args.join(" ")}**`)
       
      
      m.clearReactions(); 
      m.edit(`${check} **${mention.user.username}** a été renommé en : **${args.join(" ")}**`)        
      collect.stop();
      } else {
      	m.edit(`${wrong} Changement de surnom annulé. `) 
      	m.clearReactions();
      	collect.stop();
      	} 
      	
      	}) 
        
        
      	})  
    	

}  

} 

module.exports = Setnick;
