const Command = require("../../modules/Command.js")
const mysql = require("mysql") 

class Top extends Command {
constructor(client){
super(client, {
name:"top", 
description:"Classement par niveau.", 
category:"Game", 
usage:"top", 
aliases:[] 
}) 
} 

run(message, args, level) {

var con = mysql.createConnection({
host:process.env.host, 
user:process.env.user, 
password:process.env.password, 
database:process.env.database 
}) 

con.connect(err => {
if(err) throw err;
console.log("Base de données connecté.") 
}) 

con.query("SELECT * FROM inventory ORDER BY cast (niveau as SIGNED) DESC LIMIT 10", (err, rows) => {
 
let resp = ``;
 		
for(var i in rows){
	
resp += `[${parseInt(i)+1}] - **${this.client.users.find("id", `${rows[i].id}`).tag} - **Niveau: **${rows[i].niveau}**\n`

if(!this.client.users.find("id", rows[i].id)) return resp += `null\n;
		
} 
	
message.channel.send(resp) 	
	
}) 

setTimeout(() => {con.end()}, 1000*60*1) 

}
}

module.exports = Top;
