const Command = require("../../modules/Command")

class Rep extends Command {
constructor(client){
super(client,{
name:"rep",
FRdescription:"Donner un point de réputation à un utilisateur.",
category:"Game",
usage:"rep @mention",
permissions:["USE_EXTERNAL_EMOJIS"]
})
}

run(message, args){

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, me) => {

var mention = message.mentions.members.first();

if(me.length == 0) return message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Tu n'es pas entré dans le jeu fais +i pour t'inscrire.`) 

if(!mention) return message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Tu dois mentionner un utilisateur.`);

if(mention.user.id == message.author.id) return message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Tu ne peux pas te donner un point de réputation. (ça serait trop simple)`)  
 
if(mention.user.bot) return message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Tu ne peux pas donner un point de réputation aux bots !`)
  
con.query(`SELECT * FROM inventory WHERE id = ${mention.user.id}`, (err, you) => {

if(you.length == 0) return message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Cet utilisateur n'est pas inscrit dans le jeu.`)

if((me[0].rep_ratelimit > Date.now()) && (me[0].rep_ratelimit !== 0)){

var now = new Date().getTime();
var distance = me[0].rep_ratelimit - now;
var seconds = Math.floor((distance % (1000 * 60)) / 1000);
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var heures = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 *60));

message.channel.send(`Tu as déjà donné ton point de réputaion à quelqu'un, reviens dans ${heures} heures ${minutes} minutes et ${seconds} secondes`)

} else {

var ratelimit = 1*3600000*24 

con.query(`UPDATE inventory SET rep = ${parseInt(you[0].rep)+1} WHERE id = ${mention.user.id}`)

con.query(`UPDATE inventory SET rep_ratelimit = ${ratelimit} WHERE id = ${message.author.id}`)
 
message.channel.send(`${this.client.emojis.cache.find(e => e.name === "checkMark")} Tu as donné un point de réputation à **${mention.user.username}**`)

}
})
})

}
}


module.exports = Rep;
