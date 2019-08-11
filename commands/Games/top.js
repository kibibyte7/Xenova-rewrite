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

let u = this.client.users.find("id", `${rows[i].id}`) 
			
resp += isNaN(i) ? `` : `${!u ? "invalid-user" : u.username} - **Niveau: **${this.client.users.find("id", `${rows[i].id}`) == null ? "/": rows[i].niveau}**\n`

} 
	
message.channel.send(resp) 	
	
}) 

}
}

module.exports = Top;
