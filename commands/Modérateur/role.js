const sm = require("string-similarity");

const Command = require("../../modules/Command.js")

class Role extends Command {
constructor (client) {
super(client, {
name:"role",
category:"Modérateur", 
description:"Donne le rôle souhaité à un ou plusieurs membres/bots.",
usage:"role <@mention>/<id>/<all>/<bots>",
permLevel:"XenoModPerm"
})
} 


run(message, args, level) {

let mention = message.mentions.members.first();

let roles = [];

let indexes = [];

message.guild.roles.forEach(role => {

roles.push(role.name)

indexes.push(role.id)

})

let match = sm.findBestMatch(args.join(" "), roles);

let rolename = match.bestMatch.target;

let toMention = message.guild.roles.get(indexes[roles.indexOf(rolename)])
        
let Trole = message.guild.roles.find("name", args.join(" ")) || toMention; 
	   		
const check = this.client.emojis.find("name", "checkMark")

const wrong = this.client.emojis.find("name", "wrongMark")
	   			   			
if(mention || args[0] === "all" || args[0] === "bots") {

if(!Trole) return message.channel.send(`${wrong} Ce rôle est introuvable.`);

if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`${wrong} Je n'ai pas la permission de gérer les rôles.`); 


if(args[0] === mention) {

message.channel.send(`${this.client.emojis.find("name","typing")} **${message.author.username}**, Veux-tu ${!mention.roles.exists("name", Trole.name) ? "donner" : "retirer"} le rôle **${Trole.name}** à **${mention.user.username}** ?`).then(m => {

m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
	     		
	     r.remove(message.author);
      
      mention.addRole(Trole)
      
      m.edit(`${check} J'ai ${!mention.roles.exists("name", Trole.name) ? "donné" : "retiré"} le rôle : **${Trole.name}** à **${mention.user.username}**`) 
      
      collect.stop()
      
     m.clearReactions()

     } 
     
    }) 
    
   }) 	
   
} 

if(args[0] === "all") {
	
message.channel.send(`${this.client.emojis.find("name","typing")} **${message.author.username}**, Veux-tu donner le rôle **${Trole.name}** à **${message.guild.members.filter(u => !u.user.bot).size} membres humains** ?`).then(m => {

m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
	     		
	     r.remove(message.author);
      
      message.guild.members.filter(u => !u.user.bot).map(members => members.addRole(Trole))
      
      m.edit(`${check} Je donne le rôle : **${Trole.name}** à **${message.guild.members.filter(u => !u.user.bot).size} membres humains**. `) 
      
      collect.stop()
      
     m.clearReactions()

     } 
     
    }) 
    
   }) 	
   
} 

if(args[0] === "bots") {
	
message.channel.send(`${this.client.emojis.find("name","typing")} **${message.author.username}**, Veux-tu donner le rôle **${Trole.name}** à **${message.guild.members.filter(u => u.user.bot).size} membres bots** ?`).then(m => {

m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
	     		
	     r.remove(message.author);
      
      message.guild.members.filter(u => u.user.bot).map(bots => bots.addRole(Trole))
      
      m.edit(`${check} Je donne le rôle : **${Trole.name}** à **${message.guild.members.filter(u => u.user.bot).size} membres bots**. `) 
      
      collect.stop()
      
      m.clearReactions();
      
     } 
     
    }) 
    
   }) 	
} 



} else {

message.channel.send(`${wrong} Utilisateur introuvable essaie de le mentionner, l'id ou les options all et bots. (all, bots et id juste après ${this.client.config.defaultSettings.prefix}role)`)  
return;

} 

} 

} 
module.exports = Role;
