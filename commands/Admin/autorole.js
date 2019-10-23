var sm = require('string-similarity')

const Command = require("../../modules/Command.js");

class Autorole extends Command {
  constructor(client) {
    super(client, {
      name: "autorole",
      FRdescription:"Définir un rôle automatique pour les bots et utilisateurs.", 
      ENdescription:"Define an automatic role for bot and users.",
      category:"Admin", 
      FRusage: "autorole user/bot <rôle>",
      ENusage:"autorole user/bot <role>",
      permissions:["MANAGE_ROLES", "USE_EXTERNAL_EMOJIS"], 
      aliases:[] 
    });
  }

  run(message, args, level, con, lang) {
  
  var no_args = this.client.toWrongMark(lang.autorole.no_args)
  
  var user = this.client.toCheckMark(lang.autorole.user) 
  
  var bot = this.client.toCheckMark(lang.autorole.bot)

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
      	
        var user_msg = this.client.toValues(user, "{userrole}", cible)

      	message.channel.send(user_msg)
            
      	}) 
     
      	} 
      	
      	if(args[0] === "bot"){
      		
      	con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}` , (err, rows) => {
      	
      	con.query(`UPDATE settings SET bot_autorole = ${cible.id} WHERE guild_id = ${message.guild.id}`)
      	
        var bot_msg = this.client.toValues(bot, "{botrole}", cible) 

      	message.channel.send(bot_msg)
            
      	}) 
     
      	} 
}	

}

module.exports = Autorole;
