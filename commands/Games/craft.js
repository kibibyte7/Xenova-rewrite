const Command = require("../../modules/Command.js")
const pioches = require("../../pioches.json")

class Craft extends Command {
constructor(client){
super(client, {
name:"craft", 
description:"Amélioration d'arme, armure et pioche.", 
category:"Game", 
usage:"craft <objet> <level>", 
aliases:["fabriquer"] 
}) 
} 

run(message, args, level, con) {

console.log(pioches) 

} 
} 

module.exports = Craft;
