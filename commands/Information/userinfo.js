const Command = require("../../modules/Command.js") 

const moment = require("moment") 

const sm = require("string-similarity");

class Userinfo extends Command {
constructor (client) {
super(client, {
name:"userinfo",
category:"Information", 
description:"Donne les informations de l'auteur du message ou de l'utilisateur mentionné.",
usage:"userinfo <@mention>/id ou nom", 
aliases:["ui"] 
})
} 


run(message, args, level) {
let membres = []; 

let indexes = []; 

message.guild.members.forEach(function(member){ 
membres.push(member.user.username) 
indexes.push(member.id) 
}) 

let match = sm.findBestMatch(args.join(" "), membres); 

let username = match.bestMatch.target; 

let ToShow = message.guild.members.get(indexes[membres.indexOf(username)]); 

var mention = message.mentions.members.first() || message.member || ToShow;
 
var User = mention.user;
  
message.channel.send({embed:{
color:0x010101,
title:`Informations sur ${User.tag}`,
thumbnail:{
url:User.avatarURL
},fields:[{
name:":gear: -> Username:", 
value:User.username
},
{
name:":gear: -> Tag:", 
value:"#" +User.discriminator
},
{
name:":gear: -> Est-ce un bot ? ",
value:!User.bot ? "Non" : "Oui"
}, 
{
name:":gear: -> Date de création:", 
value:`Créé le : ${moment(User.createdAt).format("D/M/Y à HH:mm:ss")} `
}, 
{
name:":gear: -> Serveur rejoint le:", 
value:moment(mention.joinedAt).format("D/M/Y à HH:mm:ss") 
}, 
{
name:":gear: -> Nickname:", 
value: mention.nickname == undefined ? "Aucun surnom." : mention.nickname
}, 
{
name:":gear: -> Statut:", 
value:User.presence.status
}, 
{
name:":gear: -> Jeu:", 
value: !User.presence.game ? "Pas de jeu." : User.presence.game.name
},
{
name:":gear: -> Dernier message:", 
value: !User.lastMessage.content ? "Aucun messages pour l'instant.": User.lastMessage.content
}, 
{
name:":gear: -> Liste de rôles:", 
value:mention.roles.size > 25 ? "Il a trop de rôles." : mention.roles.map(r => r).join(" ")
}, 
{
name:":gear: -> Liste de permissions", 
value:mention.permissions.toArray().join(", ").toLowerCase() 
} 
],
timestamp:new Date(), 
footer:{
icon_url:this.client.user.avatarURL,
text:"© Userinfo | Xenova" 
} 
}}) 

}

} 

module.exports = Userinfo;
