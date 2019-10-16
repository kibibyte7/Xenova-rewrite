var sm = require('string-similarity')

const Command = require("../../modules/Command.js");

class Settings_info extends Command {
  constructor(client) {
    super(client, {
      name: "settings_info",
      description: "Voir les paramètres de la guilde.",
      category:"Admin", 
      usage: "settings_info", 
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
        value: rows[0].welcome_id === "Non défini" ? "Aucun channel défini" : message.guild.channels.find(c => c.id === rows[0].welcome_id).name
        },
        {
        name:"Message de bienvenue:",
        value:rows[0].welcome_msg
        },
        {
        name:"Channel de départ:",
        value: rows[0].leave_id === "Non défini" ? "Aucun channel défini" : message.guild.channels.find(c => c.id === rows[0].leave_id).name
        },
        {
        name:"Message de départ:",
        value:rows[0].leave_msg
        },
        {
        name:"Channel de ban:",
        value: rows[0].ban_id === "Non défini" ? "Aucun channel défini" : message.guild.channels.find(c => c.id === rows[0].ban_id).name
        },
        {
        name:"Message de ban:",
        value: rows[0].ban_msg
        },
        {
        name:"Autorole humains:",
        value: rows[0].user_autorole === "Non défini" ? "Aucun rôle défini" : message.guild.roles.find(c => c.id === rows[0].user_autorole).name
        },
        {
        name:"Autorole bots:",
        value: rows[0].bot_autorole === "Non défini" ? "Aucun rôle défini" : message.guild.roles.find(c => c.id === rows[0].bot_autorole).name
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
