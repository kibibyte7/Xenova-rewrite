const Command = require("../../modules/Command.js") 

class Vcs_addmod extends Command {
constructor (client) {
super(client, {
name:"vcs_addmod",
category:"Vcs", 
FRdescription:"Ajouter un nouveau modérateur dans la discussion interserveur.",
FRusage:"vcs_addmod <id>",
permLevel:"XenoOwner", 
aliases:[] 
})
}

run(message, args, level, con) {

if(!args[0]) return message.channel.send(`${this.client.emojis.find(e => e.name === "wrongMark")} Entre l'id d'un utilisateur.`)

var reason = args.slice(1).join(" ") 

if(!reason) return message.channel.send(`${this.client.emojis.find(e => e.name === "wrongMark")} Entre une raison.`)

con.query(`SELECT * FROM vcs_user WHERE id = ${args[0]}`, (err, rows) => {

if(rows.length == 0) return message.channel.send(`${this.client.emojis.find(e => e.name === "wrongMark")} Cet utilisateur n'est pas trouvé dans la base de données.`)

con.query(`UPDATE vcs_user SET grade = '${this.client.emojis.find(e => e.name ==="Modo")}' WHERE id = ${args[0]}`) 

message.channel.send(`${this.client.emojis.find(e => e.name === "checkMark")} **${this.client.users.find(u => u.id === args[0]).tag}** est désormais modérateur du vcs !`) 

con.query("SELECT * FROM vcs", (err, chan) => {

for(var i in chan) {

this.client.channels.get(chan[i].id).send({embed:{
color:Math.floor(Math.random() * 16777214) + 1,
title:"Système :", 
thumbnail:{
url:this.client.user.avatarURL
},
description:`${this.client.users.find(u => u.id === args[0])} est passé Modérateur pour: **${reason}**, bravo à lui !`,
timestamp:new Date(), 
footer:{
icon_url:this.client.user.avatarURL,
text:"© Système vcs | Xenova" 
}
}})

} 

})

}) 



} 
}

module.exports = Vcs_addmod;
