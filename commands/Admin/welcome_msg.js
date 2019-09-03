var sm = require('string-similarity')

const Command = require("../../modules/Command.js");

class Welcome_msg extends Command {
  constructor(client) {
    super(client, {
      name: "welcome_msg",
      description: "Définir un message de bienvenue.",
      category:"Admin", 
      usage: "welcome_msg <channel>", 
      permLevel:"XenoAdminPerm", 
      aliases:["wmsg"] 
    });
  }

  run(message, args, level, con) {
  
      if(args.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Entre un message de bienvenue\n**NOTE:** Voici quelques paramètres pour le message de bienvenue:\n\`{server}\` pour le nom du serveur.\n\`{user}\` pour le nouvel utilisateur.\n\`{membercount}\` pour le nombte de personnes sur oe serveur.`) 
    
      	con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}`, (err, rows) => {
      	
      	if(rows.length == 0){
      		
      	message.channel.send(`${this.client.emojis.find("name", "wrongMark")} fais d'abord les paramètres pour les channels.`) 
      
      return;
      	
      	}
      	
      	con.query(`UPDATE settings SET welcome_msg  = "${args.join(" ")}" WHERE guild_id = ${message.guild.id}`) 
      	
      	message.channel.send("Le channel de bienvenue est désormais : **" + args.join(" ") +"**")
            
      	}) 
      	
}	

}

module.exports = Welcome_msg;
