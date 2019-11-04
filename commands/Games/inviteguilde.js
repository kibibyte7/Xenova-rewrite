const Command = require("../../modules/Command.js")

class Inviteguilde extends Command {
constructor(client){
super(client, {
name:"inviteguilde", 
description:"Inviter quelqu'un dans sa guilde une guide.", 
category:"Game", 
usage:"inviteguilde <@mention>", 
aliases:["iguilde"] 
}) 
} 

run(message, args, level, con) {

const check = this.client.emojis.find("name", "checkMark")

const wrong = this.client.emojis.find("name", "wrongMark")
	
let mention = message.mentions.members.first();

if(!mention) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Mentionne un utilisateur.`); 

//me
con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, me) => {

if(me.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu n'es pas inscrit dans le jeu. Fais \`${this.client.config.defaultSettings.prefix}i\``) 

if(me[0].guildname === "Non défini") return message.channel.send(":x: Tu as pas de guilde.");

//you	 	  	 	
con.query(`SELECT * FROM inventory WHERE id = ${mention.user.id}`, (err, player) => {
	  
if(player.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Cet utilisateur n'est pas inscrit dans le jeu.`) 

if(player[0].guildname !== null){

if(me[0].guildmembers == me[0].guildmaxmembers) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Ta guilde a atteint son nombre maximum de personnes.`)

//Confirmation	 
message.channel.send(`${this.client.emojis.find("name", "typing")} ${mention}, ${message.author.tag} Souhaite que tu rejoigne sa guilde, clique sur les réactions pour accepter ou refuser.`).then(m => {

m.react(check)

setTimeout(() =>{m.react(wrong)}, 1000) 

const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == mention.id || reaction.emoji.name == wrong.name && user.id == mention.id;
	     
var collect = m.createReactionCollector(filter)
      
collect.on('collect', r => {
	     	
if(r.emoji.name == check.name){
	     		
r.remove(message.author);

con.query(`UPDATE inventory SET guildname = '${me[0].guildname}', guildowner = ${me[0].guildowner}, guildgrade = "Membre" WHERE id = ${mention.user.id}`) 

setTimeout(() => {

con.query(`SELECT * FROM inventory WHERE guildname = ${me[0].guildname}`,(err, guilde) => {

for(var i in guilde){

con.query(`UPDATE inventory SET guildmembers = ${me[0].guildmembers+1}, guildmaxmembers = ${me[0].guildmaxmembers}, guildlevel = ${me[0].guildlevel}, guildxp = ${me[0].guildxp}, guildtotalxp = ${me[0].guildtotalxp}, guildvictory = ${me[0].guildvictory}, guilddefeat = ${me[0].guilddefeat} WHERE id = ${guilde[i].id}`) 
                
} 

})
 
}, 1000)

m.edit(`${check} ${mention} a rejoint: **${me[0].guildname}**`)
 
m.clearReactions();

collect.stop();
 	
} else {

m.edit(`${wrong} ${mention} a refusé l'invitation pour aller dans la guilde: **${me[0].guildname}**`) 

m.clearReactions();

collect.stop();

}  
	
}) 
	 	
}) 

} else {

message.channel.send(":x: Cet utilisateur a déjà une guilde.");
	 	
} 

}) 

}) 

} 
}

module.exports = Inviteguilde;
