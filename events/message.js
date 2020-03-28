const moment = require("moment")
 
const mysql = require("mysql") 

   var db_config = {
    host:process.env.host, 
    user:process.env.user, 
    password:process.env.password, 
    database:process.env.database, 
    useUnicode:true
    } 

    function handleDisconnect() {
    con = mysql.createConnection(db_config); // Recreate the connection, since
                                                  // the old one cannot be reused.

  con.connect(function(err) {              // The server is either down
    if(err) {                                     // or restarting (takes a while sometimes).
      console.log('error when connecting to db:', err);
      setTimeout(handleDisconnect, 2000); // We introduce a delay before attempting to reconnect,
    }                                     // to avoid a hot loop, and to allow our node script to
  });                                     // process asynchronous requests in the meantime.
                                          // If you're also serving http, display a 503 error.
  con.on('error', function(err) {
    //console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect()

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    if (message.author.bot) return;   

    // Paramètres
    const settings = this.client.getSettings(message.guild);
    message.settings = settings;

    const prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
    
    if (message.content.match(prefixMention)) {
      
    return message.channel.send(`${this.client.emojis.cache.find(e => e.name === "checkMark")} Le préfixe du serveur est \`${settings.prefix}\``);
    
    } 
    
    //afk mention

    var mention = message.mentions.members.first();

    if(mention){
    
    if(mention.user.id === message.author.id) return;
    
    con.query(`SELECT * FROM afk WHERE id = ${mention.user.id} AND guild_id = ${message.guild.id}`, (err, rows) => {

    if(rows.length == 0) return;
   
    const AfkTime = new Date(rows[0].time);

    message.channel.send(`${this.client.emojis.cache.find(e => e.name === "LoadBoost")} **${mention.user.username}** est en afk pour : **${rows[0].reason}** - (**${moment(AfkTime, "DD").locale("fr-FR").fromNow()}**)`)

    }) 

    } 
    
    //retirer le afk

    con.query(`SELECT * FROM afk WHERE id = ${message.author.id} AND guild_id = ${message.guild.id}`, (err, rows) => {
    
    if(rows.length == 0) return;

    const AfkCooldown = new Date(rows[0].ratelimit).getTime();

    if((AfkCooldown > Date.now()) && (AfkCooldown !== 0)) return;

    con.query(`DELETE FROM afk WHERE id = ${message.author.id} AND guild_id = ${message.guild.id}`)

    message.channel.send(`${this.client.emojis.cache.find(e => e.name === "Youpi")} ${message.author} Tu es de retour ! J'ai enlevé ton afk !`).then(m => m.delete(3000))

    }) 

  //commandes
   if (message.content.indexOf(settings.prefix) !== 0) return;

    const args = message.content
      .slice(settings.prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();
    
    if (message.guild && !message.member)
      await message.guild.fetchMember(message.author);

    const level = this.client.permlevel(message);

    const cmd =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));
    if (!cmd) return;

    if (level < this.client.levelCache[cmd.conf.permLevel]) {
      if (settings.systemNotice == true) {
        return message.channel
          .send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Tu n'as pas la permission pour utiliser cette commande.\nTon niveau de permission est **${level} (${this.client.config.permLevels.find(l => l.level === level).name})**\nCette commande requirt le niveau de permission: **${ this.client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})**`);
      } else {
        return;
      }
    }

    message.author.permLevel = level;

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }
   
    if(cmd.conf.enabled === false){
    if(settings.systemNotice == true) {
        return message.channel
         .send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Cette commande est désactivée suite à des bugs ou une maintenance de celle-ci.`)
       } 
     } 
     
     if(cmd.conf.guildOnly == true && message.channel.type !== "text") return message.author.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Tu ne peux pas faire cette commande ici.`)
     
     if(!message.guild.me.permissionsIn(message.channel.id).has("SEND_MESSAGES")) return message.author.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} je n'ai pas la permission \`SEND_MESSAGES\` dans le channel **${message.channel.name}**.`) 

     if(!message.guild.me.permissions.has(cmd.conf.permissions)){
     
     var perms = cmd.conf.permissions;
     let missingPermissions = ``;
     for(var i in perms){
     console.log(perms[i])
     if(!message.guild.me.permissions.has(`${perms[i]}`.toString())) missingPermissions += `- ${perms[i]}\n` 

     }
	     
     return message.channel.send(`${message.guild.me.permissions.has("USE_EXTERNAL_EMOJIS") ? this.client.emojis.cache.find(e => e.name === "wrongMark") : ":x:"} Je n'ai pas les permissions nécessaires vérifie que j'aie les permission : \`\`\`diff\n${missingPermissions}\`\`\` `) 

     }

    con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}`,(err, rows) => {

    const lang = rows[0].lang === "fr" ? require("../fr.json") : require("../en.json")

    con.query(`SELECT * FROM gban WHERE id = ${message.author.id} `, (err, rows) => {
    
    if(rows.length == 1) return;

    const cooltime = cmd.conf.cooldown*1000;
    
    con.query(`SELECT * FROM cooldown WHERE id = ${message.author.id} AND cmd = "${cmd.help.name}"`, (err, cooldown) => {

    if (cooldown.length == 1) {

            message.channel.send(`${this.client.emojis.cahce.find(e => e.name === "wrongMark")} ${message.author} attends encore **${Math.round((cooldown[0].time - new Date().getTime())/1000)} secondes** avant de faire cette commande`).then(m => m.delete(3000));

    } else {

        this.client.logger.log(
      `${message.author.username} (${message.author.id} - ${
        this.client.config.permLevels.find(l => l.level === level).name
      }) lance la commande ${cmd.help.name}`
      );

        this.client.captchaCounter(message.author.id);

	 con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, player) => {
	    
        var msg = this.client.askCaptcha(message.author.id, player[0].verified_captcha  ,cmd.help.name, message);   
	 
	console.log(msg)
	    
        if(msg == false) return;

       cmd.run(message, args, level, con, lang);
	
	 })
	    
        if(!cmd.conf.cooldown == 0){

        con.query(`INSERT INTO cooldown (id, cmd, time) VALUES (${message.author.id}, "${cmd.help.name}", ${new Date().getTime() + cooltime})`)

        setTimeout(() => {
          con.query(`DELETE FROM cooldown WHERE id = ${message.author.id} AND cmd = "${cmd.help.name}"`) 
        }, cooltime);

        }
	
		 
	 
    }

}) 
   
})

})

}

};
