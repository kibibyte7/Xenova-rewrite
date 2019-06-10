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

let roles = [];

let indexes = [];

message.guild.roles.forEach(function(role){

roles.push(role.name)

indexes.push(role.id)

})

let match = sm.findBestMatch(args.slice(1).join(" "), roles);

let rolename = match.bestMatch.target;

let toMention = message.guild.roles.get(indexes[roles.indexOf(rolename)])
        
const mention = message.mentions.members.first() || message.guild.members.find("id", args[0]);

const role = message.guild.roles.find("name", args.slice(1).join(" ")) || message.guild.roles.find("id", args[1]) || toMention; 
	   		
const check = this.client.emojis.find("name", "checkMark")

const wrong = this.client.emojis.find("name", "wrongMark")
	   			   			
if(args[0] !== mention || args[0] !== "all" || args[0] !== "bots") return message.channel.send(`${wrong} Utilisateur introuvable essaie de le mentionner, l'id ou les options all et bots. (all, bots et id juste après ${this.client.config.defaultSettings.prefix}role)`) 

if(!role) return message.channel.send(`${wrong} Ce rôle est introuvable.`);

if(!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(`${wrong} Je n'ai pas la permission de gérer les rôles.`); 


if(args[0] === mention) {

message.channel.send(`${this.client.emojis.find("name","typing")} **${message.author.username}**, Veux-tu ${!mention.roles.exists("name", role.name) ? "donner" : "retirer"} le rôle **${role.name}** à **${mention.user.username}** ?`).then(m => {

m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
	     		
	     r.remove(message.author);
      
      mention.addRole(role)
      
      m.edit(`${check} J'ai ${!mention.roles.exists("name", role.name) ? "donné" : "retiré"} le rôle : **${role.name}** à **${mention.user.username}**`) 
      
      collect.stop()
      
     } 
     
    }) 
    
   }) 	
   
} 

if(args[0] === "all") {
	
message.channel.send(`${this.client.emojis.find("name","typing")} **${message.author.username}**, Veux-tu donner le rôle **${role.name}** à **${message.guild.members.filter(u => !u.user.bot).size} membres humains** ?`).then(m => {

m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
	     		
	     r.remove(message.author);
      
      message.guild.filter(u => !u.user.bot).map(members => members.addRole(role))
      
      m.edit(`${check} Je donne le rôle : **${role.name}** à **${message.guild.members.filter(u => !u.user.bot).size} membres humains**. `) 
      
      collect.stop()
      
     } 
     
    }) 
    
   }) 	
   
} 

if(args[0] === "bots") {
	
message.channel.send(`${this.client.emojis.find("name","typing")} **${message.author.username}**, Veux-tu donner le rôle **${role.name}** à **${message.guild.members.filter(u => u.user.bot).size} membres bots** ?`).then(m => {

m.react(check);
      	
      	setTimeout(() => {m.react(wrong)}, 1000)  
      	
      	const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
	     var collect = m.createReactionCollector(filter)
	     
	     collect.on('collect', r => {
	     	
	     	if(r.emoji.name == check.name){
	     		
	     r.remove(message.author);
      
      message.guild.filter(u => u.user.bot).map(bots => bots.addRole(role))
      
      m.edit(`${check} Je donne le rôle : **${role.name}** à **${message.guild.members.filter(u => u.user.bot).size} membres bots**. `) 
      
      collect.stop()
      
      m.clearReactions();
      
     } 
     
    }) 
    
   }) 	
} 



} 

} 

module.exports = Role;
