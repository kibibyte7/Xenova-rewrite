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


  }
};
