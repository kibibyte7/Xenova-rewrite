const Command = require("../../modules/Command.js")

class Mine extends Command {
constructor(client){
super(client, {
name:"mine", 
description:"Miner des ressources.", 
category:"Game", 
usage:"mine", 
aliases:["m", "mi"] 
}) 
} 

run(message, args, level, con) {

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {
	  
	  if(rows.length == 0) return message.channel.send("Tu n'es pas entré dans le jeu, fais +i pour t'inscrire.")
	  
	  })
	  
	  var chance = Math.floor(Math.random() *100)+10
	  
	 	function wood(){
	 	
	 	con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {
	 	
	 	if(rows[0].mana == 0 || rows[0].mana < 0) return message.reply("Tu n'as plus de mana.") 
	  
	 	var randwood = Math.floor(Math.random()*4*rows[0].pickaxe)+1
	 	
	 	var randxp = Math.floor(Math.random()*10*rows[0].pickaxe+1)
	 	
	 	con.query(`UPDATE inventory SET mana = ${parseInt(rows[0].mana)-1}, wood = ${parseInt(rows[0].wood)+randwood}, xp = ${parseInt(rows[0].xp)+randxp} WHERE id = ${message.author.id}`)
	 	
	 	const nxtLvl = 500 * (Math.pow(2, rows[0].xp) - 1);

	 	if(rows[0].xp > nxtLvl) con.query(`UPDATE inventory SET niveau = ${parseInt(rows[0].niveau)+1} WHERE id = ${message.author.id}`)
	  
	 	message.reply(`tu as miné ${randwood} **wood** et gagné ${randxp} xp ! [Mana restant : **${rows[0].mana}/${rows[0].maxmana}**]`) 
	 	
	 	}) 
	 	
	 	} 
	 	
	 	function stone(){
	 		
	 	con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {
	 	
	 	if(rows[0].mana == 0 || rows[0].mana < 0) return message.reply("Tu n'as plus de mana.") 
	  
	 	var randstone = Math.floor(Math.random()*4*rows[0].pickaxe)+1
	 	
	 	var randxp = Math.floor(Math.random()*10*rows[0].pickaxe+1)
	 	
	 	con.query(`UPDATE inventory SET mana = ${parseInt(rows[0].mana)-1}, stone = ${parseInt(rows[0].stone)+randstone}, xp = ${parseInt(rows[0].xp)+randxp} WHERE id = ${message.author.id}`)
	 	
	 	const nxtLvl = 500 * (Math.pow(2, rows[0].xp) - 1);

	 	if(rows[0].xp > nxtLvl) con.query(`UPDATE inventory SET niveau = ${parseInt(rows[0].niveau)+1} WHERE id = ${message.author.id}`)
	  
	 	message.reply(`tu as miné ${randstone} **stone** et gagné ${randxp} xp ! [Mana restant : **${rows[0].mana}/${rows[0].maxmana}**]`) 
	 	
	 	}) 
	 	
	 	} 
	 	
	 	function fer(){
	 		
   con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {
	 	
	 	if(rows[0].mana == 0 || rows[0].mana < 0) return message.reply("Tu n'as plus de mana.") 
	  
	 	var randfer = Math.floor(Math.random()*4*rows[0].pickaxe)+1
	 	
	 	var randxp = Math.floor(Math.random()*10*rows[0].pickaxe+1)
	 	
	 	con.query(`UPDATE inventory SET mana = ${parseInt(rows[0].mana)-1}, fer = ${parseInt(rows[0].fer)+randfer}, xp = ${parseInt(rows[0].xp)+randxp} WHERE id = ${message.author.id}`)
	 	
	 	const nxtLvl = 500 * (Math.pow(2, rows[0].xp) - 1);

	 	if(rows[0].xp > nxtLvl) con.query(`UPDATE inventory SET niveau = ${parseInt(rows[0].niveau)+1} WHERE id = ${message.author.id}`)
	  
	 	message.reply(`tu as miné ${randfer} **fer** et gagné ${randxp} xp ! [Mana restant : **${rows[0].mana}/${rows[0].maxmana}**]`) 
	 	
	 	}) 
	 	
	 	} 
	 	
	 	function gold(){
	 		
	 	con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {
	 	
	 	if(rows[0].mana == 0 || rows[0].mana < 0) return message.reply("Tu n'as plus de mana.") 
	  
	 	var randgold = Math.floor(Math.random()*4*rows[0].pickaxe)+1
	 	
	 	var randxp = Math.floor(Math.random()*10*rows[0].pickaxe+1)
	 	
	 	con.query(`UPDATE inventory SET mana = ${parseInt(rows[0].mana)-1}, gold = ${parseInt(rows[0].gold)+randgold}, xp = ${parseInt(rows[0].xp)+randxp} WHERE id = ${message.author.id}`)
	 	
	 	const nxtLvl = 500 * (Math.pow(2, rows[0].xp) - 1);

	 	if(rows[0].xp > nxtLvl) con.query(`UPDATE inventory SET niveau = ${parseInt(rows[0].niveau)+1} WHERE id = ${message.author.id}`)
	  
	 	message.reply(`tu as miné ${randgold} **gold** et gagné ${randxp} xp ! [Mana restant : **${rows[0].mana}/${rows[0].maxmana}**]`) 
	 	
	 	}) 
	 	
	 	} 
	 	
	 	function diamant(){
	 	
	 	con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {
	 	
	 	if(rows[0].mana == 0 || rows[0].mana < 0) return message.reply("Tu n'as plus de mana.") 
	  
	 	var randdiam = Math.floor(Math.random()*4*rows[0].pickaxe)+1
	 	
	 	var randxp = Math.floor(Math.random()*10*rows[0].pickaxe+1)
	 	
	 	con.query(`UPDATE inventory SET mana = ${parseInt(rows[0].mana)-1}, diament = ${parseInt(rows[0].diament)+randdiam}, xp = ${parseInt(rows[0].xp)+randxp} WHERE id = ${message.author.id}`)
	 	
	 	const nxtLvl = 500 * (Math.pow(2, rows[0].xp) - 1);

	 	if(rows[0].xp > nxtLvl) con.query(`UPDATE inventory SET niveau = ${parseInt(rows[0].niveau)+1} WHERE id = ${message.author.id}`)
	  
	 	message.reply(`tu as miné ${randdiam} *diamant** et gagné ${randxp} xp ! [Mana restant : **${rows[0].mana}/${rows[0].maxmana}**]`) 
	 	
	 	}) 
	 	
	 	} 
	 	
	 	function emeraude(){
	 	
	 	con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {
	 	
	 	if(rows[0].mana == 0 || rows[0].mana < 0) return message.reply("Tu n'as plus de mana.") 
	  
	 	var randem = Math.floor(Math.random()*4*rows[0].pickaxe)+1
	 	
	 	var randxp = Math.floor(Math.random()*10*rows[0].pickaxe+1)
	 	
	 	con.query(`UPDATE inventory SET mana = ${parseInt(rows[0].mana)-1}, emeraude = ${parseInt(rows[0].emeraude)+randem}, xp = ${parseInt(rows[0].xp)+randxp} WHERE id = ${message.author.id}`)
	 	
	 	const nxtLvl = 500 * (Math.pow(2, rows[0].xp) - 1);

	 	if(rows[0].xp > nxtLvl) con.query(`UPDATE inventory SET niveau = ${parseInt(rows[0].niveau)+1} WHERE id = ${message.author.id}`)
	  
	 	message.reply(`tu as miné ${randem} **émeraude** et gagné ${randxp} xp ! [Mana restant : **${rows[0].mana}/${rows[0].maxmana}**]`) 
	 	
	 	}) 
	 	
	 	} 
	 	
	 	function prismes(){
	 	
	 	con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {
	 	
	 	if(rows[0].mana == 0 || rows[0].mana < 0) return message.reply("Tu n'as plus de mana.") 
	  
	 	var randpp = Math.floor(Math.random()*1*rows[0].pickaxe)+5
	 	
	 	var randxp = Math.floor(Math.random()*10*rows[0].pickaxe+100)
	 	
	 	con.query(`UPDATE inventory SET mana = ${parseInt(rows[0].mana)-1}, prismes = ${parseInt(rows[0].prismes)+randpp}, xp = ${parseInt(rows[0].xp)+randxp} WHERE id = ${message.author.id}`)
	 	
	 	const nxtLvl = 500 * (Math.pow(2, rows[0].xp) - 1);

	 	if(rows[0].xp > nxtLvl) con.query(`UPDATE inventory SET niveau = ${parseInt(rows[0].niveau)+1} WHERE id = ${message.author.id}`)
	  
	 	message.reply(`tu as miné ${randpp} **prismes-parfaits [RARE]** et gagné ${randxp} xp ! [Mana restant : **${rows[0].mana}/${rows[0].maxmana}**]`) 
	 	
	 	}) 
	 	
	 	} 
	 	
	 	function antimatter(){
	 	 	
	 	con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {
	 	
	 	if(rows[0].mana == 0 || rows[0].mana < 0) return message.reply("Tu n'as plus de mana.") 
	  
	 	var randam = Math.floor(Math.random()*1*rows[0].pickaxe)+5
	 	
	 	var randxp = Math.floor(Math.random()*10*rows[0].pickaxe+200)
	 	
	 	con.query(`UPDATE inventory SET mana = ${parseInt(rows[0].mana)-1}, antimatter = ${parseInt(rows[0].antimatter)+randam}, xp = ${parseInt(rows[0].xp)+randxp} WHERE id = ${message.author.id}`)
	 	
	 	const nxtLvl = 500 * (Math.pow(2, rows[0].xp) - 1);

	 	if(rows[0].xp > nxtLvl) con.query(`UPDATE inventory SET niveau = ${parseInt(rows[0].niveau)+1} WHERE id = ${message.author.id}`)
	  
	 	message.reply(`tu as miné ${randam} **anti-matière [SUPER-RARE]** et gagné ${randxp} xp ! [Mana restant : **${rows[0].mana}/${rows[0].maxmana}**]`) 
	 	
	 	}) 
	 	
	 	}
	 	 
	 	function osrizk(){
	 	
	 	con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {
	 	
	 	if(rows[0].mana == 0 || rows[0].mana < 0) return message.reply("Tu n'as plus de mana.") 
	  
	 	var randos = Math.floor(Math.random()*1*rows[0].pickaxe)+5
	 	
	 	var randxp = Math.floor(Math.random()*10*rows[0].pickaxe+500)
	 	
	 	con.query(`UPDATE inventory SET mana = ${parseInt(rows[0].mana)-1}, osrizk = ${parseInt(rows[0].osrizk)+randos}, xp = ${parseInt(rows[0].xp)+randxp} WHERE id = ${message.author.id}`)
	 	
	 	const nxtLvl = 500 * (Math.pow(2, rows[0].xp) - 1);

	 	if(rows[0].xp > nxtLvl) con.query(`UPDATE inventory SET niveau = ${parseInt(rows[0].niveau)+1} WHERE id = ${message.author.id}`)
	  
	 	message.reply(`tu as miné ${randos} **osrizk [LÉGENDAIRE]** et gagné ${randxp} xp ! [Mana restant : **${rows[0].mana}/${rows[0].maxmana}**]`) 
	 	
	 	}) 
	 	
	 	} 
	 	
	 	if(chance > 90) wood();
	 	
	 	else if(chance > 80) stone();
	 	
	 	else if(chance > 70) fer();
	 	
	 	else if(chance > 60) gold();
	 	
	 	else if(chance > 49) diamant();
	 	
	 	else if(chance > 35) emeraude();
	 	 	
	 	else if(chance > 20) prismes();
	 	 
	 	else if(chance > 13) antimatter();
	 	
	 	else  osrizk();
	 
}

}

module.exports = Mine;
