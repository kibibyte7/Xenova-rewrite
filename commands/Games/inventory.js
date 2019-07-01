const Command = require("../../modules/Command.js")

class Inventory extends Command {
constructor(client){
super(client, {
name:"inventory", 
description:"Sert à entrer dans le jeu ou montrer l'inventaire", 
category:"Game", 
usage:"inventory", 
aliases:["inv", "i"] 
}) 
} 

run(message, args, level) {

var con = mysql.createConnection({
host:process.env.host, 
user:process.env.user, 
password:process.env.password, 
database:process.env.database 
}) 

con.connect(err => {
if(err) throw err;
console.log("Base de données connecté.") 
}) 

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {
	
	
	let SQL;
	
 let category = 0;	
 
 let guilde = 0;
	
	if(rows.length == 0){
	
	SQL = `INSERT INTO inventory(id, xp, category, guilde ,pickaxe, wood, stone, fer, gold, diament, emeraude, prismes, antimatter, osrizk, attack, defense, niveau, tresors, rep, weaponlevel, pv, armorlevel, kills) VALUES (${message.author.id}, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0)`
	
	con.query(SQL)
	
	
	message.reply("choisi une catégorie de personnage\n❤️ Elfe\n💛 Sorcier\n💜 Orc\n💙 Nain\n☀️ Titan\n❄️ Géant\n🖤 Assassin\n🔥 Berserk\n🌸 Humain\n\nNOTE: Une fois la catégorie choisie, tu ne pourras plus la changer.").then(m => {
		
 m.react("❤") 
 setTimeout(() => {m.react("💛")}, 1000)
 setTimeout(() => {m.react("💜")}, 2000)
 setTimeout(() => {m.react("💙")}, 3000)
 setTimeout(() => {m.react("☀")}, 4000)
 setTimeout(() => {m.react("❄")}, 5000)
 setTimeout(() => {m.react("🖤")}, 6000)
 setTimeout(() => {m.react("🔥")}, 7000)
 setTimeout(() => {m.react("🌸")}, 7000)                      	
	
 const filter = (reaction, user) =>  reaction.emoji.name === "❤" && user.id === message.author.id ||  reaction.emoji.name === "💛" && user.id === message.author.id ||  reaction.emoji.name === "💙" && user.id === message.author.id || reaction.emoji.name === "💜" && user.id === message.author.id || reaction.emoji.name === "☀" && user.id === message.author.id || reaction.emoji.name === "❄" && user.id === message.author.id || reaction.emoji.name === "🖤" && user.id === message.author.id || reaction.emoji.name === "🔥" && user.id === message.author.id || reaction.emoji.name === "🌸" && user.id === message.author.id;
 
 const collect = m.createReactionCollector(filter) 
	
	collect.on("collect", r => {
	
	if(r.emoji.name === "❤") {

	con.query(`UPDATE inventory SET category = 'Elfe' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 75 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
 m.clearReactions();	
	
	m.edit(`${message.author}, tu as choisi la catégorie **Elfe**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
	} 
	
	if(r.emoji.name === "💛") {
	
 con.query(`UPDATE inventory SET category = 'Sorcier' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 75 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
 m.clearReactions();	
	
	m.edit(`${message.author}, tu as choisi la catégorie **Sorcier**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
	} 
	
	if(r.emoji.name === "💜") {
	
 con.query(`UPDATE inventory SET category = 'Orc' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 50 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
 m.clearReactions();	
 
	m.edit(`${message.author}, tu as choisi la catégorie **Orc**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
	} 
	
	if(r.emoji.name === "💙") {
	
	con.query(`UPDATE inventory SET category = 'Nain' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 300 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
 m.clearReactions();	
	
	m.edit(`${message.author}, tu as choisi la catégorie **Nain**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
	} 
	
	if(r.emoji.name === "☀") {
	
	con.query(`UPDATE inventory SET category = 'Titan' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 500 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
 m.clearReactions();	
 
	m.edit(`${message.author}, tu as choisi la catégorie **Titan**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
	} 
	
	if(r.emoji.name === "❄") {
		
	con.query(`UPDATE inventory SET category = 'Géant' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 200 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
 m.clearReactions();	
	
	m.edit(`${message.author}, tu as choisi la catégorie **Géant**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
	} 
	
	if(r.emoji.name === "🖤") {
	
	con.query(`UPDATE inventory SET category = 'Assassin' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 100 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
 m.clearReactions();	
 
	m.edit(`${message.author}, tu as choisi la catégorie **Assassin**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
	} 
	
	if(r.emoji.name === "🔥") {
	
	con.query(`UPDATE inventory SET category = 'Berserk' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 200 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
 m.clearReactions();	
	
	m.edit(`${message.author}, tu as choisi la catégorie **Berserk**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
	} 
	
	if(r.emoji.name === "🌸") {
	
	con.query(`UPDATE inventory SET category = 'Humain' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 50 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
 m.clearReactions();	
	
	m.edit(`${message.author}, tu as choisi la catégorie **Humain**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
	} 
	
	}) 
	
	
	}) 
	
		
	} else {
 
	message.channel.send({embed:{
	author:{
	name:`Inventaire de ${message.author.tag}`	
	}, 
	color:0xff0000, 
	fields:[
	{
 name:"Niveau:", 
 value:rows[0].niveau
	}, 
	{
 name:"Xp:", 
 value:rows[0].xp
	}, 
	{
 name:"❤️ Pv:", 
 value:rows[0].pv
	}, 
	{
 name:"Categorie:", 
 value:rows[0].category == 0 ? "Pas de catégorie" : rows[0].category
	}, 
	{
 name:"Guilde:", 
 value:rows[0].guilde == 0 ? "Aucune guilde" : rows[0].guilde
	},
	{
 name:"Points de réputations:", 
 value:rows[0].rep
	},
	{
 name:"Trésors récupérés:", 
 value:rows[0].tresors
	},        
	{
 name:"Bois:", 
 value:rows[0].wood
	},  
	{
 name:"Pierre:", 
 value:rows[0].stone
	},  
	{
 name:"Fer:", 
 value:rows[0].fer
	},  	
	{
 name:"Gold:", 
 value:rows[0].gold
	},  	
	{
 name:"Diamant:", 
 value:rows[0].diament
	},
	{
 name:"Émeraude:", 
 value:rows[0].emeraude
	},  
	{
 name:"Prismes-parfaits:", 
 value:rows[0].prismes
	},  	
	{
 name:"Anti-matière:", 
 value:rows[0].antimatter
	}, 
	{
 name:"Osrizk:", 
 value:rows[0].osrizk
	}, 
	{
 name:"Monstres tués:", 
 value:rows[0].kills
	},
	{
 name:"Niveau d'arme:", 
 value:rows[0].weaponlevel
	}, 
	{
 name:"Niveau d'armure:", 
 value:rows[0].armorlevel
	}, 
		{
 name:"Attaque:", 
 value:rows[0].attack
	},    
	{
 name:"Défense:", 
 value:rows[0].defense 
	}
	], 
	timestamp:new Date(), 
	thumbnail:{
	url:message.author.avatarURL
	}, 
	footer:{
	icon_url:bot.user.avatarURL,
	text:"© Inventory | Xenova" 
	} 
	
	}})
		
	} 
	
	
	})

        con.query("QUIT");


} 
} 

module.exports = Inventory; 
