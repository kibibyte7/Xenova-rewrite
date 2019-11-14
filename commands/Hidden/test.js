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

let step;

step = 1;

let number;

async function question(){

message.channel.startTyping();

console.log(data.answer[number])

const nextInfo = await aki.step("fr", data.session, data.signature, data.answers[number], step);

step = nextInfo.nextStep;

console.log(nextInfo) 

message.channel.send(nextInfo.nextQuestion)

message.channel.stopTyping();

} 

if(message.content.toLowerCase() === 'y'){
question();
number = 0;
}

if(message.content.toLowerCase() === 'n'){ 
question();
number = 1;
} 

if(message.content.toLowerCase() === 'i'){ 
question();
number = 2;
} 

if(message.content.toLowerCase() === 'py'){ 
question();
number = 3;
} 


if(message.content.toLowerCase() === 'pn'){ 
question();
number = 4;
} 

if(message.content.toLowerCase() === 'b'){ 
number = 9;
} 

}) 

}) 

} 


} 
}

module.exports = Akinator;
