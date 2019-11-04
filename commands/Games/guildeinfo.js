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
	  
	  if(player.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} tu n'es pas inscrit dans le jeu fais +i pour commander le jeu.`) 
	   	 	
	 	con.query(`SELECT * FROM inventory WHERE guildowner = ${player[0].guildowner}`, (err, rows) => {
	 	
	 	message.channel.send({embed:{
	 	color:0x010101,
	 	title:rows[0].guildname,
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
	 	value:rows[0].guildtotalxp
	 	},
	 	{
	 	name:"Propriétaire :", 
	 	value:this.client.users.get(rows[0].guildowner).tag
	 	},
	 	{
	 	name:"Nombre de victoires :", 
	 	value:rows[0].guildvictory
	 	},
	 	{
	 	name:"Nombre de défaites :", 
	 	value:rows[0].guilddefeat
	 	},
	 	{
	 	name:"Nombre de membres:", 
	 	value:rows.length+"/"+rows[0].guildmaxmembers
	 	}
	 	]
	 	}}) 
	 	
	 	}) 
	 	}) 
	 	
} 
}

module.exports = Guildeinfo;
