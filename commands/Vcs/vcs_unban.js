const Command = require("../../modules/Command.js") 

class Vcs_unban extends Command {
constructor (client) {
super(client, {
name:"vcs_unban",
category:"Vcs", 
FRdescription:"Débannir quelqu'un de la discussion interserveur.",
FRusage:"vcs_unban <id>",
aliases:[] 
})
} 

run(message, args, level, con) {

if(!args[0]) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Entre une id à ban.`)

var id = this.client.findUserById(args[0]);

con.query(`SELECT * FROM vcs_user WHERE id = ${message.author.id}`, (err, rows) => {

if(rows.length == 0) return;

if(level == 3 || rows[0].grade === `${this.client.findEmoteByName("Modo")} Modérateur`){

if(!id) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Entre une id valide.`)

con.query(`SELECT * FROM vcs_user WHERE id = ${id}`, (err, rows) => {

con.query(`UPDATE vcs_user SET banned = false, bannedtime = "Non défini", bannedto = "Non défini" WHERE id = ${id.id}`)

message.channel.send(`**${id.username}** a été débanni du vcs.`)

}) 

con.query(`SELECT * FROM vcs`, (err, chan) => {
	
for(var i in chan){

if(isNaN(i)) return;

this.client.findChannelById(chan[i].id).send({embed:{
title:"Système :", 
color:Math.floor(Math.random() * 16777214) + 1,
thumbnail:{
url:this.client.user.avatarURL	
}, 
description:`**${id.username}** a été débanni du vcs.`,
timestamp:new Date(), 
footer:{
icon_url:this.client.user.avatarURL,
text:"© Système vcs | Xenova" 
} 
}}) 

} 	
	
}) 

} else {

message.channel.send(`${this.client.findEmoteByName("wrongMark")} Tu n'es pas modérateur du vcs.`)

} 

}) 

} 
}

module.exports = Vcs_unban;
