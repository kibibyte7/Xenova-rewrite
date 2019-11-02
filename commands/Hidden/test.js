const Canvas = require("canvas") 
const Discord = require("discord.js")


const Command = require("../../modules/Command.js");

class Test extends Command {
  constructor(client) {
    super(client, {
      name: "test",
      FRdescription:"Que du test dedans.", 
      category:"Hidden", 
      permissions:[], 
      aliases:[] 
    });
  }

async run(message, client, args, level){

Canvas.registerFont('Font/visitor2.ttf', { family: 'Visitor2'})
 	
const firstNumber = Math.floor(Math.random()*20);

const secondNumber = Math.floor(Math.random()*20);

const thirdNumber = `${Math.floor(Math.random()*999)+1}`;

const result = `${firstNumber + secondNumber}` + `${thirdNumber}`;

const canvas = Canvas.createCanvas(700, 250); 

const ctx = canvas.getContext('2d'); 

const background = await Canvas.loadImage("Images/background.png");

ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

ctx.font = this.client.applyText(canvas, `${firstNumber} + ${secondNumber} = ? + "${thirdNumber}"`) && '55px "Visitor2"';

ctx.fillStyle = "#0d1bde";

ctx.fillText(`${firstNumber} + ${secondNumber} = ? + "${thirdNumber}"`, canvas.width / 4.4, canvas.height / 1.8);

const attachment = new Discord.Attachment(canvas.toBuffer(), 'captcha.png'); 

let resp = ``;

let tentative = 3;

message.channel.send(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment).then(m => {

m.react("0⃣") 

setTimeout(() => { m.react("1⃣")}, 1000)

setTimeout(() => { m.react("2⃣")}, 2000)

setTimeout(() => { m.react("3⃣")}, 3000)

setTimeout(() => { m.react("4⃣")}, 4000)

setTimeout(() => { m.react("5⃣")}, 5000)

setTimeout(() => { m.react("6⃣")}, 6000)

setTimeout(() => { m.react("7⃣")}, 7000)

setTimeout(() => { m.react("8⃣")}, 8000)

setTimeout(() => { m.react("9⃣")}, 9000)

setTimeout(() => { m.react("↩")}, 10000)

setTimeout(() => { m.react(this.client.findEmoteByName("checkMark"))}, 11000)

const filter = (reaction, user) => user.id === message.author.id;

let collect = m.createReactionCollector(filter)

collect.on("collect", (r) => {

if(r.emoji.name === "0⃣") {

r.remove(message.author)

resp += "0";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "1⃣") {

r.remove(message.author)

resp += "1";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "2⃣") {

r.remove(message.author)

resp += "2";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "3⃣") {

r.remove(message.author)

resp += "3";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "4⃣") {

r.remove(message.author)

resp += "4";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "5⃣") {

r.remove(message.author)

resp += "5";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} if(r.emoji.name === "6⃣") {

r.remove(message.author)

resp += "6";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "7⃣") {

r.remove(message.author)

resp += "7";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} if(r.emoji.name === "8⃣") {

r.remove(message.author)

resp += "8";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} if(r.emoji.name === "9⃣") {

r.remove(message.author)

resp += "9";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "↩") {

r.remove(message.author)

resp = "";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "checkMark") {

if(resp === result) {

message.channel.send(`${this.client.findEmoteByName("checkMark")} Captcha validé, tu es un bon humain !`)

m.clearReactions();

collect.stop();

} else {

r.remove(message.author)

if(tentatives == 0){

//il se fait kick
message.channel.send("kick");

collect.stop();

} else {

tentative = tentative - 1;

message.channel.send(`${this.client.findEmoteByName("wrongMark")} Le code est faux, demande de l'aide s'il le faut.\n\nil te reste: **${tentative} tentatives**.`) 

} 

} 

} 


}) 



}) 

} 

}

module.exports = Test;
