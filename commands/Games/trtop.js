const Command = require("../../modules/Command.js")

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

run(message, args, level, con) {

con.query("SELECT * FROM inventory ORDER BY cast (tresors as SIGNED) DESC LIMIT 25", (err, rows) => {
 
let resp = ``;
 		
for(var i in rows){
	
resp += `[${isNaN(parseInt(i)+1) ? "-" : parseInt(i)+1}] - **${this.client.users.find("id", `${rows[i].id}`) == null ? "NULL" : this.client.users.find("id", `${rows[i].id}`).tag} - **Trésors: **${this.client.users.find("id", `${rows[i].id}`) == null ? "/": rows[i].tresors}**\n`
		
} 
	
message.channel.send(resp) 	
	
}) 

}
}

module.exports = Trtop;
