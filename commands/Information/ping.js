const Command = require("../../modules/Command.js")

class Ping extends Command {
constructor(client) {
super(client, {
name:"ping", 
description:"Affiche le ping du bot.",
category:"Information", 
usage:"ping"
}) 
} 

async run(message, args, level) {
try{
const msg = await message.channel.send(this.client.emojis.find("name","typing") + "**Pong ! **");
msg.edit(`Latence:** ${message.createdTimetamp - message.createdTimestamp}ms**\nApi: **${Math.round(this.client.ping)}ms**`); 
}catch (e) {
message.channel.send(`${this.client.emojis.find("name","wrongMark")} Une erreur est survenue: **${e.message}**`) 
} 

} 
} 

module.exports = Ping;
