const mysql = require("mysql") 
const Canvas = require("canvas") 
const Discord = require("discord.js")

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

handleDisconnect();

module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (member) {

    this.client.user.setActivity(`${this.client.config.defaultSettings.prefix}help | ${this.client.guilds.size} servs | ${this.client.users.size} utilisateurs`, {type:"STREAMING"});
    
    con.query(`SELECT * FROM gban WHERE id = ${member.user.id}`, (err, rows) => {

    if(rows.length == 0) return;

    member.guild.owner.user.send(`J'ai ban **${member.user.username}** parce qu'il a été gban du bot, la raison : **${rows[0].reason}**`) 

    member.guild.ban(member.user.id, rows[0].reason, 7)
    
    }) 
    
    con.query(`SELECT * FROM settings WHERE guild_id = ${member.guild.id}`, async (err, rows) => {
    
    if(rows.length == 0) return;
       
    const canvas = Canvas.createCanvas(700, 250);
	
    const ctx = canvas.getContext('2d');
    
    Canvas.registerFont('Font/NFS.ttf', {family:"NFS"});

    const background = await Canvas.loadImage('Images/joinleave.jpg');
    
    ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = '#74037b';

    ctx.strokeRect(0, 0, canvas.width, canvas.height);
    
    ctx.font = '25px NFS';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('Bienvenue sur le serveur,', canvas.width / 2.9, canvas.height / 3.5);

    ctx.font = this.client.applyText(canvas, `${member.user.displayName}`) && '60px NFS';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(member.displayName, canvas.width / 2.9, canvas.height / 1.8);
    
    ctx.font = `Amuses toi bien, nous sommes ${member.guild.members.size} Membres !` && '25px NFS';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(member.displayName, canvas.width / 2.9, canvas.height / 1);

    ctx.beginPath();

    ctx.arc(125, 125, 100, 0, Math.PI * 2, true);

    ctx.closePath();

    ctx.clip();

    const avatar = await Canvas.loadImage(member.user.displayAvatarURL);
	
    ctx.drawImage(avatar, 25, 0, 200, canvas.height);

    const attachment = new Discord.Attachment(canvas.toBuffer(), 'welcome_image.png');

    let channel = member.guild.channels.find("id", rows[0].welcome_id)

    if(!channel) return;

    channel.send('', attachment) 

    }) 

    con.query(`SELECT * FROM settings WHERE guild_id = ${member.guild.id}`, (err, rows) => {
    
    if(rows.length == 0) return;
    
    let welcome = rows[0].welcome_msg == undefined? '' : rows[0].welcome_msg
    
    var come = welcome.replace("{user}", member)
    
    var wel = come.replace("{server}", member.guild.name) 
    
    var w = wel.replace("{membercount}", member.guild.members.size) 
    
    setTimeout(() => {

    let channel = member.guild.channels.find("id", rows[0].welcome_id)

    if(!channel) return;

    channel.send(w)
    
    }, 250)

    }) 
    
    con.query(`SELECT user_autorole FROM settings WHERE guild_id = ${member.guild.id}`, (err, rows) => {

    if(rows.length == 0) return;
    
    let userrole = member.guild.roles.find("id", rows[0].user_autorole)

    if(!userrole) return;

    if(!member.user.bot) return member.addRole(userrole, "[USER] Rôle automatique")

    }) 

    con.query(`SELECT bot_autorole FROM settings WHERE guild_id = ${member.guild.id}`, (err, rows) => {

    if(rows.length == 0) return;
    
    let botrole = member.guild.roles.find("id", rows[0].bot_autorole)

    if(!botrole) return;

    if(member.user.bot) return member.addRole(botrole, "[BOT] Rôle automatique")

    }) 

    con.query(`SELECT * FROM vcs_user WHERE id = ${member.user.id}`, (err, rows) => {

    if(rows.length == 0) con.query(`INSERT INTO vcs_user(id, grade, banned, bannedtime, bannedto) VALUES (${member.user.id}, '${this.client.findEmoteByName("User")} Utilisateur', ${false}, "Non défini", "Non défini")`)

    }) 

  }
};
