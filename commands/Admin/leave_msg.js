var sm = require('string-similarity')

const Command = require("../../modules/Command.js");

class Leave_msg extends Command {
  constructor(client) {
    super(client, {
      name: "leave_msg",
      description: "Définir un message de départ.",
      category:"Admin", 
      usage: "leave_msg <texte>", 
      permLevel:"XenoAdminPerm", 
      aliases:["lmsg"] 
    });
  }

  run(message, args, level, con) {
  
      if(args.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Entre un message de départ\n**NOTE:** Voici quelques paramètres pour le message de départ:\n\`{server}\` pour le nom du serveur.\n\`{user}\` pour le départ utilisateur SANS mention.\n\`{membercount}\` pour le nombte de personnes sur le serveur.`) 
    
      	con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}`, (err, rows) => {
      	
      	if(rows.length == 0){
      		
      	message.channel.send(`${this.client.emojis.find("name", "wrongMark")} fais d'abord les paramètres pour les channels.`) 
      
        return;
      	
      	}
      	
      	con.query(`UPDATE settings SET leave_msg  = "${args.join(" ")}" WHERE guild_id = ${message.guild.id}`) 
      	
      	message.channel.send("Le message des départs est désormais : **" + args.join(" ") +"**")
            
      	}) 
      	
}	

}

module.exports = Leave_msg;
