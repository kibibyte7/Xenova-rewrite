const Command = require("../../modules/Command.js")
const pioches = require("../../pioches.json")

class Craft extends Command {
constructor(client){
super(client, {
name:"craft", 
description:"Améliorer la pioche", 
category:"Game", 
usage:"craft <objet>", 
aliases:["fabriquer"] 
}) 
} 

run(message, args, level, con) {

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id} `, (err, rows) => {
   
if(rows.length == 0) return message.channel.send("Tu n'es pas entré dans le jeu, fais +i pour t'inscrire.")
	  
if(!args[0] || args.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} ${message.author}, spécifié un objet à crafter entre: **pioche, épée, bouclier**`);

if(args[0] === "pioche") {
		
   console.log(pioches.pioches[rows[0].pickaxe+1].cost)
   
   var cost = pioches.pioches[rows[0].pickaxe+1].cost[0]
   
   var nextpioche = pioches.pioches[rows[0].pickaxe+1].name;
   
   var wood = cost.wood == undefined ? 0 : cost.wood;
   
   var stone = cost.stone == undefined ? 0 : cost.stone;
   
   var fer = cost.fer == undefined ? 0 : cost.fer;
   
   var gold = cost.gold == undefined ? 0 : cost.gold;
   
   var diamant = cost.diamant == undefined ? 0 : cost.diamant;
   
   var emeraude = cost.emeraude == undefined ? 0 : cost.emeraude;
   
   var prismes = cost.prismes == undefined ? 0 : cost.prismes;
   
   var antimatter = cost.antimatter == undefined ? 0 : cost.antimatter;
   
   var osrizk = cost.osrizk == undefined ? 0 : cost.osrizk;
   
   const check = this.client.emojis.find("name", "checkMark")

   const wrong = this.client.emojis.find("name", "wrongMark")

   message.channel.send(`${this.client.emojis.find("name", "typing")} ${message.author}, Le prochain niveau de pioche est : **${nextpioche}**\n\n**Coût:**\n- ${wood} Bois\n- ${stone} Pierre\n- ${fer} Fer\n- ${gold} Or\n- ${diamant} Diamants\n- ${emeraude} Émeraudes\n- ${prismes} Prismes-parfaits\n- ${antimatter} Anti-matières\n- ${osrizk} Osrizk\n\n**Clique sur les réactions pour confirmer ou annuler.**`).then(m => {  
   
   function craft() {
   	
   	m.edit(`${check} ${message.author}, Tu as débloqué la **${nextpioche}**`) 
   
   	setTimeout(() => {
   	con.query(`UPDATE inventory SET wood = ${parseInt(rows[0].wood)-wood}, stone = ${parseInt(rows[0].stone)-stone}, fer = ${parseInt(rows[0].fer)-fer}, gold = ${parseInt(rows[0].gold)-gold}, diament = ${parseInt(rows[0].diament)-diamant}, emeraude = ${parseInt(rows[0].emeraude)-emeraude}, prismes = ${parseInt(rows[0].prismes)-prismes}, antimatter = ${parseInt(rows[0].antimatter)-antimatter},osrizk = ${parseInt(rows[0].osrizk)-osrizk}, pickaxe = ${parseInt(rows[0].pickaxe)+1} WHERE id = ${rows[0].id}`)
   	}, 2000) 
   	
   } 
   
   m.react(check)

   setTimeout(() => { m.react(wrong)},1000)

   const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
   var collect = m.createReactionCollector(filter)
	     
   collect.on('collect', r => {
	     	
   if(r.emoji.name == check.name){
	     		
   r.remove(message.author);
 
   if(wood > rows[0].wood) m.edit(`${wrong} ${message.author}, il te manque **${wood-rows[0].wood} de bois** pour crafter cette pioche`);
     
   else if(stone > rows[0].stone) m.edit(`${wrong} ${message.author}, il te manque **${stone-rows[0].stone} de stone** pour crafter cette pioche`);
   
   else if(fer > rows[0].fer) m.edit(`${wrong} ${message.author}, il te manque **${fer-rows[0].fer} de fer** pour crafter cette pioche`);
   
   else if(gold > rows[0].gold) m.edit(`${wrong} ${message.author}, il te manque **${gold-rows[0].gold} de gold** pour crafter cette pioche`);
   
   else if(diamant > rows[0].diament) m.edit(`${wrong} ${message.author}, il te manque **${diamant-rows[0].diament} de diamants** pour crafter cette pioche`);
   
   else if(emeraude > rows[0].emeraude) m.edit(`${wrong} ${message.author}, il te manque **${emeraude-rows[0].emeraude} de émeraudes** pour crafter cette pioche`);
   
   else if(prismes > rows[0].primes) m.edit(`${wrong} ${message.author}, il te manque **${prismes-rows[0].prismes} de prismes-parfaits** pour crafter cette pioche`);
   
   else if(antimatter > rows[0].antimatter) m.edit(`${wrong} ${message.author}, il te manque **${antimatter-rows[0].antimatter} d'anti-matières** pour crafter cette pioche`);
   
   else if(osrizk > rows[0].osrizk) m.edit(`${wrong} ${message.author}, il te manque **${osrizk-rows[0].osrizk} d'osrizk** pour crafter cette pioche`);
   
   else craft();
   
   m.clearReactions()

   collect.stop();
   
   } else {
   
   m.edit(`${wrong} ${message.author} craft annulé.`)
   
   m.clearReactions()

   collect.stop();
   
   } 
   
   }) 
   
   }) 
   	   
}

 

}) 
   	
}

}

module.exports = Craft;
