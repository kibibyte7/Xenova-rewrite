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
  this.con.on('error', function(err) {
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
constructor(client){
this.client = client
} 

async run() {

//Regen de mana
setInterval(() => {
con.query("SELECT * FROM inventory", (err, rows) => {
 	
 for(var i in rows) {
 if(rows[i].id == undefined) return;
 if(rows[i].mana == rows[i].maxmana) return;
 con.query(`UPDATE inventory SET mana = ${parseInt(rows[i].mana)+1} WHERE id = ${rows[i].id}`)
 
 } 
 
 }) 
}, 60000)


//regen de pv

setInterval(() => {
con.query("SELECT * FROM inventory", (err, rows) => {
 	
 for(var i in rows) {
 if(rows[i].id == undefined) return;
 else con.query(`UPDATE inventory SET pv = ${parseInt(rows[i].pv)+1} WHERE id = ${rows[i].id}`)
 
 } 
 
 }) 
 }, 60000)



	await this.client.wait(1000);
	this.client.appInfo = this.client.fetchApplication();
	setInterval(async () => {
	this.client.fetchApplication()
	}, 60000)
	
        this.client.channels.get("586596535165386759").send({embed:{
		color:0x010101, 
		author:{
                name:"Lancement réussi"
                },
		description:"Bot démarré avec succès !",
		timestamp:new Date(),
		footer:{
                icon_url:this.client.user.avatarURL,text:"lancé"
		} 
                }}) 

	this.client.user.setActivity(`${this.client.config.defaultSettings.prefix}help | ${this.client.guilds.size} servs | ${this.client.users.size} utilisateurs`, {type:"STREAMING"})
	
	this.client.logger.log(`${this.client.user.tag} lancé avec succès.`, "ready") 
	
	} 
} 
