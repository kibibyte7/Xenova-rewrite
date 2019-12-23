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

run(message, client, args, level){

con.query(`SELECT * FROM inventory WHERE id = ${message.author.id}`, async (err, rows) => {

if(!rows) return;

if(rows[0].verified_captcha == true) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} ${message.author} Ne te préoccupe pas de ça pour le moment.`)

const filter = (reaction, user) => user.id === message.author;

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

message.channel.send(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment).then(m => {

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

let collect = m.createReactionCollector(filter)

collect.on("collect", (r) => {

if(r.emoji.name === "0⃣") {

r.remove(message.author)

resp += "0";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

} 

if(r.emoji.name === "1⃣") {

r.remove(message.author)

resp += "1";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

} 

if(r.emoji.name === "2⃣") {

r.remove(message.author)

resp += "2";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

} 

if(r.emoji.name === "3⃣") {

r.remove(message.author)

resp += "3";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

} 

if(r.emoji.name === "4⃣") {

r.remove(message.author)

resp += "4";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

} 

if(r.emoji.name === "5⃣") {

r.remove(message.author)

resp += "5";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

} 

if(r.emoji.name === "6⃣") {

r.remove(message.author)


resp += "6";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

} 

if(r.emoji.name === "7⃣") {

r.remove(message.author)

resp += "7";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

} 

if(r.emoji.name === "8⃣") {

r.remove(message.author)

resp += "8";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

} 

if(r.emoji.name === "9⃣") {

r.remove(message.author)

resp += "9";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

} 

if(r.emoji.name === "↩") {

r.remove(message.author)

resp = "";

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment)

} 

if(r.emoji.name === "checkMark") {

if(resp === result) {

let randxp = Math.floor(Math.random()*9999);

let randMsgs = Math.floor(Math.random()*666);

con.query(`UPDATE inventory SET msgs_to_captcha = ${randMsgs}, verified_captcha = true, xp = ${parseInt(rows[0].xp)+randxp}, totalxp = ${parseInt(rows[0].totalxp)+randxp} WHERE id = ${message.author.id}`)

const nxtLvl = Math.floor(0.2 * Math.sqrt(rows[0].xp));
    
if(rows[0].niveau < nxtLvl) con.query(`UPDATE inventory SET niveau = ${nxtLvl}, xp = 0, maxmana = ${parseInt(rows[0].maxmana)+(5*nxtLvl)}, attack = ${parseInt(rows[0].attack)+(3*nxtLvl)}, defense = ${parseInt(rows[0].defense)+(3*nxtLvl)}, pui = ${parseInt(rows[0].attack + rows[0].defense) + (6*nxtLvl)} WHERE id = ${message.author.id}`)
	  
message.channel.send(`${this.client.findEmoteByName("checkMark")} ${message.author} Captcha validé ! Tu gagnes ${randxp} xp !`) 

m.clearReactions();

collect.stop();

} else {

r.remove(message.author)

if(tentatives == 1){

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\nAvertissement: Code faux, 0 tentatives restantes.\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment) 

message.channel.send(`${this.client.findEmoteByName("wrongMark")} ${message.author} Code faux ! Le code était **${result}**, tu perds donc 1 combo hr`) 

con.query(`UPDATE inventory SET hrcombo = ${parseInt(rows[0].hrcombo)-1} WHERE id = ${message.author.id}`) 

m.clearReactions();

collect.stop();

} 

} else {

tentatives = tentatives - 1;

m.edit(`${message.author} Entre le code donné\n\n**Code: ${resp}**\n\nAvertissement: Code faux, ${tentatives} tentatives restantes.\n\n**NOTE**: La somme et les trois chiffres entre les guillemets doit être réunis ensemble.\n\n**EXEMPLE:** 11 + 9 = ? + "639" ça fait donc **20639**`, attachment) 

} 

} 

} 


}) 

}) 

}) 

} 

}

module.exports = Captcha;
