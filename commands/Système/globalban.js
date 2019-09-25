const Command = require("../../modules/Command.js")

const moment = require("moment");

class Gban extends Command {
constructor(client){
super(client, {
name:"globalban", 
description:"Bannir un utilisateur avec un comportement inapproprié et bannir de potentiels raideurs dans le serveur.", 
category:"Système", 
permLevel:"XenoAdminPerm", 
usage:"globalban check\nglobalban add <id>\nglobalban delete <id>\globalban info <id>", 
aliases:["gban"] 
}) 
} 

run(message, args, level, con) {

const check = this.client.emojis.find("name", "checkMark");

const wrong = this.client.emojis.find("name", "wrongMark");

var mention = message.mentions.users.first() || this.client.users.find("id",args[1])

var id = args[1].length == 18 && !isNaN(args[1])

if(args[0] === "check") {

con.query(`SELECT * FROM gban`, (err, rows) => {
	
if(rows.length < 1){

let users = [];

let reasons = [] 

let resp = ``;

for(var i in rows) {
	
users.push(rows[i].id)

reasons.push(rows[i].reason)

let u = message.guild.members.find("id", rows[i].id);

isNaN(i) ? `` :	resp += `${!u ? "Invalid-user" : u}\n`

} 

message.channel.send({embed:{
color:0xff0c69, 
title:"Utilisateurs trouvés dans la blacklist !", 
description:`${this.client.emojis.find("name", "typing")} Veux-tu vraiment ban: \`${resp}\`?`, 
timestamp:new Date(), 
footer:"©️ Globalban check | Xenova" 
}}).then(m => {
	
m.react(check)

setTimeout(() => {m.react(wrong)}, 1000)

const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
var collect = m.createReactionCollector(filter)
	     
collect.on('collect', r => {
	     	
if(r.emoji.name == check.name){

for(var i in rows){

message.guild.ban(rows[i].id, `${rows[i].reason}`, 7)
	
} 

m.edit(`\`${resp}\`\nOnt été ban !`)

m.clearReactions()

collect.stop();	    
 		
} else {
   
m.edit(`${wrong} ${message.author} ban des gens blacklist annulé.`)
   
m.clearReactions()

collect.stop();
   
} 

}) 

}) 

}else{

message.channel.send(`${wrong} Aucun utilisateurs est blacklist dans ce serveur.`) 

return;

} 
 
}) 

} 

if(args[0] === "add") {

if(level !== 3) return message.channel.send(`${wrong} Tu n'es pas un développeur du bot.`);

con.query(`SELECT * FROM gban WHERE id = ${!mention ? id : mention.id}`, (err, rows) => {

con.query(`UPDATE gban SET id = "${!mention ? id : mention.id}", reason = "${args.slice(2).join(" ")}", date = "${Date.now()}"`) 

message.channel.send(`${check} **${!mention ? id : mention.username}** a été blacklist du bot.`) 

}) 
	
} 
	
if(args[0] === "delete") {

if(level !== 3) return message.channel.send(`${wrong} Tu n'es pas un développeur du bot.`);

con.query(`SELECT * FROM gban WHERE id = ${!mention ? id : mention.id}`, (err, rows) => {

if(rows.length == 0) return message.channel.send(`${wrong} Je n'ai pas trouve cet utilisateur dans la blacklist.`) 
	
con.query(`DELETE FROM gban WHERE id = ${!mention ? id : mention.id} `) 

message.channel.send(`${check} **${!mention ? id : mention.username}** a été unblacklist du bot.`)

}) 	

} 

if(args[0] === "info") {

if(level !== 3) return message.channel.send(`${wrong} Tu n'es pas un développeur du bot.`);

con.query(`SELECT * FROM gban WHERE id = ${!mention ? id : mention.id}`, (err, rows) => {

if(rows.length == 0) return message.channel.send(`${wrong} Je n'ai pas trouvé cet utilisateur dand la blacklist.`) 	

message.channel.send({embed:{
color:0xff0c69, 
title:!mention ? id : mention.username, 
description:`Raison du ban: ${rows[0].reason}\nBanni depuis: **${moment(rows[0].date).locale("fr-FR").fromNow()}**`, 
timestamp:new Date(), 
footer:{
text:"©️ Globalban info | Xenova", 
icon_url:this.client.user.avatarURL	
} 	
}}) 
		
}) 	

} 

} 
} 

module.exports = Gban; 
