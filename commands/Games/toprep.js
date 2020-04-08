const Command = require("../../modules/Command.js")

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

run(message, args, level, con) {

con.query("SELECT * FROM inventory ORDER BY cast (rep as SIGNED) DESC LIMIT 50", (err, rows) => {
 
let resp = ``;
 		
for(var i in rows){

let u = this.client.users.cache.find(u => u.id === `${rows[i].id}`) 
			
isNaN(i) ? `` : resp += `[${parseInt(i)+1}] - **${!u ? "invalid-user" : u.username}** - **Reps: ${rows[i].rep}**\n`

} 
	
message.channel.send({embed:{
color:0x010101,
title:"Classement par Points de réputation", 
description:`${resp}`, 
timestamp:new Date(), 
footer:{
icon_url:this.client.user.avatarURL,
text:`©️ Toprep | Xenova `
} 
}}) 	

}) 

}
}

module.exports = Toprep;
