const Command = require("../../modules/Command.js")
const mysql = require("mysql") 

class Toprep extends Command {
constructor(client){
super(client, {
name:"toprep", 
description:"Classement par points de réputation.", 
category:"Game", 
usage:"toprep", 
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

con.query("SELECT * FROM inventory ORDER BY cast (rep as SIGNED) DESC LIMIT 25", (err, rows) => {
 
let resp = ``;
 		
for(var i in rows){
	
resp += `[${isNaN(parseInt(i)+1) ? "-" : parseInt(i)+1}] - **${this.client.users.find("id", `${rows[i].id}`) == null ? "NULL" : this.client.users.find("id", `${rows[i].id}`).tag} - **Reps: **${this.client.users.find("id", `${rows[i].rep}`) == null ? "/": rows[i].niveau}**\n`
		
} 
	
message.channel.send(resp) 	
	
}) 

setTimeout(() => {con.end()}, 1000*60*1) 

}
}

module.exports = Toprep;
