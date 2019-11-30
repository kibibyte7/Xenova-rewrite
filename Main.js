if (Number(process.version.slice(1).split(".")[0]) < 8) throw new Error("Node 8.0.0 ou version ultérieure requise. Update ton système node.");

const { Client, Collection, Attachment } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap");
const klaw = require("klaw");
const path = require("path");
const mysql = require("mysql") 
const canvas = require("canvas") 
const Twit = require("twit") 
const lib = require('lib');
const pokefusion = lib.Hademar.pokefusion['@0.0.1'];
const image2base64 = require('image-to-base64');
const Canvas = require("canvas")

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

var T = new Twit({
  consumer_key:         process.env.consumer_key,
  consumer_secret:      process.env.consumer_secret,
  access_token:         process.env.access_token,
  access_token_secret:  process.env.access_token_secret,
  timeout_ms:           60000*3,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})

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

  async postCaptcha(user, chan, type){

  let u = this.users.find(x => x.id === user) 
  
  let channel = message.guild.channels.find(c => c.id === chan)

  console.log(`${u.username} - ${channel.id}`)

  const filter = (reaction, user) => user.id === u.id;

  Canvas.registerFont('Font/visitor2.ttf', { family: 'Visitor2'})
 	
  const firstNumber = Math.floor(Math.random()*20);

  const secondNumber = Math.floor(Math.random()*20);

  const thirdNumber = `${Math.floor(Math.random()*999)+1}`;

  const result = `${firstNumber + secondNumber}` + `${thirdNumber}`;

  const canvas = Canvas.createCanvas(700, 250); 

  const ctx = canvas.getContext('2d'); 

  const background = await Canvas.loadImage("Images/background.png");

  ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

  ctx.font = this.applyText(canvas, `${firstNumber} + ${secondNumber} = ? + "${thirdNumber}"`) && '55px "Visitor2"';

  ctx.fillStyle = "#0d1bde";

  ctx.fillText(`${firstNumber} + ${secondNumber} = ? + "${thirdNumber}"`, canvas.width / 4.4, canvas.height / 1.8);

  const attachment = new Attachment(canvas.toBuffer(), 'captcha.png'); 

  let resp = ``;

  let tentatives = 3;

  channel.send(`${u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment).then(m => {

  m.react("0⃣") 

  setTimeout(() => { m.react("1⃣")}, 1000)

  setTimeout(() => { m.react("2⃣")}, 2000)

  setTimeout(() => { m.react("3⃣")}, 3000)

  setTimeout(() => { m.react("4⃣")}, 4000)

  setTimeout(() => { m.react("5⃣")}, 5000)

  setTimeout(() => { m.react("6⃣")}, 6000)

  setTimeout(() => { m.react("7⃣")}, 7000)

  setTimeout(() => { m.react("8⃣")}, 8000)

  setTimeout(() => { m.react("9⃣")}, 9000)

  setTimeout(() => { m.react("↩")}, 10000)

  setTimeout(() => { m.react(this.client.findEmoteByName("checkMark"))}, 11000)

  let collect = m.createReactionCollector(filter)

  collect.on("collect", (r) => {

  if(r.emoji.name === "0⃣") {

  r.remove(u)

  resp += "0";

  m.edit(`${u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

  } 

  if(r.emoji.name === "1⃣") {

  r.remove(u)

  resp += "1";

  m.edit(`${u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

  } 

  if(r.emoji.name === "2⃣") {

  r.remove(u)

  resp += "2";

  m.edit(`${u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

  } 

  if(r.emoji.name === "3⃣") {

  r.remove(u)

  resp += "3";

  m.edit(`${u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

  } 

  if(r.emoji.name === "4⃣") {

  r.remove(u)

  resp += "4";

  m.edit(`${u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

  } 

  if(r.emoji.name === "5⃣") {

  r.remove(u)

  resp += "5";

  m.edit(`${u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

  } 

  if(r.emoji.name === "6⃣") {

  r.remove(u)

  resp += "6";

  m.edit(`${u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

  } 

  if(r.emoji.name === "7⃣") {

  r.remove(u)

  resp += "7";

  m.edit(`${u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

  } 

  if(r.emoji.name === "8⃣") {

  r.remove(u)

  resp += "8";

  m.edit(`${u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

  } 

  if(r.emoji.name === "9⃣") {

  r.remove(u)

  resp += "9";

  m.edit(`${u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

  } 

  if(r.emoji.name === "↩") {

  r.remove(u)

  resp = "";

  m.edit(`${u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

  } 

  if(r.emoji.name === "checkMark") {

  if(resp === result) {

  channel.send(`${this.client.findEmoteByName("checkMark")} ${u} Captcha validé ! Tu es un bon humain.`) 

  m.clearReactions();

  collect.stop();

  } else {

  r.remove(u)

  if(tentatives == 1){

  m.edit(`${u} Entre le code donné\n\n**Code: ${resp}**\n\nAvertissement: Code faux, 0 tentatives restantes.\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment) 

  if(args[1] === "server"){

  channel.send(`${this.client.emojis.find(e => e.name === "wrongMark")} **${u.username}** a été kick, pour captcha non résolu.`, `Captcha non résolu`) 

  message.guild.kick(u.id);

  m.clearReactions();

  collect.stop();

  } 

  if(type === "game"){

  con.query(`SELECT * FROM inventory WHERE id = ${u.id}`, (err, rows) => {

  channel.send(`${this.client.findEmoteByName("wrongMark")} ${!u ? message.author : u} Code faux ! Le code était **${result}**`) 

  con.query(`UPDATE inventory SET hrcombo = 0 WHERE id = ${u.id}`) 

  m.clearReactions();

  collect.stop();

  }) 

  } 

  } else {

  tentatives = tentatives - 1;

  m.edit(`${u} Entre le code donné\n\n**Code: ${resp}**\n\nAvertissement: Code faux, ${tentatives} tentatives restantes.\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment) 

  } 

  } 

  } 

  }) 

  }) 

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
  
  async tweetFusion(){
  
   let result = await pokefusion();
   
   let url = result.imageUrl;
   
   image2base64(url).then((response) => {

  T.post('media/upload', { media_data: response }, function (err, data, response) {
  var mediaIdStr = data.media_id_string
  var altText = "Propulsé par l'api pokemon.alexonsager"
  var meta_params = { media_id: mediaIdStr, alt_text: { text: altText } }

  T.post('media/metadata/create', meta_params, function (err, data, response) {
    if (!err) {
      
      var params = { status: `Fusion (${result.name})`, media_ids: [mediaIdStr] }

      T.post('statuses/update', params, function (err, data, response) {
        console.log(data)
      })
    }
  })
}) 

        }).catch((error) => {

            console.log(error); //Error....
        
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
  
  setInterval(() => {client.tweetFusion()}, 1800000);

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
