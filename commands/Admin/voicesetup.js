const Command = require("../../modules/Command.js");

class VoiceSetup extends Command {
  constructor(client) {
    super(client, {
      name: "voicesetup",
      description: "Le bot fait une catégorie vocal privée.",
      category:"Admin", 
      usage: "voicesetup", 
      aliases:["vs"] 
    });
  }

  run(message, args) {
  
  message.channel.send(`${this.client.emojis.find(e => e.name === "typing")} Création de la catégorie...`).then(x => x.delete(2500))
   
  message.guild.createChannel("✨Vocal privé✨", "category").then(c => {
  
  message.guild.createChannel("➕ Crée ton salon", "voice").then(chan => {chan.setParent(c.id)})
  
  }).then(x => {
  	
  message.channel.send(`${this.client.emojis.find(e => e.name === "checkMark")} Voilà, la catégorie est faite !`) 
  
  }) 

}	

}

module.exports = VoiceSetup;
