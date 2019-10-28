const Command = require("../../modules/Command.js");
class Afk extends Command {
constructor(client) {
super(client, {
name:"afk",
ENdescription:"The bot puts an afk message when the user is mentioned.",
FRdescription:"Le bot met un message de afk quand l'utilisateur est mentionné.",
category:"Utilitaire", 
FRusage:"afk [texte]"
})

} 

run(message, args, level){

if(!args) return message.channel.send(`${this.client.emojis.find(e => e.name === "wrongMark")} Entre un message de afk.`) 

if(args.length > 255) return message.channel.send(`${this.client.emojis.find(e => e.name === "wrongMark")} La limite de caractères du message d'afk est de 255 caractères, tu ne peux pas aller au delà de ces limites.`) 

var mention = message.mentions.members.first();

if(mention) mention.replace(mention, mention.user.username)

con.query(`SELECT * FROM afk WHERE id = ${message.author.id} AND ${message.guild.id}`, (err, rows) => {

if(rows.length == 0) con.query(`INSERT INTO afk(reason, id, guild_id, time) VALUES ("${args.join("  ")}", ${message.author.id}, ${message.guild.id}, ${new Date()})`)

message.channel.send(`${this.client.emojis.find(e => e.name === "checkMark")} ${message.author}, Tu es maintenant en afk pour : **${args.join(" ")}**.`)

})

} 
} 

module.exports = Afk;           
