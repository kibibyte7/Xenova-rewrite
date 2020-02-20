const Command = require("../../modules/Command.js")

class Transfert extends Command {
constructor(client){
super(client, {
name:"reset", 
description:"Dev bot uniquement, transfert les données d'un joueur vers un autre compte.", 
category:"Game", 
usage:"transfert",
permLevel:"XenoOwner", 
aliases:[] 
}) 
} 

run(message, args, level, con) {

var sender = this.client.users.find(x => x.id === args[0]);

var receiver = this.client.users.find(x => x.id === args[1]);

con.query(`SELECT * FROM inventory WHERE id = ${sender.id}`, (err, rows) => {

if(!rows) return message.channel.send(`${this.client.emojis.find(y => y.name === "wrongMark")} Cet utilisateur n'est pas dans la base de données.`)

con.query(`SELECT * FROM inventory WHERE id = ${receiver.id}`, (err, yx) {

if(rows) return message.channel.send(`${this.client.emojis.find(y => y.name === "wrongMark")} Cet utilisateur est déjà dans la base de données, je ne peux pas faire ça.`)

message.channel.send(`${this.client.emojis.find(v => v.name === "typing")} Transfert en cours...`).then(msg => {

con.query(`INSERT INTO inventory(id, xp, totalxp, mana, maxmana, pui, category, guildname, guildowner, guildlevel, guildmembers, guildmaxmembers, guildxp, guildtotalxp, pickaxe, wood, stone, fer, gold, diament, emeraude, prismes, antimatter, osrizk, attack, defense, niveau, tresors, rep, weaponlevel, pv, armorlevel, kills, atk_fragments, def_fragments, pick_fragments, armor_fragments, atk_enchant, def_enchant, pick_enchant, armor_enchant) VALUES (${receiver.id}, ${rows[0].xp}, ${rows[0].totalxp}, ${rows[0].mana}, ${rows[0].maxmana}, ${rows[0].pui}, ${rows[0].category}, ${rows[0].guildname}, ${rows[0].guildowner}, ${rows[0].guildlevel}, ${rows[0].guildmembers}, ${rows[0].guildmaxmembers}, ${rows[0].guildxp}, ${rows[0].guildtotalxp}, ${rows[0].pickaxe}, ${rows[0].wood}, ${rows[0].stone}, ${rows[0].fer}, ${rows[0].gold}, ${rows[0].diament}, ${rows[0].prismes}, ${rows[0].antimatter}, ${rows[0].osrizk}, ${rows[0].attack}, ${rows[0].defense}, ${rows[0].niveau}, ${rows[0].tresors}, ${rows[0].rep}, ${rows[0].weaponlevel}, ${rows[0].pv}, ${rows[0].armorlevel}, ${rows[0].kills}, ${rows[0].atk_fragments}, ${rows[0].def_fragments}, ${rows[0].pick_fragments}, ${rows[0].armor_fragments}, ${rows[0].atk_enchant}, ${rows[0].def_enchant}, ${rows[0].pick_enchant}, ${rows[0].armor_enchant})`)

con.query(`DELETE FROM inventory WHERE id = ${sender.id}`)

setTimeout(() => {

msg.edit(`${this.client.emojis.find(b => b.name === "checkMark")} Transfert vers **${receiver.name}** réussi !`)

}, 5000)

})

})

})

}

}

module.exports = Transfert;
