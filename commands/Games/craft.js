const Command = require("../../modules/Command.js")
const pioches = require("../../pioches.json")
const epees = require("../../epee.json")

class Craft extends Command {
constructor(client){
super(client, {
name:"craft", 
FRdescription:"Améliorer la pioche", 
category:"Game", 
usage:"craft <objet>", 
aliases:["fabriquer"] 
}) 
} 

run(message, args, level, con) {

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id} `, (err, rows) => {

const check = this.client.emojis.find(e => e.name ==="checkMark")

const wrong = this.client.emojis.find(e => e.name === "wrongMark")
    
if(rows.length == 0) return message.channel.send(`${wrong} Tu n'es pas entré dans le jeu, fais +i pour t'inscrire.`)
	  
if(!args[0] || args.length == 0) return message.channel.send(`${wrong} ${message.author}, spécifie un objet à crafter entre: **pioche, arme, bouclier**`);

if(args[0] === "pioche") {

   if(rows[0].pickaxe+1 == pioches.pioches.length) return message.channel.send(`${wrong} Ta pioche est au niveau maximum.`)

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
   
   message.channel.send(`${this.client.emojis.find(e => e.name === "typing")} ${message.author}, Le prochain niveau de pioche est : **${nextpioche}**\n\n**Coût:**\n- ${wood} Bois\n- ${stone} Pierre\n- ${fer} Fer\n- ${gold} Or\n- ${diamant} Diamants\n- ${emeraude} Émeraudes\n- ${prismes} Prismes-parfaits\n- ${antimatter} Anti-matières\n- ${osrizk} Osrizk\n\n**Clique sur les réactions pour confirmer ou annuler.**`).then(m => {  
   
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

   let resp = ``;

   if(wood > rows[0].wood) resp += `- Bois: ${wood - rows[0].wood}\n`
   if(stone > rows[0].stone) resp += `- Stone: ${stone - rows[0].stone}\n`
   if(fer > rows[0].fer) resp += `- Fer: ${fer - rows[0].fer}\n`
   if(gold > rows[0].gold) resp += `- Gold: ${gold - rows[0].gold}\n`
   if(diamant > rows[0].diament) resp += `- Diamant: ${diamant - rows[0].diament}\n`
   if(emeraude > rows[0].emeraude) resp += `- Émeraude: ${emeraude - rows[0].emeraude}\n`
   if(prismes > rows[0].primes) resp += `- Prismes-Parfait: ${prismes - rows[0].prismes}\n`
   if(antimatter > rows[0].antimatter ) resp += `- Anti-matières: ${antimatter - rows[0].antimatter}\n`
   if(osrizk > rows[0].osrizk) resp += `- Osrizk: ${osrizk - rows[0].osrizk}`

   if(resp !== ``) return m.edit(`${wrong} ${message.author} Il te manque\n\n${resp}\n\nPour crafter cette pioche.`)

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

if(args[0] === "arme") {

   if(rows[0].weaponlevel+1 == epees.epee.length) return message.channel.send(`${wrong} Ton arme est au niveau maximum.`)

   var cost = epees.epee[rows[0].weaponlevel+1].cost[0]
   
   var nextarme = epees.epee[rows[0].weaponlevel+1].name;
   
   var wood = cost.wood == undefined ? 0 : cost.wood;
   
   var stone = cost.stone == undefined ? 0 : cost.stone;
   
   var fer = cost.fer == undefined ? 0 : cost.fer;
   
   var gold = cost.gold == undefined ? 0 : cost.gold;
   
   var diamant = cost.diamant == undefined ? 0 : cost.diamant;
   
   var emeraude = cost.emeraude == undefined ? 0 : cost.emeraude;
   
   var prismes = cost.prismes == undefined ? 0 : cost.prismes;
   
   var antimatter = cost.antimatter == undefined ? 0 : cost.antimatter;
   
   var osrizk = cost.osrizk == undefined ? 0 : cost.osrizk;
   
   message.channel.send(`${this.client.emojis.find(e => e.name === "typing")} ${message.author}, Le prochain niveau d'arme est : **${nextarme}**\n\n**Coût:**\n- ${wood} Bois\n- ${stone} Pierre\n- ${fer} Fer\n- ${gold} Or\n- ${diamant} Diamants\n- ${emeraude} Émeraudes\n- ${prismes} Prismes-parfaits\n- ${antimatter} Anti-matières\n- ${osrizk} Osrizk\n\n**Clique sur les réactions pour confirmer ou annuler.**`).then(m => {  
   
   function craft() {
   	
   	m.edit(`${check} ${message.author}, Tu as débloqué l'arme **${nextarme}**`) 
   
   	setTimeout(() => {
   	con.query(`UPDATE inventory SET wood = ${parseInt(rows[0].wood)-wood}, stone = ${parseInt(rows[0].stone)-stone}, fer = ${parseInt(rows[0].fer)-fer}, gold = ${parseInt(rows[0].gold)-gold}, diament = ${parseInt(rows[0].diament)-diamant}, emeraude = ${parseInt(rows[0].emeraude)-emeraude}, prismes = ${parseInt(rows[0].prismes)-prismes}, antimatter = ${parseInt(rows[0].antimatter)-antimatter}, osrizk = ${parseInt(rows[0].osrizk)-osrizk}, weaponlevel = ${parseInt(rows[0].weaponlevel)+1}, attack = ${Math.round(rows[0].attack*1.2)} WHERE id = ${rows[0].id}`)
        con.query(`UPDATE inventory SET pui = ${rows[0].pui+(rows[0].attack+rows[0].defense)} WHERE id = ${rows[0].id}`)
   	}, 2000) 
   	
   } 
   
   m.react(check)

   setTimeout(() => { m.react(wrong)},1000)

   const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
   var collect = m.createReactionCollector(filter)
	     
   collect.on('collect', r => {
	     	
   if(r.emoji.name == check.name){
	     		
   r.remove(message.author);

   let resp = ``;

   if(wood > rows[0].wood) resp += `- Bois: ${wood - rows[0].wood}\n`
   if(stone > rows[0].stone) resp += `- Stone: ${stone - rows[0].stone}\n`
   if(fer > rows[0].fer) resp += `- Fer: ${fer - rows[0].fer}\n`
   if(gold > rows[0].gold) resp += `- Gold: ${gold - rows[0].gold}\n`
   if(diamant > rows[0].diament) resp += `- Diamant: ${diamant - rows[0].diament}\n`
   if(emeraude > rows[0].emeraude) resp += `- Émeraude: ${emeraude - rows[0].emeraude}\n`
   if(prismes > rows[0].primes) resp += `- Prismes-Parfait: ${prismes - rows[0].prismes}\n`
   if(antimatter > rows[0].antimatter ) resp += `- Anti-matières: ${antimatter - rows[0].antimatter}\n`
   if(osrizk > rows[0].osrizk) resp += `- Osrizk: ${osrizk - rows[0].osrizk}`

   if(resp !== ``) return m.edit(`${wrong} ${message.author} Il te manque\n\n${resp}\n\nPour crafter cet arme.`)

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
