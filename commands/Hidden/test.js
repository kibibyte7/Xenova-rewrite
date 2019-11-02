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

message.channel.send("Entre le code donné\n\n**Note: Le cpatcha se fait comme ceci: somme et les trois chiffres sans espaces et sans guillemets", attachment).then(m => {

m.react("one")

}) 

} 

}

module.exports = Test;
