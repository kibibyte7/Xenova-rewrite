const aki = require("aki-api") 
const Command = require("../../modules/Command.js")

let step = 0;

function stepCounter(){

step = step + 1;

console.log(step)

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

run(message, args, level, con) {

if(args[0] === "start"){

message.channel.startTyping();

const x = message.channel.send("Charement...")

x.then(async m => {

const data = await aki.start("fr");

m.edit(data.question)

const filtre = (reaction, user) => reaction.emoji.name === "🇾" && user.id === message.author.id || reaction.emoji.name === "🇳" && user.id === message.author.id || reaction.emoji.name === "🇮" && user.id === message.author.id || reaction.emoji.name === "😋" && user.id === message.author.id ||reaction.emoji.name === "😬" && user.id === message.author.id;  

var collect = await m.createReactionCollector(filtre);


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

message.channel.stopTyping();

m.react("🇾")
setTimeout(() =>  { m.react("🇳")}, 1000) 
setTimeout(() =>  { m.react("🇮")}, 2000)
setTimeout(() =>  { m.react("😬")}, 3000)
setTimeout(() =>  { m.react("😋")}, 4000)

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
