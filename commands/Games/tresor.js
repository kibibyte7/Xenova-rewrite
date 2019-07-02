const Command = require("../../modules/Command.js")

class Tresor extends Command {
constructor(client){
super(client, {
name:"tresor", 
description:"Un trésor à récupérer le plus rapidement possible avec que quelqu'un d'autre le prenne.", 
category:"Game", 
usage:"tresor", 
aliases:["tr", "t", "treasure"] 
}) 
} 

run(message, args, level, con) {

con.query("SELECT * FROM tresor", (err, rows) => {
	 		
	 	
	 	if(rows.length == 0){
	 	
	 	con.query(`INSERT INTO tresor (TEMPS, taker, server) VALUES (${Date.now()+1000*60*5}, 'Xenova', 'Xenova')`, console.log)
	 	
	 	} else {
	 		
	 	var now = new Date().getTime();
	 	var distance = rows[0].TEMPS - now;
   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
   var randtime = Date.now()+Math.floor(Math.random()+(1000*60*15)	) 
	  	 
   if((rows[0].TEMPS > Date.now()) && (rows[0].TEMPS !== 0)){         
      message.channel.send(`Le trésor n'est pas disponible, il le sera dans **${minutes == 0 ? "" : minutes + " minutes"} ${seconds == 0 ? "" : seconds + " secondes"}**, le dernier trésor a été pris par ${rows[0].taker} depuis le serveur ${rows[0].server}\nNOTE: Les messages envoyés par l'utilisateur et le bot sont supprimés pour réduire au maximum leurs nombres.`).then(m => {
      	m.delete(5000)
      	message.delete(5050)
      	}) 
      return;   
	  }else{
	  
	  con.query(`UPDATE tresor SET TEMPS = '${randtime}', taker = '${message.author.username}', server = '${message.guild.name}'`)	  
  	  	
	  con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, player) => {
	 	
	 	var randxp = Math.floor(Math.random()*100)*(player[0].tresors+1)
	   
	  con.query(`UPDATE inventory SET xp = ${parseInt(player[0].xp)+randxp}, tresors = ${parseInt(player[0].tresors)+1} WHERE id = ${message.author.id}`) 	  
	  
	  message.reply(`GG! Tu as eu le trésor, tu as gagné: **${randxp} xp** [COMBO=${player[0].tresors}]`) 
	  	
	  }) 
	  	
	  } 
	 	
	 	} 
	 	
	 	}) 

}

} 

module.exports = Tresor;
