const moment = require("moment") 

const sm = require("string-similarity") 

const Command = require("../../modules/Command.js")

class Roleinfo extends Command {
constructor (client) {
super(client, {
name:"roleinfo",
category:"Information", 
description:"Donne les informations sur le rôle en question.",
usage:"role <@mention>/id ou nom"
})
} 


run(message, args, level) {

let roles = [];

        let indexes = [];

        message.guild.roles.cache.forEach(function(role){

            roles.push(role.name)

            indexes.push(role.id)

        })

        let match = sm.findBestMatch(args.join(" "), roles);

        let rolename = match.bestMatch.target;

        let toMention = message.guild.roles.cache.get(indexes[roles.indexOf(rolename)])

        let toInfo = message.guild.roles.cache.find(r => r.name === args.join(" ")) || message.guild.roles.cache.find(r => r.id === args.join(" ")) || toMention ;

        if(!toInfo){

       message.channel.send(`${message.client.emojis.cache.find(e => e.name === "wrongMark")} Je ne trouve pas ce rôle.`) 

       return;

      }else{

      	var filtre = m => m.roles.cache.find(r => r.name === toInfo.name)

      	message.channel.send({embed:{
      	color:toInfo.color,
      	fields:[{
      	name:"Nom du rôle:",
      	value:toInfo.name
      	},
      	{
      	name:"ID:", 
      	value:toInfo.id
      	},
      	{
      	name:"Créé le:",
      	value:moment(toInfo.createdAt).format("DD/MM/YY à hh:mm:ss") 
      	},
      	{
      	name:"Couleur:", 
      	value:toInfo.hexColor == "#000000" ? "Couleur par défaut (transparent)" : toInfo.hexColor 
      	},
     	{
      	name:"Afficher les membres ayant ce rôle séparément en ligne:", 
      	value:toInfo.hoist == false ? "Non" : "Oui" 
      	}, 
      	{
      	name:"Position:", 
      	value:toInfo.position == 0 ? "Rôle @everyone" : toInfo.position
      	},
      	{
      	name:"Mentionnable:", 
      	value:toInfo.mentionable == false ? "Non" : "Oui" 
      	}, 
      	{
      	name:"Nombre de membres ayant ce rôle", 
      	value:`${message.guild.members.cache.filter(filtre).size} (${(message.guild.members.cache.filter(filtre).size / message.guild.members.cache.size) * 100}%)`
      	}
      	],
      	timestamp:new Date(), 
      	footer:{
      	icon_url:this.client.user.avatarUrl,
      	text:"© Roleinfo | Xenova" 

      	}  	
      	}}) 
} 
} 

} 

module.exports = Roleinfo;
