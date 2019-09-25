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

var mention = message.mentions.members.first() || ToShow;
 
var User = mention.user;

var Author = message.author;

if(!args[0] || args.length == 0){

const AuthorCreated = new Date(Author.createdAt)
const AuthorTime = new Date(Author.createdAt)
const AuthorTimezone = +2 * 3600000 ;
AuthorTime.setTime(AuthorTime.getTime() + AuthorTimezone + AuthorTime.getTimezoneOffset() * 60000) 
const AuthorCreatedTime = moment.utc(AuthorTime).locale("fr-FR").format("LLLL")

const UserCreated = new Date(User.createdAt) 
const UserTime = new Date(User.createdAt)
const UserTimezone = +2 * 3600000;
UserTime.setTime(UserTime.getTime() + UserTimezone + UserTime.getTimezoneOffset() * 60000) 
const UserCreatedTime = moment.utc(UserTime).locale("fr-FR").format("LLLL")

const AuthorServJoined = new Date(message.member.joinedAt)
const AuthorServTime = new Date(message.member.joinedtAt)
const AuthorServTimezone = +2 * 3600000 ;
AuthorServTime.setTime(AuthorServTime.getTime() + AuthorServTimezone + AuthorServTime.getTimezoneOffset() * 60000) 
const AuthorServJoinedTime = moment.utc(AuthorServTime).locale("fr-FR").format("LLLL")

const UserServJoined = new Date(mention.joinedAt) 
const UserServTime = new Date(mention.joinedAt)
const UserServTimeZone = +2 * 3600000;
UserServTime.setTime(UserServTime.getTime() + UserServTimeZone + UserServTime.getTimezoneOffset() * 60000) 
const UserServJoinedTime = moment.utc(UserServTime).locale("fr-FR").format("LLLL")

message.channel.send({embed:{
color:0x010101,
title:`Informations sur ${Author.tag}`,
thumbnail:{
url:Author.avatarURL
},fields:[{
name:":gear: -> Username:", 
value:Author.username
},
{
name:":gear: -> Tag:", 
value:"#" +Author.discriminator
},
{
name:":gear: -> Est-ce un bot ? ",
value:!Author.bot ? "Non" : "Oui"
}, 
{
name:":gear: -> Date de création:", 
value:`Créé le : ${AuthorCreatedTime} (${moment(AuthorCreated, "DD").locale("fr-FR").fromNow()})`
}, 
{
name:":gear: -> Serveur rejoint:", 
value:`Rejoint le : ${AuthorServJoinedTime} (${moment(AuthorServJoined).locale("fr-FR").fromNow()})`
}, 
{
name:":gear: -> Nickname:", 
value: message.member.nickname == undefined ? "Aucun surnom." : message.member.nickname
}, 
{
name:":gear: -> Statut:", 
value:Author.presence.status
}, 
{
name:":gear: -> Jeu:", 
value: !Author.presence.game ? "Pas de jeu." : Author.presence.game.name
},
{
name:":gear: -> Liste de rôles:", 
value:message.member.roles.size > 25 ? "Il a trop de rôles." : message.member.roles.map(r => r).join(" ")
}, 
{
name:":gear: -> Liste de permissions", 
value:message.member.permissions.toArray().join(", ").toLowerCase() 
} 
],
timestamp:new Date(), 
footer:{
icon_url:this.client.user.avatarURL,
text:"© Userinfo | Xenova" 
} 
}}) 
return; 
} else{

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
value:`Créé le : ${UserCreatedTime} (${moment(UserCreated).locale("fr-FR").fromNow()})`
}, 
{
name:":gear: -> Serveur rejoint le:", 
value:`${UserServJoinedTime} (${moment(UserServJoined).locale("fr-FR").fromNow()})`
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
name:":gear: -> Liste de rôles:", 
value:mention.roles.size > 25 ? "Il a trop de rôles." : mention.roles.map(r => r).join(" ")
}, 
{
name:":gear: -> Liste de permissions", 
value:mention.permissions.toArray().join(", ").toUpperCase() 
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
} 

module.exports = Userinfo;
