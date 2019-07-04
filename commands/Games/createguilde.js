const Command = require("../../modules/Command.js")

class Createguilde extends Command {
constructor(client){
super(client, {
name:"createguilde", 
description:"Créer une guilde.", 
category:"Game", 
usage:"createguilde", 
aliases:[] 
}) 
} 

run(message, args, level, con) {

if(!args || args.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu dois choisir un nom de guilde.`) 

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {
	  	
	  if(rows.length == 0) return message.channel.send(`:x: Tu n'es pas entré dans le jeu fais +i pour t'inscrire.`) 
	  
	  if(rows[0].niveau < 50) return message.channel.send(":x: Tu n'as pas le niveau pour cette fonction, tu dois être niveau 50.");
	  
	  if(rows[0].gold < 10000) return message.channel.send(`:x: Tu n'as pas les ressources nécessaires pour créer une guild, il te faut 10000 de gold.`); 
	  
	  if(parseInt(rows[0].guilde) !== 0) return message.channel.send(":x: Tu as déjà une guilde.") 
	  
	  con.query(`CREATE TABLE ${"guilde"+message.author.id}(name varchar(30), victory INT, defeat INT, guildlevel INT, guildxp INT, maxmember INT, open VARCHAR(30), members INT, ownerid varchar(30))`, (err, row) => {
	  
	  con.query(`INSERT INTO ${"guilde"+message.author.id}(name, victory, defeat, guildlevel, guildxp, maxmember, open, members, ownerid)  VALUES ('${args.join(" ").substring(0, 30)}', 0, 0, 1, 0, 25, 'true', 1, ${message.author.id})`);
	  
	  con.query(`UPDATE inventory SET gold = ${rows[0].gold-10000}, guilde = '${args.join(" ").substring(0, 30)}', guildowner = ${message.author.id} WHERE id = ${message.author.id}`);
	  
	  message.channel.send(`La guilde : **${args.join(" ").substring(0, 30)}**a été créé avec succès.`) 
	  
	  }) 
	  	  
	  }) 
	 	
}

module.exports = Createguilde;
