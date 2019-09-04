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
  con.query(`SELECT * FROM settings WHERE guild_id = ${member.guild.id}`, (err, rows) => {
    
    if(rows.length == 0) return;
    
    let leave = rows[0].leave_msg
    
    var usertag = leave.replace("{user}", member.user.tag)
        
    var server = usertag.replace("{server}", member.guild.name) 
    
    var l = server.replace("{membercount}", member.guild.members.size) 

    this.client.channels.get(rows[0].welcome_id).send(l)

    }) 


}
};
