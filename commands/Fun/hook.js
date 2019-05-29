const Command = require("../../modules/Command.js")

const WH = require("../../modules/WebHook.js")

class Hook extends Command {
constructor(client) {
super(client, {
name:"hook", 
description:"Faire parler un webhook à ton profil.", 
category:"Fun"
}) 
} 

run(client, message, args) {

message.delete() 
 		
 		if(!args || args.length == 0){
 			return tools.hook(message.channel, `Help`, `${prefix}hook <message>`, "00ffff", "https://cdn.discordapp.com/attachments/564478330712096770/571327152818225171/d4963add60654027bad8e894a3779ae1.jpg")
 			}
 			
 			let role = message.member.roles.last();

 			WH.hook(message.channel, message.author.username, args.join(" "), role.hexColor.slice(1), message.author.avatarURL)
 
} 

}

module.exports = Hook;
