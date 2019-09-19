const Command = require("../../modules/Command.js")

class Give extends Command {
constructor(client){
super(client, {
name:"give", 
description:"Classement par niveau.", 
category:"Game", 
usage:"give <@mention> <ressource> <nombre>", 
aliases:[] 
}) 
} 

run(message, args, level, con) {

var mention = message.mentions.users.first() || this.client.users.find("id", args[0]);

if(!mention) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Entre une mention.`)

con.query(`SELECT * FROM inventory WHERE id = ${mention.id}`, (err, you) => {

if(you.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Cet utilisateur n'est pas inscrit dans le jeu.`)

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, me) => {

function confirmation(nombre, myressource, yourressource, ressource){
	
message.channel.send(`${this.client.emojis.find("name", "typing")} ${message.author} veux-tu vraiment donner **${nombre} de ${ressource == "wood" ? "bois" : args[1]}** à **${mention.username}** ?`).then(m => {

const check = this.client.emojis.find("name", "checkMark")

const wrong = this.client.emojis.find("name", "wrongMark")

const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
var collect = m.createReactionCollector(filter)
	     
collect.on('collect', r => {
	     	
if(r.emoji.name == check.name){
	     		
r.remove(message.author);

con.query(`UPDATE inventory SET ${ressource} = ${myressource-nombre} WHERE id = ${message.author.id}`) 

con.query(`UPDATE inventory SET ${ressource} = ${yourressource+nombre} WHERE id = ${mention.id}`) 
 
m.edit(`${check} ${message.author} Tu as donné **${nombre} de ${ressource}** à **${mention.username}**.`)

m.clearReactions()

} else {
   
m.edit(`${wrong} ${message.author} craft annulé.`)
   
m.clearReactions()

collect.stop();
   
} 

}) 

}) 

}

function givewood() {

if(isNaN(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu dois entrer un nombre après la ressource.`)

if(me[0].wood < parseInt(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Il te manque **${parseInt(args[2])-me[0].wood} de bois**, entre un chiffre dans ton budget.`)
	
confirmation(parseInt(args[2]), me[0].wood, you[0].wood, "wood") 

} 	

function givestone() {

if(isNaN(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu dois entrer un nombre après la ressource.`)

if(me[0].stone < parseInt(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Il te manque **${parseInt(args[2])-me[0].stone} de stone**, entre un chiffre dans ton budget.`)
	
confirmation(parseInt(args[2]), me[0].stone, you[0].stone, "stone") 

} 	

function givefer() {

if(isNaN(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu dois entrer un nombre après la ressource.`)

if(me[0].wood < parseInt(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Il te manque **${parseInt(args[2])-me[0].fer} de fer**, entre un chiffre dans ton budget.`)
	
confirmation(parseInt(args[2]), me[0].fer, you[0].fer, "fer") 

} 	

function givediam() {

if(isNaN(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu dois entrer un nombre après la ressource.`)

if(me[0].wood < parseInt(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Il te manque **${parseInt(args[2])-me[0].diament} de diamants**, entre un chiffre dans ton budget.`)
	
confirmation(parseInt(args[2]), me[0].diament, you[0].diament ,"diament") 

} 	

function giveem() {

if(isNaN(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu dois entrer un nombre après la ressource.`)

if(me[0].wood < parseInt(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Il te manque **${parseInt(args[2])-me[0].emeraude} d'émeraudes**, entre un chiffre dans ton budget.`)
	
confirmation(parseInt(args[2]), me[0].emeraude, you[0].emeraude, "emeraude") 

} 	

function givepp() {

if(isNaN(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu dois entrer un nombre après la ressource.`)

if(me[0].wood < parseInt(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Il te manque **${parseInt(args[2])-me[0].prismes} de prismes-parfaits**, entre un chiffre dans ton budget.`)
	
confirmation(parseInt(args[2]), me[0].prismes, you[0].prismes, "prismes") 

} 	

function giveam() {

if(isNaN(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu dois entrer un nombre après la ressource.`)

if(me[0].wood < parseInt(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Il te manque **${parseInt(args[2])-me[0].antimatter} d'anti-matières**, entre un chiffre dans ton budget.`)
	
confirmation(parseInt(args[2]), me[0].antimatter, you[0].antimatter, "antimatter") 

} 

function giveos() {

if(isNaN(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu dois entrer un nombre après la ressource.`)

if(me[0].osrizk < parseInt(args[2])) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Il te manque **${parseInt(args[2])-me[0].osrizk} d'osrizk**, entre un chiffre dans ton budget.`)
	
confirmation(parseInt(args[2]), me[0].osrizk, you[0].osrizk, "osrizk") 

} 	
	
if(args[1] == "wood") givewood();

else if(args[1] == "stone") givestone();

else if(args[1] == "fer") givefer();

else if(args[1] == "gold") givegold();

else if(args[1] == "diamant") givediam();else if(args[1] == "stone") givestone();

else if(args[1] == "émeraude") giveem();

else if(args[1] == "pp") givepp();

else if(args[1] == "am") giveam();

else if(args[1] == "osrizk") giveos();

else return message.channel.send(`${this.client.emojis.find("name","wrongMark")} ${message.author} entre le nom d'une ressource existante: wood, stone, fer, gold, diamant, émeraude, pp, am, osrizk.`) 

}) 

}) 

} 
} 	

module.exports = Give;
