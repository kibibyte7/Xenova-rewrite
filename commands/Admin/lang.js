const Command = require("../../modules/Command.js");

class Lang extends Command {
constructor(client) {
super(client, {
name:"lang", 
FRdescription:"Changer la langue du bot.",
ENdescription:"Change the language of the bot.", 
category:"Admin", 
usage:"lang <en / fr>", 
cooldown: 3,
permissions:[], 
permLevel:"XenoAdminPerm", 
aliases:[] 
}) 
} 

  run(message, args, level, con) {
  
  if(args.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Entre \`fr\` ou \`en\`.`) 
  
  if(args[0] === "fr") {

  con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}`, (err, rows) => {
  
  if(rows[0].lang === args[0]) return message.channel.send(`${this.client.emojis.find(emote => emote.name === "wrongMark")} Le bot est déjà en Français.`) 
  
  con.query(`UPDATE settings SET lang = '${args[0]}' WHERE guild_id = ${message.guild.id}`) 

  message.channel.send(`${this.client.emojis.find(emote => emote.name === "checkMark")} Le bot est maintenant en français, sur ce serveur.`) 

  }) 

  } 

  if(args[0] === "en") {

  con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}`, (err, rows) => {
  
  if(rows[0].lang === args[0]) return message.channel.send(`${this.client.emojis.find(emote => emote.name === "wrongMark")} The bot is already in English.`) 
  
  con.query(`UPDATE settings SET lang = '${args[0]}' WHERE guild_id = ${message.guild.id}`) 

  message.channel.send(`${this.client.emojis.find(emote => emote.name === "checkMark")} The bot is now English, in this guild.`) 

  }) 

  } 

} 

}

module.exports = Lang;
