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

message.channel.startTyping();

const data = await aki.start("fr")

message.channel.send(data.question).then(async m => {

message.channel.stopTyping();

const filter = m => m.content.toLowerCase() === 'y' || m.content.toLowerCase() === 'n' || m.content.toLowerCase() === 'py' || m.content.toLowerCase() === 'pn' || m.content.toLowerCase() === 'i' || m.content.toLowerCase() === 'b';

const collector = message.channel.createMessageCollector(filter, { time: 15000 });

collector.on("collect", m => {

if(m.author.id !== message.author.id) return;

let step = 1;

async function question(number){

message.channel.startTyping();

console.log(data.answers[number])

const nextInfo = await aki.step("fr", `${data.session}`, `${data.signature}`, `${data.answers[number]}`, `${step}`);

step = step + 1;

console.log(step) 

message.channel.send(nextInfo.nextQuestion)

message.channel.stopTyping();

} 

if(m.content.toLowerCase() === 'y'){
question(0);
}

if(m.content.toLowerCase() === 'n'){ 
question(1);
} 

if(m.content.toLowerCase() === 'i'){ 
question(2);

} 

if(m.content.toLowerCase() === 'py'){ 
question(3);
} 


if(m.content.toLowerCase() === 'pn'){ 
question(4);
} 

if(m.content.toLowerCase() === 'b'){ 
console.log("ok")
} 

}) 

}) 

} 


} 
}

module.exports = Akinator;
