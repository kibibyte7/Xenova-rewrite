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

run(message, args, level, con) {

if(args[0] === "start"){

message.channel.startTyping();



let nextInfo;

let step = 0;

async function Start(){

let data = await aki.start("fr");

message.channel.send(data.question)

} 

async function question(nextInfo){

nextInfo = await aki.step("fr", data.session, data.signature, data.answers[0], step);

m.edit(nextInfo.nextQuestion)

} 

Start().then(m => {

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

question(nextInfo);

step = step++;

}

if(r.emoji.name === "🇳"){

question(nextInfo);

step = step++;

}

if(r.emoji.name === "🇮"){

question(nextInfo);

step = step++;

}

if(r.emoji.name === "😋"){

question(nextInfo);

step = step++;

}

if(r.emoji.name === "😬"){

question(nextInfo);

step = step++;

}

}) 

}) 

} 


} 
}

module.exports = Akinator;
