const Canvas = require("canvas") 
const Discord = require("discord.js")


const Command = require("../../modules/Command.js");

class Captcha extends Command {
  constructor(client) {
    super(client, {
      name: "captcha",
      FRdescription:"Un captcha pour voir si t'es pas un bot.", 
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

let tentatives = 3;

let u = this.client.findUserById(args[0])

message.channel.send(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\nStatut: Pas validé\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment).then(m => {

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

const filter = (reaction, user) => user.id === !u ? message.author.id : args[0];

let collect = m.createReactionCollector(filter)

collect.on("collect", (r) => {

if(r.emoji.name === "0⃣") {

r.remove(!u ? message.author : u)

resp += "0";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "1⃣") {

r.remove(!u ? message.author : u)

resp += "1";

m.edit(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "2⃣") {

r.remove(message.author)

resp += "2";

m.edit(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "3⃣") {

r.remove(!u ? message.author : u)

resp += "3";

m.edit(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\nStatut: Pas validé\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "4⃣") {

r.remove(!u ? message.author : u)

resp += "4";

m.edit(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\nStatut: Pas validé\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "5⃣") {

r.remove(!u ? message.author : u)

resp += "5";

m.edit(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\nStatut: Pas validé\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "6⃣") {

r.remove(!u ? message.author : u)


resp += "6";

m.edit(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\nStatut: Pas validé\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "7⃣") {

r.remove(!u ? message.author : u)

resp += "7";

m.edit(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\nStatut: Pas validé\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "8⃣") {

r.remove(!u ? message.author : u)

resp += "8";

m.edit(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\nStatut: Pas validé\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "9⃣") {

r.remove(!u ? message.author : u)

resp += "9";

m.edit(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\nStatut: Pas validé\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "↩") {

r.remove(!u ? message.author : u)

resp = "";

m.edit(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\nStatut: Pas validé\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

if(r.emoji.name === "checkMark") {

if(resp === result) {

m.edit(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\nStatut: Validé\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

m.clearReactions();

collect.stop();

} else {

r.remove(!u ? message.author : u)

if(tentatives == 1){

m.edit(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\nStatut: Code faux, le code était:${result}\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

collect.stop();

} else {

tentatives = tentatives - 1;

m.edit(`${!u ? message.author : u} Entre le code donné\n\n**Code: ${resp}**\n\nStatut: Code faux, ${tentatives} tentatives restantes.\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment) 

} 

} 

} 


}) 



}) 

} 

}

module.exports = Captcha;
