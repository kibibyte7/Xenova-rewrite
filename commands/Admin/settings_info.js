var sm = require('string-similarity')

const Command = require("../../modules/Command.js");

class Settings_info extends Command {
  constructor(client) {
    super(client, {
      name: "settings_info",
      description: "Définir un message de bienvenue.",
      category:"Admin", 
      usage: "welcome_msg <channel>", 
      permLevel:"XenoAdminPerm", 
      aliases:["params"] 
    });
  }

  run(message, args, level, con) {
  
      	con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}`, (err, rows) => {
      	
      	if(rows.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Inutile de voir les paramètres, ils ne sont pas définis.`) 
      	
        message.channel.send({embed:{
        color:0x2f3136, 
        title:"Paramètres de la guilde.",
        fields:[
        {
        name:"Channel de bienvenue:",
        value:message.guild.channels.find(c => c.id === rows[0].welcome_id)
        },
        {
        name:"Message de bienvenue:",
        value:rows[0].welcome_msg
        },
        {
        name:"Channel de départ:",
        value:message.guild.channels.find(c => c.id === rows[0].leave_id)
        },
        {
        name:"Message de départ:",
        value:rows[0].leave_msg
        },
        {
        name:"Channel de ban:",
        value:message.guild.channels.find(c => c.id === rows[0].ban_id)
        },
        {
        name:"Message de ban:",
        value:rows[0].ban_msg
        },
        {
        name:"Autorole humains:",
        value:message.guild.roles.find(c => c.id === rows[0].user_autorole)
        },
        {
        name:"Autorole bots:",
        value:message.guild.roles.find(c => c.id === rows[0].bot_autorole)
        }], 
        timestamp:new Date(), 
        footer:{
        icon_url:this.client.user.avatarURL,
        text:"©️ Settings_info | Xenova" 
        } 
        }}) 

      	}) 
      	
}	

}

module.exports = Settings_info;
