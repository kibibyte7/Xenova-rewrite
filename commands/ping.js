const Command = require("../modules/Command.js")

class Ping extends Command {
constructor(client) {
super(client, {
name:"ping", 
description:"Affiche le ping du bot.",
usage:"ping"
}) 
} 

async run(message, args, level) {
try] 
const msg = await message.channel.send(this.client.emojis.find("name","typing") + "**Pong ! **");

msg.edit(`Latence:** ${message.createdTimestamp - message.createdTimestamp}ms**\nApi: **${Math.round(this.client.ping)}ms**`); 

} 
} 
