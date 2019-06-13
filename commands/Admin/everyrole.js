const Command = require("../../modules/Command.js") 

class Everyrole extends Command {
constructor(client){
super(client, {
name :"everyrole",
description :"Crée un rôle mentionnable et mentionne.",
usage:"everyrole [mention]",
category:"Admin", 
permLevel:"XenoAdminPerm"
})
} 
		
run(message, args, level) {

const check = this.client.emojis.find("name", "checkMark")

const wrong = this.client.emojis.find("name", "wrongMark")

if(!args[0]){

message.channel.send(`${this.client.emojis.find("name", "typing")} Veux tu vraiment créer un rôle \`Everyrole\` et le donner à **${message.guild.members.filter(membre => !membre.user.bot).size} membres humains** ?`).then(m => {

m.react(check)

setTimeout(() => { m.react(wrong)},1000)

const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
var collect = m.createReactionCollector(filter)
	     
collect.on('collect', r => {
	     	
if(r.emoji.name == check.name){
	     		
r.remove(message.author);

message.guild.createRole({

name:"Everyrole" 

}).then(role => {

message.guild.members.filter(membres => !membres.user.bot).map(everyrole => everyrole.addRole(role.id))

}) 

m.clearReactions()

collect.stop();

m.edit(`${check} Création du everyrole et give du rôle à **${message.guild.members.filter(member => !member.user.bot).size} membres humains**.`)

} else {

m.clearReactions();

m.edit(`${wrong} Everyrole annulé.`) 

collect.stop();

}      

}) 

})

} 

if(args[0] === "mention") {

var everyrole = message.guild.roles.find(role => role.name === "Everyrole") 
	
if(!everyrole) return message.channel.send(`${wrong} Le rôle \`Everyrole\` n'existe pas, entre la commande ${this.client.config.defaultSettings.prefix}everyrole.`) 	

message.channel.send(`${this.client.emojis.find("name", "typing")} Veux tu vraiment mentionner **${message.guild.members.filter(membres => !membres.user.bot).size} membres humains** par everyrole ?`).then(m => {

m.react(check)

setTimeout(() => { m.react(wrong)},1000)

const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
var collect = m.createReactionCollector(filter)
	     
collect.on('collect', r => {
	     	
if(r.emoji.name == check.name){
	     		
r.remove(message.author);

m.edit(`${check} Mention de **${message.guild.members.filter(member => !member.user.bot).size} membres humains**.`)

message.guild.members.forEach(member => {
	
if(member.roles.exists("name", everyrole.name)) {

if(member.user.bot) return;

member.addRole(everyrole.id, `Rajout de everyrole par : ${message.author.tag}`)
	
}

}) 

everyrole.setMentionable(true, `Mention everyrole par : ${message.author.tag} `);

message.channel.send(`${check} ${everyrole}^`) 

everyrole.setMentionable(false, `Mention everyrole par : ${message.author.tag}`);

m.clearReactions()

collect.stop();


} else {

m.clearReactions();

m.edit(`${wrong} Mention de \`Everyrole\` annulé.`) 

collect.stop();

}      

}) 

})

} 

}

}

module.exports = Everyrole;
