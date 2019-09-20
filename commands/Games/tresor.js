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
	 	
	 	con.query(`INSERT INTO tresor (temps, taker, server) VALUES (${Date.now()+1000*60*5}, 'Xenova', 'Xenova')`, console.log)
	 	
	 	} else {
	 		
	 	var now = new Date().getTime();
	 	var distance = rows[0].temps - now;
   var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
   var seconds = Math.floor((distance % (1000 * 60)) / 1000);
   var randtime = Date.now()+Math.floor(Math.random()*1000*60*40) 
	  	 
   if((rows[0].temps > Date.now()) && (rows[0].temps !== 0)){  
      con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, player) => {
      message.channel.send(`Le trésor n'est pas disponible, il le sera dans **${minutes == 0 ? "" : minutes + " minutes"} ${seconds == 0 ? "" : seconds + " secondes"}**, tu l'as récupéré **${player[0].tresors}x**, le dernier trésor a été pris par ${rows[0].taker == "Xenova"? "Xenova" : this.client.users.find("id", `${rows[0].taker}`).tag} depuis le serveur ${rows[0].server == "Xenova" ? "Xenova Support" : rows[0].server}\nNOTE: Les messages envoyés par l'utilisateur et le bot sont supprimés pour réduire au maximum leurs nombres.`).then(m => {
      	m.delete(5000)
      	message.delete(5050)
      	}) 
      return; 
      }) 
	  }else{
	  
	  con.query(`UPDATE tresor SET temps = '${randtime}', taker = ${message.author.id}, server = "${message.guild.name}"`)	  
  	  	
	  con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, player) => {
	 
          if(player.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu n'es pas entré dans le jeu fais +i pour t'inscrire.`) 
	
          var randxp = Math.floor(Math.random()*100)*(player[0].tresors+1)
	   
          var randpp = Math.floor(Math.random()*15)*(player[0].tresors+1)
	  
          var randam = Math.floor(Math.random()*5)*(player[0].tresors+1)
	  
          var randgold = Math.floor(Math.random()*10)*(player[0].tresors+1)
	    
	  con.query(`UPDATE inventory SET xp = ${parseInt(player[0].xp)+randxp}, totalxp = ${parseInt(player[0].totalxp)+randxp}, gold = ${parseInt(player[0].gold)+randgold}, prismes = ${parseInt(player[0].prismes) + randpp}, prismes = ${parseInt(player[0].antimatter) + randam}, tresors = ${parseInt(player[0].tresors)+1} WHERE id = ${message.author.id}`) 	  
    	
    	  const nxtLvl = Math.floor(0.1 * Math.sqrt(player[0].xp));
    	
	  if(player[0].niveau < nxtLvl) con.query(`UPDATE inventory SET niveau = ${parseInt(player[0].niveau)+1}, xp = 0, maxmana = ${parseInt(player[0].maxmana)+5}, attack = ${parseInt(player[0].attack)+3}, defense = ${parseInt(player[0].defense)+3}, pui = ${parseInt(player[0].pui) + 6} WHERE id = ${message.author.id}`)
	  
	  message.reply(`GG! Tu as eu le trésor, tu as gagné: **${randgold} Gold**, **${randpp} Prismes-parfaits**, **${randam} Anti-matières** et **${randxp} xp** ! [COMBO: ${player[0].tresors}]`) 
	  	
	  }) 
	  	
	  } 
	 	
	 	} 
	 	
	 	}) 

}

} 

module.exports = Tresor;
