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

con.query("SELECT * FROM inventory ORDER BY cast (niveau as SIGNED) DESC LIMIT 50", (err, rows) => {
 
let resp = ``;
 		
for(var i in rows){

let u = this.client.users.find("id", `${rows[i].id}`) 
			
isNaN(i) ? `` : resp += `[${parseInt(i)+1}] - **${!u ? "invalid-user" : u.username}** - **Niveau: ${rows[i].niveau}**\n`

} 
	
message.channel.send({embed:{
color:0x010101,
title:"Classement par niveaux", 
description:`${resp}`, 
timestamp:new Date(), 
footer:{
icon_url:this.client.user.avatarURL,
text:`©️ Top | Xenova `
} 
}}) 	
	
}) 

}
}

module.exports = Top;
