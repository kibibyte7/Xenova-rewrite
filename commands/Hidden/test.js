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

message.channel.send(`Entre le code donné\nCode:${resp}\n\n**NOTE**: Le captcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets.`, attachment).then(m => {

m.react("1⃣") 

setTimeout(() => { m.react("2⃣")}, 1000)

setTimeout(() => { m.react("3⃣")}, 2000)

setTimeout(() => { m.react("4⃣")}, 3000)

setTimeout(() => { m.react("5⃣")}, 4000)

setTimeout(() => { m.react("6⃣")}, 5000)

setTimeout(() => { m.react("7⃣")}, 6000)

setTimeout(() => { m.react("8⃣")}, 7000)

setTimeout(() => { m.react("9⃣")}, 8000)

setTimeout(() => { m.react("↩")}, 9000)

setTimeout(() => { m.react(this.client.findEmoteByName("checkMark"))}, 10000)

const filter = (user) => user.id === message.author.id;

let collect = m.createReactionCollector(filter)

collect.on("collect", (r) => {

if(r) {

r.remove(message.author)

} 

}) 



}) 

} 

}

module.exports = Test;
