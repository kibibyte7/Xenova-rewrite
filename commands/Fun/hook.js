const Command = require("../../modules/Command.js")

class Hook extends Command {
constructor(client) {
super(client, {
name:"hook", 
description:"Faire parler un webhook à ton profil.", 
category:"Fun"
}) 
} 

run(client, message, args) {


message.delete();
 		
 		if(!args || args.length == 0){
 			return WH.hook(message.channel, `Help`, `${this.client.config.defaultSettings.prefix}hook <message>`, "00ffff", "https://cdn.discordapp.com/attachments/564478330712096770/571327152818225171/d4963add60654027bad8e894a3779ae1.jpg")
 			}
 			
 			let role = message.member.roles.last();

 			WH.hook(message.channel, message.author.username, args.join(" "), role.hexColor.slice(1), message.author.avatarURL) 

function WH(channel, title, message, color, avatar) {
if(!channel) return console.log("Pas de channel spécifié.")
if(!title) return console.log("Pas de titre spécifié.") 
if(!message) return console.log("Pas de message spécifié.") 
if(!color) color = '00ffff';
if(!avatar) avatar = "https://cdn.discordapp.com/attachments/564478330712096770/571327152818225171/d4963add60654027bad8e894a3779ae1.jpg";

color.replace(/\s/g, '');
avatar.replace(/\s/g, '');

channel.fetchWebhooks() 
.then(webhook => {
	
	let fwebhook = webhook.find("name", "Webhook");
	
	
	if(!fwebhook) {
	
	channel.createWebhook("Webhook", "https://cdn.discordapp.com/attachments/564478330712096770/571327152818225171/d4963add60654027bad8e894a3779ae1.jpg") 
 .then(webhook => {
 	
 	webhook.send('', {
 	"username": title, 
 	"avatarURL": avatar, 
 	"embeds":[{
 		  "title":title, 
 		  "color": parseInt(`0x${color}`),
 		  "description":message, 
 		   "timestamp":new Date(), 
 		   "footer":[{
 		   	  "icon_url":avatar, 
 		   	  "text":"webhook" 
 		   	}] 
 		}]
 		
 	}).catch(e => {
 	
 	return channel.send("Une erreur est survenue lors de l'envoi avec le webhook: " + e.message)
 	
 	}) 
 		
	}) 
			
	} else {
		
	fwebhook.send('', {
 	"username": title, 
 	"avatarURL": avatar, 
 	"embeds":[{
 		  "title":title, 
 		  "color": parseInt(`0x${color}`),
 		  "description":message, 
 		  "timestamp":new Date(), 
 		   "footer":[{
 		   	  "icon_url":avatar, 
 		   	  "text":"webhook" 
 		   	}] 
 		}]
 		
 	})
	
	} 
	
}) 

} 

} 

}

module.exports = Hook;
