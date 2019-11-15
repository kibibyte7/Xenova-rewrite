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

await sleep;

message.channel.send(data.question).then(m => {

message.channel.stopTyping();

m.react("🇾")
setTimeout(() =>  { m.react("🇳")}, 1000) 
setTimeout(() =>  { m.react("🇮")}, 2000)
setTimeout(() =>  { m.react("😬")}, 3000)
setTimeout(() =>  { m.react("😋")}, 4000)

const filtre = (reaction, user) => reaction.emoji.name === "🇾" && user.id === message.author.id || reaction.emoji.name === "🇳" && user.id === message.author.id || reaction.emoji.name === "🇮" && user.id === message.author.id || reaction.emoji.name === "😋" && user.id === message.author.id ||reaction.emoji.name === "😬" && user.id === message.author.id;  

var collect = m.createReactionCollector(filtre);

con.query(`SELECT * FROM aki WHERE id = ${message.author.id}`, (err, rows) => {

if(!rows) con.query(`INSERT Into aki(step, id) VALUES(1, ${message.author.id})`);

function stepcount(){
con.query(`UPDATE aki SET step = ${rows[0].step + 1} WHERE id = ${message.author.id}`)
} 

collect.on("collect", async r => {

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
