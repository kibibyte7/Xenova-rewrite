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

message.channel.send(data.question).then(m => {

message.channel.stopTyping();

const filter = m => m.content.toLowerCase() === 'y' || m.content.toLowerCase() === 'n' || m.content.toLowerCase() === 'py' || m.content.toLowerCase() === 'pn' || m.content.toLowerCase() === 'i' || m.content.toLowerCase() === 'b';

const collector = message.channel.createMessageCollector(filter, { time: 15000 });

collector.on("collect", async m => {

if(m.author.id!== message.author.id) return;

let number;

if(m.content.toLowerCase() === 'y') number = 0;
if(m.content.toLowerCase() === 'n') number = 1;
if(m.content.toLowerCase() === 'i') number = 2;
if(m.content.toLowerCase() === 'py') number = 3;
if(m.content.toLowerCase() === 'pn') number = 4;
if(m.content.toLowerCase() === 'b') number = 9;

if(data.currentStep !== 80){

const nextInfo = await aki.step("fr", data.session, data.signature, data.answers[number], data.currentStep++);

return message.channel.send(nextInfo.nextQuestion)

}

}) 

}) 

} 


} 
}

module.exports = Akinator;
