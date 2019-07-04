const Command = require("../../modules/Command.js")

class Joinguilde extends Command {
constructor(client){
super(client, {
name:"joinguilde", 
description:"Rejoindre une guide.", 
category:"Game", 
usage:"joinguilde <@mention>", 
aliases:["jguilde"] 
}) 
} 

run(message, args, level, con) {

const check = this.client.emojis.find("name", "checkMark")

const wrong = this.client.emojis.find("name", "wrongMark")
	
let mention = message.mentions.members.first();

if(!mention) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Mentionne un utilisateur.`); 

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, me) => {

if(me.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Cet utilisateur n'est pas inscrit dans le jeu.`) 

if(me[0].niveau < 40) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu n'as pas le niveau pour cette fonction, tu dois être niveau 40.`);
	  
if(parseInt(me[0].guilde) !== 0) return message.channel.send(":x: Tu as déjà une guilde.");
	 	  	 	
con.query(`SELECT * FROM inventory WHERE id = ${mention.user.id}`, (err, player) => {
	  
if(player.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Cet utilisateur n'est pas inscrit dans le jeu.`) 

	 	con.query(`SELECT * FROM ${"guilde"+mention.user.id} WHERE ownerid = ${mention.user.id}`, (err, rows) => {
	 	
	 	if(rows[0].members == rows[0].maxmember) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Cette guilde a atteint son nombre maximum de personnes.`)
 	 
 	 if(rows[0].open !== "true") return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu peux rejoindre cette guilde uniquement par invitation.`) 
 	 	
	 	if(err) {
	 	if(err.code === 'ER_NO_SUCH_TABLE') return message.channel.send(`Cet utilisateur n'est pas le owner d'une guilde ou n'en a pas.`) 
	 	} 
	 	
	 	message.channel.send(`${this.client.emojis.find("name", "typing")} ${mention}, ${message.author.tag} Souhaite rejoindre ta guilde, clique sur les réactions pour accepter ou refuser.`).then(m => {
	 	m.react(check)
                setTimeout(() =>{m.react(wrong)}) 
	  const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == mention.id || reaction.emoji.name == wrong.name && user.id == mention.id;
	     
   var collect = m.createReactionCollector(filter)
      
	 	collect.on('collect', r => {
	     	
 if(r.emoji.name == check.name){
	     		
 r.remove(message.author);

 con.query(`UPDATE inventory SET guilde = '${rows[0].name}', guildowner = ${rows[0].ownerid}`) 

 con.query(`UPDATE ${"guilde"+mention.id} SET members = ${parseInt(rows[0].members)+1}`)
 
 m.edit(`${check} ${message.author} a rejoint **${rows[0].name}**`)
 
 m.clearReactions()

 collect.stop();
 	
} else {

m.edit(`${mention.user.tag} `) 

m.clearReactions();

collect.stop();

} 
	 	
}) 
	 	
}) 

}) 

}) 

}) 

} 
}

module.exports = Joinguilde;
