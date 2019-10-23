var sm = require('string-similarity')

const Command = require("../../modules/Command.js");

class Welcome_msg extends Command {
  constructor(client) {
    super(client, {
      name: "welcome_msg",
      FRdescription: "Définir un message de bienvenue.",
      ENdescription: "Set a message for welcome.", 
      category:"Admin", 
      FRusage: "welcome_msg <texte>",
      ENusage: "welcome_msg <text>", 
      permLevel:"XenoAdminPerm",
      cooldown: 5,
      aliases:["wmsg"] 
    });
  }

  run(message, args, level, con) {
  
      if(args.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Entre un message de bienvenue\n**NOTE:** Voici quelques paramètres pour le message de bienvenue:\n\`{server}\` pour le nom du serveur.\n\`{user}\` pour le nouvel utilisateur.\n\`{membercount}\` pour le nombre de personnes sur le serveur.`) 
    
      	con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}`, (err, rows) => {
      	
      	if(rows.length == 0){
      		
      	message.channel.send(`${this.client.emojis.find("name", "wrongMark")} fais d'abord les paramètres pour les channels.`) 
      
      return;
      	
      	}
      	
      	con.query(`UPDATE settings SET welcome_msg  = "${args.join(" ")}" WHERE guild_id = ${message.guild.id}`) 
      	
      	message.channel.send("Le message de bienvenue est désormais : **" + args.join(" ") +"**")
            
      	}) 
      	
}	

}

module.exports = Welcome_msg;
