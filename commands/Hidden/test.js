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

const canvas = Canvas.createCanvas(700, 250); 
	
const ctx = canvas.getContext('2d'); 

const background = await Canvas.loadImage("Images/background.png");

ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

const attachment = new Discord.Attachment(canvas.toBuffer(), 'captcha.png'); 

message.channel.send("", attachment) 

} 

}

module.exports = Test;
