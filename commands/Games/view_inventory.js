const Command = require("../../modules/Command.js")
const pioches = require("../../pioches.json") 

class View_Inventory extends Command {
constructor(client){
super(client, {
name:"view_inventory", 
description:"Voir l'inventaire de quelqu'un.", 
category:"Game", 
usage:"view_inventory",
permLevel:"XenoOwner", 
aliases:["vi"] 
}) 
} 

run(message, args, level, con) {

con.query(`SELECT * FROM inventory WHERE id = ${args[0]}`, (err, rows) => {

        if(rows.length == 0) return message.channel.send(`${this.client.emojis.find(e => e.name === "wrongMark")} Utilisateur introuvable dans la base de données.`) 

	console.log(rows[0]) 
 
        var pioche = pioches.pioches[rows[0].pickaxe]
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
        value:`Pioche: ${pioche.name} (Level - ${pioche.level})\nArme: ${rows[0].weaponlevel}\nArmure:${rows[0].armorlevel}`
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
	
	});


}
}

module.exports = View_Inventory;
