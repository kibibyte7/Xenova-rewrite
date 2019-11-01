const Canvas = require("canvas") 

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

const background = await Canvas.loadImage("../../Images/download");

ctx.drawImage(background, 0, 0, canvas.width, canvas.height);

const attachment = new Discord.Attachment(canvas.toBuffer(), 'captcha.png'); 

message.channel.send("", attachement) 

} 

}

module.exports = Test;
