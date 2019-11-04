const Command = require("../../modules/Command.js")

class Guilde extends Command {
constructor(client){
super(client, {
name:"guilde", 
description:"Informations sur la guide où l'utiliteur est.", 
category:"Game", 
usage:"guilde", 
aliases:["g"] 
}) 
} 

run(message, args, level, con) {

if(args.join(" ").length == 0) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Entre une option: \`info, toplvl, to prep, toppui, list\``) 

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, player) => {
	  
	  if(player.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} tu n'es pas inscrit dans le jeu fais +i pour commander le jeu.`) 
	   	 	
	 	con.query(`SELECT * FROM inventory WHERE guildowner = ${player[0].guildowner}`, (err, rows) => {
	 	
                if(args[0] === "info"){

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
	 	} 

                if(args[0] === "toplvl"){

                con.query(`SELECT * FROM inventory WHERE guildname = ${rows[0].guildname} ORDER BY CAST (niveau as SIGNED) DESC LIMIT 50`, (err, member) => {
		
		let resp = ``;

                for(var i in member) {

                if(isNaN(i)) return;

                let u = this.client.users.find(x => x.id === member[i].id)

                resp += `[${parseInt(i)+1}] - ${u.username} - **Niveau: ${member[i].niveau}**\n`

		} 

                message.channel.send({embed:{
                color:0x010101,
                title:"Classement par niveaux", 
		description:`${resp}`, 
		timestamp:new Date(), 
		footer:{
		icon_url:this.client.user.avatarURL,
		text:`©️ Guild toplvl | Xenova `
		} 
		}}) 	

                }) 

                } 
                
                if(args[0] === "toprep"){
				
		let resp = ``;

		con.query(`SELECT rep FROM inventory WHERE guildname = ${rows[0].guildname} ORDER BY CAST (rep as SIGNED) DESC LIMIT 50`, (err, member) => {

                for(var i in member) {

                if(isNaN(i)) return;

                let u = this.client.users.find(x => x.id === member[i].id)

                resp += `[${parseInt(i)+1}] - ${u.username} - **Reps: ${member[i].rep}**\n`

		} 

                message.channel.send({embed:{
                color:0x010101,
                title:"Classement par point de réputations dans la guilde :", 
		description:`${resp}`, 
		timestamp:new Date(), 
		footer:{
		icon_url:this.client.user.avatarURL,
		text:`©️ Guild toprep | Xenova `
		} 
		}}) 	

                }) 

                } 
                
                if(args[0] === "toppui"){
		
		let resp = ``;

		con.query(`SELECT niveau FROM inventory WHERE guildname = ${rows[0].guildname} ORDER BY CAST (pui as SIGNED) DESC LIMIT 50`, (err, member) => {

                for(var i in member) {

                if(isNaN(i)) return;

                let u = this.client.users.find(x => x.id === member[i].id)

                resp += `[${parseInt(i)+1}] - ${u.username} - **Puissance: ${member[i].pui}**\n`

		} 

                message.channel.send({embed:{
                color:0x010101,
                title:"Classement par puissance dans la guilde :", 
		description:`${resp}`, 
		timestamp:new Date(), 
		footer:{
		icon_url:this.client.user.avatarURL,
		text:`©️ Guild toppui | Xenova `
		} 
		}}) 	

                }) 

                } 

                if(args[0] === "list"){
		
		let resp = ``;

		for(var i in rows) {

                if(isNaN(i)) return;

                let u = this.client.users.find(x => x.id === rows[i].id)

                resp += `${u.username} - **Grade: ${rows[i].guildgrade}**\n`

		} 

		message.channel.send({embed:{
		color:0x010101,
		title:`Liste des membres dans la guilde: ${rows[0].guildname}:`, 
		description:`${resp}`, 
		timestamp:new Date(), 
		footer:{
		icon_url:this.client.user.avatarURL,
		text:"© Guilde list members | Xenova" 
		} 
		}}) 

                } 


	 	}) 

                
      }) 
	 	
} 
}

module.exports = Guilde;
