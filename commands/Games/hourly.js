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

run(message, args){

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, (err, rows) => {  
  
var hr = rows[0].hr_ratelimit;

var zero = rows[0].combo_to_zero;

var newhr = Date.now()+(1000* 60 *60);

var newzero = Date.now()+(1000 * 60 * 60 * 2);

var randgold = rows[0].hrcombo = 0 ? Math.floor(Math.random()*100)*1 : Math.floor(Math.random()*100)*rows[0].hrcombo

if(zero > Date.now() && (zero == 0)){

con.query(`UPDATE inventory SET hrcombo = 0 WHERE id = ${message.author.id}`)

con.query(`UPDATE inventory SET combo_to_zero = ${newzero} WHERE id = ${message.author.id}`)

con.query(`UPDATE inventory SET hr_ratelimit = ${newhr} WHERE id ${message.author.id}`)

con.query(`UPDATE inventory SET gold = ${parseInt(rows[0].gold)+randgold} WHERE id = ${message.author.id}`)

message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Oups, tu as perdu ton combo hr tu as pris plus de deux heures pour faire la commande, mais tu gagnes : **${randgold} Or**, Ne loupes pas le prochain !`);

} else {

if(hr > Date.now() && (hr == 0)){

con.query(`UPDATE inventory SET hrcombo = ${parseInt(rows[0].hrcombo)+1} WHERE id = ${message.author.id}`)

con.query(`UPDATE inventory SET combo_to_zero = ${newzero} WHERE id = ${message.author.id}`)

con.query(`UPDATE inventory SET hr_ratelimit = ${newhr} WHERE id ${message.author.id}`)

con.query(`UPDATE inventory SET gold = ${parseInt(rows[0].gold)+randgold} WHERE id = ${message.author.id}`)

message.channel.send(`${this.client.emojis.cache.find(e => e.name === "checkMark")} Tu gagnes **${randgold} Or** et tu passes au combo : **${rows[0].hrcombo}**, à dans une heure !`);

} 
}
})

}
}

module.exports = Hourly;
