var sm = require('string-similarity')

const Command = require("../../modules/Command.js");

class Ban_msg extends Command {
  constructor(client) {
    super(client, {
      name: "ban_msg",
      FRdescription: "Définir un message pour les bannissements.",
      ENdescription: "Set a message for bans.", 
      category:"Admin", 
      FRusage: "ban_msg <texte>",
      ENusage: "ban_msg <text>", 
      permLevel:"XenoAdminPerm",
      cooldown: 5,
      aliases:["bmsg"] 
    });
  }

  run(message, args, level, con) {
  
      if(args.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Entre un message de ban\n**NOTE:** Voici quelques paramètres pour le message de départ:\n\`{server}\` pour le nom du serveur.\n\`{user}\` pour le ban de l'utilisateur SANS mention.\n\`{membercount}\` pour le nombre de personnes sur le serveur.`) 
    
      	con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}`, (err, rows) => {
      	
      	if(rows.length == 0){
      		
      	message.channel.send(`${this.client.emojis.find("name", "wrongMark")} fais d'abord les paramètres pour les channels.`) 
      
        return;
      	
      	}
      	
      	con.query(`UPDATE settings SET ban_msg  = "${args.join(" ")}" WHERE guild_id = ${message.guild.id}`) 
      	
      	message.channel.send("Le message de ban est désormais : **" + args.join(" ") +"**")
            
      	}) 
      	
}	

}

module.exports = Ban_msg;
