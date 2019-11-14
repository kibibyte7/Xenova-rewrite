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

message.channel.send(data.question).then(async m => {

message.channel.stopTyping();

const filter = m => m.content.toLowerCase() === 'y' || m.content.toLowerCase() === 'n' || m.content.toLowerCase() === 'py' || m.content.toLowerCase() === 'pn' || m.content.toLowerCase() === 'i' || m.content.toLowerCase() === 'b';

const collector = message.channel.createMessageCollector(filter, { time: 15000 });

collector.on("collect", async m => {

if(m.author.id !== message.author.id) return;

var step = 1;

message.channel.stopTyping(); 

if(m.content.toLowerCase() === 'y'){

message.channel.startTyping();

step++;

await sleep;

const nextInfo = await aki.step("fr", `${data.session}`, `${data.signature}`, `${data.answers[0]}`, parseInt(step));

message.channel.send(nextInfo.nextQuestion);

message.channel.stopTyping();

}

if(m.content.toLowerCase() === 'n'){ 

message.channel.stopTyping();

step++;

await sleep;

const nextInfo = await aki.step("fr", `${data.session}`, `${data.signature}`, `${data.answers[1]}`, parseInt(step));

message.channel.send(nextInfo.nextQuestion);

message.channel.stopTyping();

} 

if(m.content.toLowerCase() === 'i'){

message.channel.stopTyping();

step++;

await sleep;

const nextInfo = await aki.step("fr", `${data.session}`, `${data.signature}`, `${data.answers[2]}`, parseInt(step));

message.channel.send(nextInfo.nextQuestion);

message.channel.stopTyping();

} 

if(m.content.toLowerCase() === 'py'){

message.channel.startTyping();

step++;

await sleep;

const nextInfo = await aki.step("fr", `${data.session}`, `${data.signature}`, `${data.answers[3]}`, parseInt(step));message.channel.send(nextInfo.nextQuestion);message.channel.send(nextInfo.nextQuestion);

message.channel.send(nextInfo.nextQuestion);

message.channel.stopTyping();

} 


if(m.content.toLowerCase() === 'pn'){

message.channel.startTyping();
 
step++;

await sleep;

const nextInfo = await aki.step("fr", `${data.session}`, `${data.signature}`, `${data.answers[4]}`, parseInt(step));message.channel.send(nextInfo.nextQuestion);message.channel.send(nextInfo.nextQuestion);

message.channel.send(nextInfo.nextQuestion);

message.channel.startTyping();

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
