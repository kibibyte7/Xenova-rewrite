const Command = require("../../modules/Command.js")
const pioches = require("../../pioches.json") 
const epees = require("../../epee.json") 
const boucliers = require("../../bouclier.json")

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

run(message, args, level, con) {

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {
	
	
	let SQL;
	
 let category = 0;	
 
 let guilde = 0;
	
	if(rows.length == 0){
	try{
	SQL = `INSERT INTO inventory(id, xp, totalxp, mana, maxmana, pui, category, guildname, guildowner, guildlevel, guildmembers, guildmaxmembers, guildxp, guildtotalxp, pickaxe, wood, stone, fer, gold, diament, emeraude, prismes, antimatter, osrizk, attack, defense, niveau, tresors, rep, weaponlevel, pv, armorlevel, kills, atk_fragments, def_fragments, pick_fragments, armor_fragments, atk_enchant, def_enchant, pick_enchant, armor_enchant) VALUES (${message.author.id}, 0, 0, 25, 25, "null", "null", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)`

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
 setTimeout(() => {m.react("🌸")}, 8000)                      	
	
 const filter = (reaction, user) =>  reaction.emoji.name === "❤" && user.id === message.author.id ||  reaction.emoji.name === "💛" && user.id === message.author.id ||  reaction.emoji.name === "💙" && user.id === message.author.id || reaction.emoji.name === "💜" && user.id === message.author.id || reaction.emoji.name === "☀" && user.id === message.author.id || reaction.emoji.name === "❄" && user.id === message.author.id || reaction.emoji.name === "🖤" && user.id === message.author.id || reaction.emoji.name === "🔥" && user.id === message.author.id || reaction.emoji.name === "🌸" && user.id === message.author.id;
 
 const collect = m.createReactionCollector(filter) 
	
	collect.on("collect", r => {
	
	if(r.emoji.name === "❤") {

	con.query(`UPDATE inventory SET category = 'Elfe' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 75, attack = 50, defense = 50, pui = 100 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
        m.clearReactions();	
	
	m.edit(`${message.author}, tu as choisi la catégorie **Elfe**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
	} 
	
	if(r.emoji.name === "💛") {
	
        con.query(`UPDATE inventory SET category = 'Sorcier' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 75, attack = 125, defense = 25, pui = 150 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
        m.clearReactions();	
	
	m.edit(`${message.author}, tu as choisi la catégorie **Sorcier**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
	} 
	
	if(r.emoji.name === "💜") {
	
        con.query(`UPDATE inventory SET category = 'Orc' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 50, attack = 25, defense = 75 pui = 100 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
        m.clearReactions();	
 
	m.edit(`${message.author}, tu as choisi la catégorie **Orc**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
        
	} 
	
	if(r.emoji.name === "💙") {
	
	con.query(`UPDATE inventory SET category = 'Nain' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 300, attack = 75, defense =  150, pui = 225 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
        m.clearReactions();	
	
	m.edit(`${message.author}, tu as choisi la catégorie **Nain**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)

	
	} 
	
	if(r.emoji.name === "☀") {
	
	con.query(`UPDATE inventory SET category = 'Titan' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 500, attack = 100, defense = 750, pui = 850 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
        m.clearReactions();	
 
	m.edit(`${message.author}, tu as choisi la catégorie **Titan**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
        
	} 
	
	if(r.emoji.name === "❄") {
		
	con.query(`UPDATE inventory SET category = 'Géant' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 200, attack = 25, defense = 500, pui = 525 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
        m.clearReactions();	
	
	m.edit(`${message.author}, tu as choisi la catégorie **Géant**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
        
	} 
	
	if(r.emoji.name === "🖤") {
	
	con.query(`UPDATE inventory SET category = 'Assassin' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 100, attack = 200, defense = 50, pui = 250 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
        m.clearReactions();	
 
	m.edit(`${message.author}, tu as choisi la catégorie **Assassin**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
        
	} 
	
	if(r.emoji.name === "🔥") {
	
	con.query(`UPDATE inventory SET category = 'Berserk' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 200, attack = 150, defense = 100, pui = 250 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
        m.clearReactions();	
	
	m.edit(`${message.author}, tu as choisi la catégorie **Berserk**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
        
	} 
	
	if(r.emoji.name === "🌸") {
	
	con.query(`UPDATE inventory SET category = 'Humain' WHERE id = ${message.author.id}`, console.log)	
	
	con.query(`UPDATE inventory SET pv = 50, attack = 25, defense = 75, pui 100 WHERE id = ${message.author.id}`) 
	
	collect.stop()
	
        m.clearReactions();	
	
	m.edit(`${message.author}, tu as choisi la catégorie **Humain**, ton inscription est terminé fais la même commande pour voir ton inventaire.`)
	
	} 
	
	}) 
	
        
	}) 
        } catch (e) {
        message.channel.send(`Une erreur est survenue : ${e}`) 
        } 
	} else {
        var pioche = pioches.pioches[rows[0].pickaxe]
        var epee = epees.epee[rows[0].weaponlevel]
	var bouclier = boucliers.bouclier[rows[0].armorlevel]
	message.channel.send({embed:{
	author:{
	name:`Inventaire de ${message.author.tag}`	
	}, 
	color:0xff0000, 
	fields:[
        {
        name:"✨ Mana", 
        value:rows[0].mana+"/"+rows[0].maxmana
        }, 
	{
        name:"🌀 Niveau:", 
        value:rows[0].niveau
	}, 
	{
        name:"🌟 Xp:", 
        value:rows[0].totalxp
	}, 
	{
        name:"❤️ Pv:", 
        value:rows[0].pv
	}, 
	{
        name:"⚡ Categorie:", 
        value:rows[0].category == 0 ? "Pas de catégorie" : rows[0].category
	}, 
	{
        name:"🏢 Guilde:", 
        value:rows[0].guildname == "null" ? "Aucune guilde" : rows[0].guildname
	},
	{
        name:"⭐ Points de réputations:", 
        value:rows[0].rep
	},
	{
        name:"💲 Trésors récupérés:", 
        value:rows[0].tresors
	},        
	{
        name:"💎 Ressources principales:", 
        value:`Bois: ${rows[0].wood}\nPierre: ${rows[0].stone}\nFer: ${rows[0].fer}`
	},  	
	{
        name:"💎 Ressources secondaires:", 
        value:`Gold: ${rows[0].gold}\nDiamant: ${rows[0].diament}\nÉmeraude: ${rows[0].emeraude}`
	},  
	{
        name:"💎 Ressources tertiaires", 
        value:`Prismes-parfaits: ${rows[0].prismes}\nAnti-matières: ${rows[0].antimatter}\nOsrizk: ${rows[0].osrizk}`
	}, 
        {
        name:"⚒️ Items:", 
        value:`Pioche: ${pioche.name} (Level - ${pioche.level})\nArme: ${epee.name} - (Level - ${epee.level})\nBouclier: ${bouclier.name} (Level - ${bouclier.level})`
	}, 
	{
        name:"⚔️ Stats:", 
        value:`Attaque: ${rows[0].attack}\nDéfense: ${rows[0].defense}\nPuisance totale: ${rows[0].pui}\nMonstres tués: ${rows[0].kills}`
	}
	], 
	timestamp:new Date(), 
	thumbnail:{
	url:message.author.avatarURL
	}, 
	footer:{
	icon_url:this.client.user.avatarURL,
	text:"© Inventory | Xenova" 
	} 
	
	}})
		
	} 
	
	});

        
} 
} 

module.exports = Inventory; 
