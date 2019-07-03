const Command = require("../../modules/Command.js")
const pioches = require("../pioches.json")

class Craft extends Command {
constructor(client){
super(client, {
name:"mine", 
description:"Miner des ressources.", 
category:"Game", 
usage:"mine", 
aliases:["m", "mi"] 
}) 
} 

run(message, args, level, con) {

console.log(pioches) 

} 
} 

module.exports = Craft;
