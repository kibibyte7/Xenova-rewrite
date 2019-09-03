var sm = require('string-similarity')

const Command = require("../../modules/Command.js");

class Autorole extends Command {
  constructor(client) {
    super(client, {
      name: "autorole",
      description: "Définir un rôle automate pour les bots et les utilisateurs.",
      category:"Admin", 
      usage: "autorole user/bot <rôle>", 
      aliases:[] 
    });
  }

  run(message, args, level, con) {
  
  if(args.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Entre un paramètre, tu veux \`bot\` ou \`user\` ? .`) 
  
      let roles = [];

      let indexes = [];

      message.guild.roles.forEach(function(role){

      roles.push(role.name)

      indexes.push(role.id)

      })

      let match = sm.findBestMatch(args.slice(1).join(" "), roles);

      let role_name = match.bestMatch.target;

      let Ctarget = message.guild.roles.get(indexes[roles.indexOf(role_name)])
      
      let cible = message.guild.roles.find("id", args[1]) || Ctarget;
      
      if(!cible) return message.channel.send(`Je ne trouve pas ce rôle.`) 
      	
      	if(args[0] === "user"){
      		
      	con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}`, (err, rows) => {
      	
      	con.query(`UPDATE settings SET user_autorole = ${cible.id} WHERE guild_id = ${message.guild.id}`)
      	
      	message.channel.send("Le rôle autimatique des membres humains est le rôle: " + cible)
            
      	}) 
     
      	} 
      	
      	if(args[0] === "bot"){
      		
      	con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}` , (err, rows) => {
      	
      	con.query(`UPDATE settings SET bot_autorole = ${cible.id} WHERE guild_id = ${message.guild.id}`)
      	
      	message.channel.send("Le rôle autimatique des membres bots est le rôle: " + cible)
            
      	}) 
     
      	} 
}	

}

module.exports = Autorole;
