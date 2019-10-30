const Command = require("../../modules/Command.js") 

const sm = require("string-similarity");

class Enable_vcs extends Command {
constructor (client) {
super(client, {
name:"enable_vcs",
category:"Vcs", 
FRdescription:"Définir un channel de discussion interserveurs.",
FRusage:"enable_vcs <#channel>/id ou nom",
permLevel:"XenoAdminPerm", 
aliases:[] 
})
} 


run(message, args, level, con) {

let salons = []; 

let indexes = []; 

message.guild.channels.forEach(function(chan){ 
salons.push(chan.name) 
indexes.push(chan.id) 
})

let match = sm.findBestMatch(args.join(" "), salons); 

let name = match.bestMatch.target; 

let target_channel = message.guild.channels.get(indexes[salons.indexOf(name)]); 

let rules = [
"`[1]` Pas de spam.", 
"`[2]` Pas de publicité dans le vcs, sinon ban tamporaire de 1 jour.", 
"`[3]` Tout les liens c'est en mp.", 
"`[4]` Le racisme, la discrimination, l'homophobie et autres ne sont pas toléré et susceptible d'un ban d'un jour voir plus selon la gravité des dires.",
"`[5]` Le dox est strictement interdit, un blacklist du bot sera fait si une information personnelle arrive dans le vcs sans l'accord de la personne en question.",
"`[6]` Les selfbot sont interdits par la ToS et susceptible d'un blacklist.",
"`[7]` Respectez vous les uns les autres, aucune guerres, juste la détente.",
"`[8]` Ne demandez pas à être modo du vcs, j'informerai moi-même quand je recrute du monde. Si vous forcez je ban un jour.",
"`[9]` Les modos ne ban pas pour rien, si vous êtes banni, c'est qu'il y a une raison.",
"`[10]` Il n'y a pas de règle 10, juste amusez vous, c'est le principal bien sûr !",
`\n${this.client.emojis.find(e => e.name ==="Certifier")} Note : Pour avoir mon support allez checker le \`${this.client.config.defaultSettings.prefix}infos\` vous aurez des réponses si vous avez des questions ou problèmes avec le bot.`,
] 
con.query(`SELECT * FROM vcs WHERE id = ${target_channel.id}`, (err, rows) => {

if(rows.length == 0){

con.query(`INSERT INTO vcs(id) VALUES (${message.channel.id})`)

message.channel.send(`${this.client.emojis.find(e => e.name === "checkMark")} Le channel **${target_channel}** est désormais un channel de vcs !`).then(m => {
m.delete(3000)
message.delete(4000)
})

message.channel.send(`${this.client.emojis.find(e => e.name === "LoadBoost")} Téléchargement des règles en cours...`).then(m => {

setTimeout(() => {
m.edit({embed:{
title:"Règlement du vcs :", 
color:Math.floor(Math.random() * 16777214) + 1,
description:rules.join("\n"),
timestamp:new Date(), 
footer:{
icon_url:this.client.user.avatarURL,
text:"© Système vcs | Xenova" 
}
}})

}, 2000) 

setTimeout(() => {m.pin()},3000)

})

} else {

message.channel.send(`${this.client.emojis.find(e => e.name === "wrongMark")} Ce channel est déjà un channel de vcs.`) 

} 


}) 

} 
} 

module.exports = Enable_vcs;
