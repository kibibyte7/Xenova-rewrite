const Command = require("../../modules/Command.js")

class Mute extends Command {
constructor(client){
super(client, {
name :"mute",
FRdescription :"Empêche un utilisateur de parler temporairement.",
Endescription:"Prevents a user from speaking temporarily.", 
usage:"mute <@mention> 1s | 18m | 24h",
permissions:["MANAGE_ROLES", "MANAGE_CHANNELS", "MANAGES_MESSAGES", "USE_EXTERNAL_EMOJIS"],
cooldown:3,
guildOnly:true,
category:"Modérateur", 
permLevel:"XenoModPerm"
})
} 

run(message, args, level) {

    var mention = message.mentions.members.first(); 
    
    const check = this.client.emojis.cache.find(e => e.name === "checkMark")

    const wrong = this.client.emojis.cache.find(e => e.name === "wrongMark")

    let unity;

    let multiplicateur;

    let role = message.guild.roles.cache.find(r => r.name === "XenoMute")
    
    if(!role){

    var muteRole = message.guild.roles.create({data:{name:"XenoMute", color:0x010101, permissions:["VIEW_CHANNEL"]}})

    message.guild.channels.cache.map(c => c.updateOverwrite(muteRole.id, { SEND_MESSAGES:false, STREAM:false, CONNECT:false, ADD_REACTION:false}))

    return message.channel.send(`${this.client.emojis.cache.find(e => e.name === "checkMark")} J'ai créé le rôle \`${muteRole.name}\` pour toi car il était inexistant dans la guilde.`)
    
    }
    
    if(!mention || isNaN(args[1].substr(0, args[1].length-1))) return message.channel.send(`${wrong} Utilise la commande comme ceci : **${this.client.config.defaultSettings.prefix}${this.client.commands.get("mute").help.usage}**`);


    if(args[1].includes("s")) console.log("Secondes")
    else if(args[1].endsWith("m")) console.log("Minutes")
    else if(args[1].endsWith("h")) console.log("Heures")
    else return message.channel.send(`${wrong} Entre une unitée de temps.`)
      
      if(args[1].endsWith("s")) unity = "secondes"
      else if(args[1].endsWith("m")) unity = "minutes"
      else if(args[1].endsWith("h")) unity = "heures"

      if(args[1].endsWith("s")) multiplicateur = 1000
      else if(args[1].endsWith("m")) multiplicateur = 60000
      else if(args[1].endsWith("h")) multiplicateur = 3600000
      
      message.channel.send(`${this.client.emojis.cache.find(e => e.name ==="typing")} Veux tu vraiment mute **${mention.user.username}** pour une durée de **${parseInt(args[1].substr(0, args[1].length-1))} ${unity}** ?`).then(m => {
      
      m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     if(r.emoji.name == check.name){
	     		
	     r.users.remove(message.author);

       mention.roles.add(role);
      
      setTimeout(() => {        

      mention.roles.remove(role.id);
       
      }, parseInt(args[1].substr(0, args[1].length-1))*multiplicateur);
      
      m.reactions.removeAll(); 
      m.edit(`${check} **${mention.user.username}** a été mute pour une durée de : **${parseInt(args[1].substr(0, args[1].length-1))} ${unity}**`)        
      collect.stop();
      } else {
      	m.edit(`${wrong} mute annulé. `) 
      	m.reactions.removeAll();
      	collect.stop();
      	} 
      	
      	}) 
        
        
      	})
        
      	


}  

}

module.exports = Mute;
