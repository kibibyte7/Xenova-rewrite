var sm = require('string-similarity')

const Command = require("../../modules/Command.js");

class Autorole extends Command {
  constructor(client) {
    super(client, {
      name: "autorole",
      description:"Define an automatic role for bot and users.",
      category:"Admin", 
      usage: "autorole user/bot <rôle>", 
      aliases:[] 
    });
  }

  run(message, args, level, lang, con) {
  
  var no_args = lang.autorole.no_args.replace("{wrong}", this.client.emojis.find(e => e.name === "wrongMark")) 
  
  var user = lang.autorole.user.replace("{check}", this.client.emojis.find(e => e.name === "checkMark")) 
  
  var bot = lang.autorole.bot.replace("{check}", this.client.emojis.find(e => e.name === "checkMark")) 
  
  if(args.length == 0) return message.channel.send(no_args) 
  
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
      	
        var user_msg = user.replace("{userrole}", cible) 

      	message.channel.send(user_msg)
            
      	}) 
     
      	} 
      	
      	if(args[0] === "bot"){
      		
      	con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}` , (err, rows) => {
      	
      	con.query(`UPDATE settings SET bot_autorole = ${cible.id} WHERE guild_id = ${message.guild.id}`)
      	
        var bot_msg = bot.replace("{botrole}", cible) 

      	message.channel.send(bot_msg)
            
      	}) 
     
      	} 
}	

}

module.exports = Autorole;
