var sm = require('string-similarity')

const Command = require("../../modules/Command.js");

class Leave_channel extends Command {
constructor(client) {
super(client, {
name: "leave_channel",
FRdescription: "Définir un salon pour les départs.",
ENdescription: "Define a leave channel.", 
category:"Admin", 
FRusage: "leave_channel <salon>", 
ENusage: "leave_channel <channel>",
cooldown : 5,
permLevel:"XenoAdminPerm", 
aliases:["lc"] 
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
      	
      	}
      	
      	con.query(`UPDATE settings SET leave_id = ${cible.id} WHERE guild_id = ${message.guild.id}`) 
      	
      	message.channel.send("Le channel des départs est désormais : " + cible)
            
      	}) 
      	
}	

}

module.exports = Leave_channel;
