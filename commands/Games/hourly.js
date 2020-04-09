const Command = require("../../modules/Command")

class Hourly extends Command {
constructor(client){
super(client,{
name:"hourly",
FRdescription:"Donne un bonus tant que la commande est faite toutes les heures.",
category:"Game",
usage:"hourly",
permissions:["USE_EXTERNAL_EMOJIS"],
aliases:["hr"]
})
}

run(message, args, level, con){

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {  
  
var hr = rows[0].hr_ratelimit;

var hzero = rows[0].zero;

var newhr = Date.now()+(1000* 60 *60);

var newzero = Date.now()+(1000 * 60 * 60 * 2);

var randgold = Math.floor(Math.random()*100)*1.2

var now = new Date().getTime();

var distance = hr - now;
  
var minutes = Math.floor((distance % 1000 * 60 * 60) / (1000 * 60))

var secondes = Math.floor((distance % 1000 * 60) / (1000))

if(hzero < Date.now() && (hzero == 0)){

con.query(`UPDATE inventory SET hrcombo = 0 WHERE id = ${message.author.id}`)

con.query(`UPDATE inventory SET zero = ${newzero} WHERE id = ${message.author.id}`)

con.query(`UPDATE inventory SET hr_ratelimit = ${newhr} WHERE id ${message.author.id}`)

con.query(`UPDATE inventory SET gold = ${parseInt(rows[0].gold)+randgold} WHERE id = ${message.author.id}`)
  
message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Oups, tu as perdu ton combo hr tu as pris plus de deux heures pour faire la commande, mais tu gagnes : **${randgold} Or**, Ne loupes pas le prochain !`);  
  
} else if(hr < Date.now() && (hr == 0)){

con.query(`UPDATE inventory SET hrcombo = ${parseInt(rows[0].hrcombo)+1} WHERE id = ${message.author.id}`)

con.query(`UPDATE inventory SET zero = ${newzero} WHERE id = ${message.author.id}`)

con.query(`UPDATE inventory SET hr_ratelimit = ${newhr} WHERE id ${message.author.id}`)

con.query(`UPDATE inventory SET gold = ${parseInt(rows[0].gold)+randgold} WHERE id = ${message.author.id}`)

setTimeout(() => {
  
message.channel.send(`${this.client.emojis.cache.find(e => e.name === "checkMark")} Tu gagnes **${randgold} Or** et tu passes au combo : **${rows[0].hrcombo}**, à dans une heure !`);

}, 1000)
  
} else {

message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Tu as déjà pris ton hourly passe dans **${minutes} Minutes ${secondes} Secondes**`);
  
}
  
  
})

}
}

module.exports = Hourly;
