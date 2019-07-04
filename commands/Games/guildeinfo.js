const Command = require("../../modules/Command.js")

class Guildeinfo extends Command {
constructor(client){
super(client, {
name:"guildeinfo", 
description:"Informations sur la guide où l'utiliteur est.", 
category:"Game", 
usage:"guildeinfo", 
aliases:["ginfo"] 
}) 
} 

run(message, args, level, con) {

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, player) => {
	  
	  if(player.length == 0) return message.channel.send(":x: Cet utilisateur n'est pas inscrit dans le jeu.") 
	   	 	
	 	con.query(`SELECT * FROM ${"guilde"+player[0].guildowner} WHERE ownerid = ${player[0].guildowner}`, (err, rows) => {
	 	
	 	if(err) {
	 	if(err.code === 'ER_NO_SUCH_TABLE') return message.channel.send("Cet utilisateur n'est pas le owner d'une guilde ou n'en a pas.") 
	 	} 
	 	
	 	message.channel.send({embed:{
	 	color:0x010101,
	 	title:rows[0].name,
	 	thumbnail:{
	 	url:message.author.avatarURL
	 	},
	 	fields:[
	 	{
	 	name:"Niveau :", 
	 	value:rows[0].guildlevel
	 	},
	 	{
	 	name:"Xp de guilde :", 
	 	value:rows[0].guildxp
	 	},
	 	{
	 	name:"Propriétaire :", 
	 	value:bot.users.get(rows[0].ownerid).tag
	 	},
	 	{
	 	name:"Nombre de victoires :", 
	 	value:rows[0].victory
	 	},
	 	{
	 	name:"Nombre de défaites :", 
	 	value:rows[0].defeat
	 	},
	 	{
	 	name:"Nombre de membres:", 
	 	value:rows[0].members+"/"+rows[0].maxmember
	 	},
	 	{
	 	name:"Ouvert ?", 
	 	value:rows[0].open === "true" ? "Ouvert" : "Invitation seulement" 
	 	},
	 	]
	 	}}) 
	 	
	 	}) 
	 	}) 
	 	
} 
}

module.exports = Guildeinfo;
