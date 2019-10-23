var sm = require('string-similarity')

const Command = require("../../modules/Command.js");

class Welcome_channel extends Command {
constructor(client) {
super(client, {
name: "welcome_channel",
FRdescription: "Définir un salon de bienvenue.",
ENdescription: "Define a welcome channel.", 
category:"Admin", 
FRusage: "welcome_channel <salon>", 
ENusage: "welcome_channel <channel>",
cooldown : 5,
permLevel:"XenoAdminPerm", 
aliases:["wc"] 
});
}

  run(message, args, level, con) {
  
  if(args.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Entre un texte à tweeter.`) 
  
  let chans = [];

      let indexes = [];

      message.guild.channels.forEach(function(chan){

      chans.push(chan.name)

      indexes.push(chan.id)

      })

      let match = sm.findBestMatch(args.join(" "), chans);

      let chan_name = match.bestMatch.target;

      let Ctarget = message.guild.channels.get(indexes[chans.indexOf(chan_name)])
      
      let cible = message.mentions.channels.first() || message.guild.channels.find("id", args[0]) || Ctarget;
      
      if(!cible) return message.channel.send(`Je ne trouve pas ce channel.`) 
      	
      con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}`, (err, rows) => {
      	
      	if(rows.length == 0){
      		
      	con.query(`INSERT INTO settings (welcome_id, leave_id, ban_id, welcome_msg, leave_msg, ban_msg, guild_id) VALUES (${cible.id}, ${cible.id}, ${cible.id}, 'non défini', 'non défini', 'non défini', ${message.guild.id})`)
      
        message.channel.send("Paramètres par défaut créé dans le channel: " + cible)
            
        return;
      	
        } else {

      	con.query(`UPDATE settings SET welcome_id = ${cible.id} WHERE guild_id = ${message.guild.id}`, console.log) 
      	
      	message.channel.send("Le channel de bienvenue est désormais : " + cible)
       
        } 
   
      	}) 
      	
}	

}

module.exports = Welcome_channel;
