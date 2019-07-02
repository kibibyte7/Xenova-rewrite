const Command = require("../../modules/Command.js")

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

run(message, args, level, con) {

con.query("SELECT * FROM inventory ORDER BY cast (niveau as SIGNED) DESC LIMIT 10", (err, rows) => {
 
let resp = ``;
 		
for(var i in rows){
			
resp += `[${isNaN(parseInt(i)+1) ? "-" : parseInt(i)+1}] - **${this.client.users.find("id", `${rows[i].id}`) == null ? "NULL" : this.client.users.find("id", `${rows[i].id}`).tag} - **Niveau: **${this.client.users.find("id", `${rows[i].id}`) == null ? "/": rows[i].niveau}**\n`

} 
	
message.channel.send(resp) 	
	
}) 

}
}

module.exports = Top;
