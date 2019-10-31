const Command = require("../../modules/Command.js") 

class Vcs_tempban extends Command {
constructor (client) {
super(client, {
name:"vcs_tempban",
category:"Vcs", 
FRdescription:"Bannir temporairement quelqu'un de la discussion interserveur.",
FRusage:"vcs_tempban <id> <days> <raison>",
aliases:[] 
})
} 


run(message, args, level, con) {

if(!args[0]) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Entre une id à ban.`)

var id = this.client.findUserById(args[0]);

var days = 1000*60*60*24*parseInt(args[1]);

var reason = args.slice(2).join(" ");

con.query(`SELECT * FROM vcs_user WHERE id = ${message.author.id}`, (err, rows) => {

if(rows.length == 0) return;

if(level !== 3 || rows[0].grade !== `${this.client.findEmoteByName("Modo")} Modérateur`) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Tu n'es pas modérateur du vcs.`)

if(!id) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Entre une id valide.`)

if(isNaN(args[1]) || ! args[1]) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Entre un nombre de jour.`)

if(!args[2]) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Entre une raison.`)

con.query(`SELECT * FROM vcs_user WHERE id = ${id}`, (err, rows) => {

con.query(`UPDATE vcs_user SET banned = "true", bannedtime = ${new Date()}, bannedto = ${new Date().getTime()+days} WHERE id = ${id}`)

message.channel.send(`**${id.username}** a été banni pour : **${reason}** pendant une période de: **${days/(1000*60*60*24)} jours**.`)

}) 

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
description:`**${id.username}** a été banni pour : **${reason}** pendant une période de: **${days/(1000*60*60*24)} jours**.`,
timestamp:new Date(), 
footer:{
icon_url:this.client.user.avatarURL,
text:"© Système vcs | Xenova" 
} 
}}) 

} 	
	
}) 


} 
}

module.exports = Vcs_tempban;
