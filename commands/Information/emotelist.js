const Command = require("../../modules/Command.js")

class Emotelist extends Command {
constructor(client) {
super(client, {
name :"emote", 
description :"Donne l'image d'un ou la liste complète des emojis.", 
category : "Information", 
usage:"emote <list>" 
})
} 

run(message, args, level) {

if(!args || args.length == 0){
message.channel.send(`${this.client.emojis.find("name","wrongMark")} Spécifie le nom ou la liste complète des emojis.`)
return;
}

if(args[0] === "list"){
message.channel.send(message.guild.emojis.size == 0 ? `${this.client.emojis.find("name","wrongMark")} Il n'y a aucun emojis dans ce serveur.` : `${this.client.emojis.find("name","checkMark")} Voici la liste des emojis du serveur :\n${message.guild.emojis.map(e => e).join(" ")}`)
return;
} 

try{
var e = this.client.emojis.find(emote => emote.name === args[0])
message.channel.send({embed:{author:{
icon_url:message.author.avatarURL,
name:message.author.username
}, 
color:0xffff00,
fields:[{
name:":gear: -> Nom :", 
value:e.name
},
{
name:":gear: -> ID :",
value:e.id
}], 
image:{
url:e.url
},
timestamp:new Date(), 
footer:{
icon_url:this.client.user.avatarURL,
text:"emote" 
}
}})
} catch (e) {
message.channel.send(`${this.client.emojis.find("name","wrongMark")} Aucun résultat trouvé.`) 
} 

} 
}

module.exports = Emotelist;
