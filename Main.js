if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 ou version ultérieure requise. Update ton système node.");


const { Client, Collection } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const klaw = require("klaw");
const path = require("path");
const mysql = require("mysql") 
const canvas = require("canvas") 
const T = require("twit") 

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

class Xenova extends Client {
  constructor(options) {
    super(options);

    this.config = require("./config.js");

    this.commands = new Collection();
    this.aliases = new Collection();
    
    this.queue = new Map();
    
    this.settings = new Enmap({
      name: "settings",
      cloneLevel: "deep",
      fetchAll: false,
      autoFetch: true
    });

    this.logger = require("./modules/Logger");
    this.wait = require("util").promisify(setTimeout);
  }

  // Permission
  permlevel(message) {
    let permlvl = 0;

    const permOrder = this.config.permLevels
      .slice(0)
      .sort((p, c) => (p.level < c.level ? 1 : -1));

    while (permOrder.length) {
      const currentLevel = permOrder.shift();
      if (message.guild && currentLevel.guildOnly) continue;
      if (currentLevel.check(message)) {
        permlvl = currentLevel.level;
        break;
      }
    }
    return permlvl;
  } 
  
  postCaptcha(message, to){

  const cmd = require("./commands/Hidden/captcha.js")

  const captcha = new cmd(this)

  captcha.run(message, this, [to])
  
  } 

  toWrongMark(input) {

  return input = input.replace('{wrong}', this.emojis.find(e => e.name === "wrongMark"))

  }

  toCheckMark(input) {

  return input = input.replace('{check}', this.emojis.find(e => e.name === "checkMark"))

  }

  toTyping(input) {

  return input = input.replace('{typing}', this.emojis.find(e => e.name === "typing"))

  }

  toValues(msg, input, value) {
  
  return msg = msg.replace(input, value)

  } 
  
  findEmoteByName(emote){

  return emote = this.emojis.find(e => e.name === emote)

  } 
  
  findEmoteById(id){

  return emote = this.emojis.find(e => e.id === emote)

  } 
  
  findUserById(user){

  return user = this.users.find(u => u.id === user)

  } 

  findUserByName(user){

  return user = this.users.find(u => u.name === user)

  } 

  findChannelByName(channel){

  return channel = this.channels.find(c => c.name === channem)

  } 

  findChannelById(channel){

  return channel = this.channels.find(c => c.id === channel)

  } 

  regenMana(){
  
  con.query("SELECT * FROM inventory", (err, rows) => {
	
  rows.forEach(function(player){

  let p = parseInt(player.pv);

  p++;

  con.query(`UPDATE inventory SET pv = ${p} WHERE id = ${player.id}`)

  if(player.mana == player.maxmana) return;
 
  let v = parseInt(player.mana);
 
  v++;

  con.query(`UPDATE inventory SET mana = ${v} WHERE id = ${player.id}`)

  }) 
 
  })

  } 
  
  checkVcsBans(){

  con.query("SELECT * FROM vcs_user", (err, rows) => {
  
  for(var i in rows){

  if(isNaN(i)) return;
  
  if(rows[i].banned == false) return;

  if(rows[i].bannedto === "perm") return;

  const TempBan = new Date(rows[0].bannedto).getTime();

  if((TempBan > Date.now()) && (TempBan !== 0)) return;
  
  con.query(`UPDATE vcs_user SET banned = false, bannedtime = "Non défini", bannedto = "Non défini" WHERE id = ${rows[i].id}`)

  } 
 
  }) 

  } 

  applyText(canvas, text){

        const ctx = canvas.getContext('2d');

	let fontSize = 70;

	do {
		ctx.font = `${fontSize -= 10}px sans-serif`;
		
	} while (ctx.measureText(text).width > canvas.width - 300);

	return ctx.font;
  }

  loadCommand(commandPath, commandName) {
    try {
      const props = new (require(`${commandPath}${path.sep}${commandName}`))(
        this
      );
      this.logger.log(`Chargement de la commande: ${props.help.name}`, "log");
      props.conf.location = commandPath;
      if (props.init) {
        props.init(this);
      }
      this.commands.set(props.help.name, props);
      con.query(`DELETE FROM cooldown WHERE cmd = "${props.help.name}"`) 
      props.conf.aliases.forEach(alias => {
        this.aliases.set(alias, props.help.name);
      });
      return false;
    } catch (e) {
      return `Impossible de charger la commande ${commandName}: ${e}`;
    }
  }
  
  async unloadCommand (commandPath, commandName) {
    let command;
    if (this.commands.has(commandName)) {
      command = this.commands.get(commandName);
    } else if (this.aliases.has(commandName)) {
      command = this.commands.get(this.aliases.get(commandName));
    }
    if (!command) return `La commande \`${commandName}\` n'existe pas et n'est pas un alias, essaie encore.`;

    if (command.shutdown) {
      await command.shutdown(this);
    }
    delete require.cache[require.resolve(`${commandPath}${path.sep}${commandName}.js`)];
    return false;
  }

  getSettings(guild) {
    const defaults = this.config.defaultSettings || {};
    const guildData = this.settings.get(guild.id) || {};
    const returnObject = {};
    Object.keys(defaults).forEach(key => {
      returnObject[key] = guildData[key] ? guildData[key] : defaults[key];
    });
    return returnObject;
  }


writeSettings (id, newSettings) {
    const defaults = this.settings.get("default");
    let settings = this.settings.get(id);
    if (typeof settings != "object") settings = {};
    for (const key in newSettings) {
      if (defaults[key] !== newSettings[key]) {
        settings[key] = newSettings[key];
      } else {
        delete settings[key];
      }
    }
    this.settings.set(id, settings);
  }

async awaitReply (msg, question, limit = 60000) {
    const filter = m=>m.author.id = msg.author.id;
    await msg.channel.send(question);
    try {
      const collected = await msg.channel.awaitMessages(filter, { max: 1, time: limit, errors: ["time"] });
      return collected.first().content;
    } catch (e) {
      return false;
    }
  }
}

const client = new Xenova({disableEveryone:true});
console.log(client.config.permLevels.map(p => `${p.level}: ${p.name}`));

// Fonction d'initialisation

const init = async () => {
  // Récupération des commandes
  klaw("./commands").on("data", item => {
    const cmdFile = path.parse(item.path);
    if (!cmdFile.ext || cmdFile.ext !== ".js") return;
    const response = client.loadCommand(
      cmdFile.dir,
      `${cmdFile.name}${cmdFile.ext}`
    );
    if (response) client.logger.error(response);
  });

  // Récupération des événements
  const evtFiles = await readdir("./events");
  client.logger.log(`Chargement de ${evtFiles.length} événements.`, "log");
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    client.logger.log(`Chargement de l'événement: ${eventName}`);
    const event = new (require(`./events/${file}`))(client);
    client.on(eventName, (...args) => event.run(...args));
    delete require.cache[require.resolve(`./events/${file}`)];
  });

  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }

  setInterval(() => {client.regenMana()}, 30000);
  
  setInterval(() => {client.checkVcsBans()}, 60000); 

  client.login(process.env.token);
};

init();

client.on("disconnect", () => client.logger.warn("Bot en déconnection..."))
  .on("reconnecting", () => client.logger.log("Bot en reconnection...", "log"))
  .on("error", async e => {

await client.channels.find("id", "630001781161852928").send({embed:{
color:0xff0c69, 
title:"Error :",
description:e.stack, 
timestamp:new Date(),
footer:{
text:"© Error | Xenova", 
icon_url:client.user.avartarURL
} 
}})

})
  .on("warn", info => client.logger.warn(info));


String.prototype.toProperCase = function () {
  return this.replace(/([^\W_]+[^\s-]*) */g, function (txt) {return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

Array.prototype.random = function () {
  return this[Math.floor(Math.random() * this.length)];
};

process.on("uncaughtException", (err) => {
  const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
  console.error("Uncaught Exception: ", errorMsg);
  process.exit(1);
});

process.on("unhandledRejection", err => {
client.logger.error(err.stack) 
})
