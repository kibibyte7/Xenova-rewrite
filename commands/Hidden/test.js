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

const firstNumber = Math.floor(Math.random()*10);

const secondNumber = Math.floor(Math.random()*10);

const thirdNumber = `${Math.floor(Math.random()*1000)-1}`;

const result = `${firstNumber + second Number}` + `${thirdNumber}`;

const canvas = Canvas.createCanvas(700, 250); 
	
const ctx = canvas.getContext('2d'); 

const background = await Canvas.loadImage("Images/background.png");

ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

ctx.fillText(`${firstNumber} + ${secondNumber} = ? + "${thirdNumber}"`, canvas.width / 2.5, canvas.height / 1.8);

const attachment = new Discord.Attachment(canvas.toBuffer(), 'captcha.png'); 

message.channel.send("", attachment) 

} 

}

module.exports = Test;
