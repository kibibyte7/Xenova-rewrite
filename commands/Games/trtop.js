const Command = require("../../modules/Command.js")
const mysql = require("mysql") 

class Trtop extends Command {
constructor(client){
super(client, {
name:"trtop", 
description:"Classement par trésors récupéré.", 
category:"Game", 
usage:"trtop", 
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

con.query("SELECT * FROM inventory ORDER BY cast (tresors as SIGNED) DESC LIMIT 25", (err, rows) => {
 
let resp = ``;
 		
for(var i in rows){
	
resp += `[${parseInt(i)+1}] - **${bot.users.get(rows[i].id).tag}:** Trésors: **${rows[i].tresors}**\n`
		
} 
	
message.channel.send(resp) 	
	
}) 

setTimeout(() => {con.end()}, 1000*60*1) 

}
}

module.exports = Trtop;
