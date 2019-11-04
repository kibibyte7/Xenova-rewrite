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
	  
if(me[0].guildname !== "Non défini") return message.channel.send(":x: Tu as déjà une guilde.");
	 	  	 	
con.query(`SELECT * FROM inventory WHERE id = ${mention.user.id}`, (err, player) => {
	  
if(player.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Cet utilisateur n'est pas inscrit dans le jeu.`) 

	 	con.query(`SELECT * FROM  WHERE ownerid = `, (err, rows) => {
	 	
	 	if(player[0].guildmembers == player[0].guildmaxmembers) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Cette guilde a atteint son nombre maximum de personnes.`)
 	 
	 	message.channel.send(`${this.client.emojis.find("name", "typing")} ${mention}, ${message.author.tag} Souhaite rejoindre ta guilde, clique sur les réactions pour accepter ou refuser.`).then(m => {

	 	m.react(check)

                setTimeout(() =>{m.react(wrong)}, 1000) 

	        const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == mention.id || reaction.emoji.name == wrong.name && user.id == mention.id;
	     
                var collect = m.createReactionCollector(filter)
      
	 	collect.on('collect', r => {
	     	
                if(r.emoji.name == check.name){
	     		
                r.remove(message.author);

                con.query(`UPDATE inventory SET guildname = '${player[0].guildname}', guildowner = ${player[0].ownerid}, guildgrade = "Membre"`) 

                setTimeout(() => {

                con.query(`SELECT * FROM inventory WHERE guildname = ${player[0].guildname}`,(err, guilde) => {

                guilde.forEach(function(g){

                con.query(`UPDATE inventory SET guildmembers = ${player[0].guildmembers+1}, guildmaxmembers = ${player[0].guildmaxmembers}, guildlevel = ${player[0].guildlevel}, guildxp = ${player[0].guildxp}, guildtotalxp = ${player[0].guildtotalxp}, guildvictory = ${player[0].guildvictory}, guilddefeat = ${player[0].guilddefeat} WHERE id = ${g.id}`) 
                
                }) 

                })
 
                }, 1000)

                m.edit(`${check} ${message.author} a rejoint **${player[0].guildname}**`)
 
                m.clearReactions()

                collect.stop();
 	
                } else {

                m.edit(`${wrong} ${message.author.id} n'a pas été dans la guilde: **${player[0].guildname}**`) 

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
