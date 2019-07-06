const mysql = require("mysql") 
var db_config = {
host:process.env.host, 
user:process.env.user, 
password:process.env.password, 
database:process.env.database, 
useUnicode:true
} 

var con;

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
    console.log('db error', err);
    if(err.code === 'PROTOCOL_CONNECTION_LOST') { // Connection to the MySQL server is usually
      handleDisconnect();                         // lost due to either server restart, or a
    } else {                                      // connnection idle timeout (the wait_timeout
      throw err;                                  // server variable configures this)
    }
  });
}

handleDisconnect();

function RegenMana(){
 
 con.query("SELECT * FROM inventory", (err, rows) => {
 	
 for(var i in rows) {
 
 con.query(`UPDATE inventory SET mana = ${parseInt(rows[i].mana)+1} WHERE id = ${rows[i].id}`)
 
 if(rows[0].mana > rows[0].maxmana) return;
 }
setTimeout(() => RegenMana()}, 1000*60)
}) 
} 

RegenMana();

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    if (message.author.bot) return;

    if (
      !message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")
    )
      return;
    
      

    // Paramètres
    const settings = this.client.getSettings(message.guild);
    message.settings = settings;

    const prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
      
    return message.channel.send(`${this.client.emojis.find("name", "checkMark")} Le préfixe du serveur est \`${settings.prefix}\``);
  } 
  
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
          .send(`${this.client.emojis.find("name", "wrongMark")} Tu n'as pas la permission pour utiliser cette commande.\nTon niveau de permission est **${level} (${this.client.config.permLevels.find(l => l.level === level).name})**\nCette commande requirt le niveau de permission: **${ this.client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})**`);
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
         .send(`${this.client.emojis.find("name", "wrongMark")} Cette commande est désactivée suite à des bugs.`)
       } 
     } 
    // Lancement de la commande
    this.client.logger.log(
      `${message.author.username} (${message.author.id} - ${
        this.client.config.permLevels.find(l => l.level === level).name
      }) lance la commande ${cmd.help.name}`
    );
    cmd.run(message, args, level, con);
  }
};
