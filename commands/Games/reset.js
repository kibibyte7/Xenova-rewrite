const Command = require("../../modules/Command.js")
const mysql = require("mysql") 

class Reset extends Command {
constructor(client){
super(client, {
name:"reset", 
description:"Dev bot uniquement, reset un joueur.", 
category:"Game", 
usage:"reset",
permLevel:"XenoOwner", 
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

var mention = message.mentions.users.first();

if(!mention) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Mentionne ou id un utilisateur.`);
	  
con.query(`DELETE FROM inventory WHERE id = ${mention.id}`)
		 
message.channel.send(`**${mention.tag}** a été reset !`)

setTimeout(() => {con.end()}, 1000*5) 

} 
} 

module.exports = Reset;	
