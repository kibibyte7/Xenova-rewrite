const aki = require("aki-api") 
const Command = require("../../modules/Command.js")

class Akinator extends Command {
constructor(client){
super(client, {
name:"akinator", 
FRdescription:"Le bot te pose des questions pour deviner le personnage auquel tu penses.", 
category:"Fun", 
usage:"akinator", 
aliases:["aki"] 
}) 
} 

async run(message, args, level, con) {

if(args[0] === "start"){

const sleep = this.client.wait(2000);

message.channel.startTyping();

const data = await aki.start("fr")

message.channel.send(data.question).then(m => {

message.channel.stopTyping();

m.react("🇾")
setTimeout(() =>  { m.react("🇳")}, 1000) 
setTimeout(() =>  { m.react("🇮")}, 2000)
setTimeout(() =>  { m.react("😬")}, 3000)
setTimeout(() =>  { m.react("😋")}, 4000)

const filtre = (reaction, user) => reaction.emoji.name === "🇾" && user.id === message.author.id || reaction.emoji.name === "🇳" && user.id === message.author.id || reaction.emoji.name === "🇮" && user.id === message.author.id || reaction.emoji.name === "😋" && user.id === message.author.id ||reaction.emoji.name === "😬" && user.id === message.author.id;  

var collect = m.createReactionCollector(filtre);

con.query(`SELECT * FROM akinator WHERE id = ${message.author.id}`, (err, rows) => {

if(!rows) await con.query(`INSERT INTO akinator(step, id) VALUES(1, ${message.author.id})`);

await sleep;

collect.on("collect", async r => {

async function stepcount(){
await con.query(`UPDATE akinator SET step = ${rows[0].step+1} WHERE id = ${message.author.id}`)
} 

if(r.emoji.name === "🇾"){

stepcount();

const nextInfo = await aki.step("fr", data.session, data.signature, data.answers[0], rows[0].step);

m.edit(nextInfo.nextQuestion)

}

if(r.emoji.name === "🇳"){

stepcount();

const nextInfo = await aki.step("fr", data.session, data.signature, data.answers[0], rows[0].step);

m.edit(nextInfo.nextQuestion)

}

if(r.emoji.name === "🇮"){

stepcount();

const nextInfo = await aki.step("fr", data.session, data.signature, data.answers[0], rows[0].step);

m.edit(nextInfo.nextQuestion)

}

if(r.emoji.name === "😋"){

stepcount();

const nextInfo = await aki.step("fr", data.session, data.signature, data.answers[0], rows[0].step);

m.edit(nextInfo.nextQuestion)

}

if(r.emoji.name === "😬"){

stepcount();

const nextInfo = await aki.step("fr", data.session, data.signature, data.answers[0], rows[0].step);

m.edit(nextInfo.nextQuestion)

}

}) 

}) 

}) 
} 


} 
}

module.exports = Akinator;
