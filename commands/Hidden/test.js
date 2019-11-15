const aki = require("aki-api") 
const Command = require("../../modules/Command.js")

let step = 0;

function stepCounter(){

step = step++;

console.log(step)

} 

async function Oui(){

const nextInfo = await aki.step("fr", data.session, data.signature, data.answers[0], step);

m.edit(nextInfo.nextQuestion)

}

async function Non(){

const nextInfo = await aki.step("fr", data.session, data.signature, data.answers[1], step);

m.edit(nextInfo.nextQuestion)

}
  
async function Idk(){

const nextInfo = await aki.step("fr", data.session, data.signature, data.answers[2], step);

m.edit(nextInfo.nextQuestion)

} 

async function Py(){

const nextInfo = await aki.step("fr", data.session, data.signature, data.answers[3], step);

m.edit(nextInfo.nextQuestion)

} 

async function Pn(){

const nextInfo = await aki.step("fr", data.session, data.signature, data.answers[4], step);

m.edit(nextInfo.nextQuestion)

} 

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

message.channel.startTyping();

const data = await aki.start("fr");

message.channel.send(data.question).then(m => {

message.channel.stopTyping();

m.react("🇾")
setTimeout(() =>  { m.react("🇳")}, 1000) 
setTimeout(() =>  { m.react("🇮")}, 2000)
setTimeout(() =>  { m.react("😬")}, 3000)
setTimeout(() =>  { m.react("😋")}, 4000)

const filtre = (reaction, user) => reaction.emoji.name === "🇾" && user.id === message.author.id || reaction.emoji.name === "🇳" && user.id === message.author.id || reaction.emoji.name === "🇮" && user.id === message.author.id || reaction.emoji.name === "😋" && user.id === message.author.id ||reaction.emoji.name === "😬" && user.id === message.author.id;  

var collect = m.createReactionCollector(filtre);

collect.on("collect", r => {

if(r.emoji.name === "🇾"){

Oui();

stepCounter();

}

if(r.emoji.name === "🇳"){

Non();

stepCounter();

}

if(r.emoji.name === "🇮"){

Idk();

stepCounter();

}

if(r.emoji.name === "😋"){

Py();

stepCounter();

}

if(r.emoji.name === "😬"){

Pn();

stepCounter();

}

}) 

}) 

} 


} 
}

module.exports = Akinator;
