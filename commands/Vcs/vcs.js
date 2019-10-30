const Command = require("../../modules/Command.js") 

const sm = require("string-similarity");

class Vcs extends Command {
constructor (client) {
super(client, {
name:"vcs",
category:"Vcs", 
FRdescription:"Envoyer des messages en interserveur.",
FRusage:"vcs",
cooldown:5,
aliases:[] 
})
} 


run(message, args, level, con) {

if(args.join(" ").length == 0) return message.channel.send(`${this.client.emojis.find(e => e.name === "wrongMark")} Entre un message à envoyer.`)

if(args.join(" ").length > 700) return message.channel.send(`${this.client.emojis.find(e => e.name === "wrongMark")} La limite de caractères est de 700, tu ne peux peux pas aller au-delà de ces limites.`)

if(level == 3){

con.query(`SELECT * FROM vcs_user WHERE id = ${message.author.id}`, (err, rows) => {

if(rows.length == 0) con.query(`INSERT INTO vcs_user(id, grade, banned, bannedtime, bannedto) VALUES (${message.author.id}, '${this.client.emojis.find(e => e.name === "Certifier")} Développeur', ${false}, "Non défini", "Non défini")`)

}) 

} else {

con.query(`SELECT * FROM vcs_user WHERE id = ${message.author.id}`, (err, rows) => {

if(rows.length == 0) con.query(`INSERT INTO vcs_user(id, grade, banned, bannedtime, bannedto) VALUES (${message.author.id}, '${this.client.emojis.find(e => e.name === "User")} Utilisateur', ${false}, "Non défini", "Non défini")`)

}) 

} 

con.query(`SELECT * FROM vcs WHERE id = ${message.channel.id}`, (err, rows) => {

if(rows.length == 0) return message.channel.send(`${this.client.emojis.find(e => e.name === "wrongMark")} Ce channel n'est pas un channel de discussion interserveur.`).then(m => {

m.delete(4000)

message.delete(5000)

})

con.query(`SELECT * FROM vcs_user WHERE id = ${message.author.id}`, (err, rows) => {

if(rows.length == 0) return;

if(rows[0].banned === "true") return message.channel.send(`${this.client.emojis.find(e => e.name === "wrongMark")} Tu as été banni temporairement voire définitivement du vcs, regarde les messages de ban.`) 

}) 

let bot_avatar = this.client.user.avatarURL;

let bot = this.client;

con.query("SELECT * FROM vcs", (err, rows) => {

con.query(`SELECT * FROM vcs_user WHERE id = ${message.author.id}`, (err, me) => {

rows.forEach(c => {

bot.channels.get(c.id).send({embed:{
color:Math.floor(Math.random() * 16777214) + 1,
thumbnail:{
url:message.author.avatarURL
}, 
fields:[{
name:"Utilisateur :", 
value:message.author.tag
}, 
{
name:"Grade :", 
value:me[0].grade
}, 
{
name:"Message :", 
value:args.join(" ") 
}, 
{
name:"Depuis le serveur :", 
value:message.guild.name
}], 
timestamp:new Date(), 
footer:{
icon_url:bot_avatar,
text:"© Vcs | Xenova" 
}
}}) 

}) 

}) 

}) 

}) 

} 
} 

module.exports = Vcs;
