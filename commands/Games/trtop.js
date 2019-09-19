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

con.query("SELECT * FROM inventory ORDER BY cast (tresors as SIGNED) DESC LIMIT 50", (err, rows) => {
 
let resp = ``;
 		
for(var i in rows){

let u = this.client.users.find("id", `${rows[i].id}`) 
			
isNaN(i) ? `` : resp += `[${parseInt(i)+1}] - **${!u ? "invalid-user" : u.username}** - **Trésors: ${rows[i].tresors}**\n`

} 
	
message.channel.send({embed:{
color:0x010101,
title:"Classement par Trésors récupérés", 
description:`${resp}`, 
timestamp:new Date(), 
footer:{
icon_url:this.client.user.avatarURL,
text:`©️ Trtop | Xenova `
} 
}}) 
	
}) 
} 
}

module.exports = Trtop;
