const Command =require("../../modules/Command.js") 

const moment = require("moment")
 
class ServerInfo extends Command {
constructor(client) {
super(client, {
name:"serverinfo", 
description:"Affiche les informations sur le serveur.",
category:"Information", 
usage:"serverinfo", 
aliases:["si"] 
}) 
}


run(message, args, level) {
message.channel.send({embed:{
color: 0x9101ff,
author: {
name: message.author.tag,
icon_url: message.author.avatarURL,
},
title: `${message.guild.name}`,
url: '',
thumbnail:{
url:message.guild.iconURL
},
fields: [
{
name: ':gear: -> ID du serveur',
value: `${message.guild.id}`,
inline: false
},
{
name: ':gear: -> Propriétaire du serveur',
value: `${message.guild.owner.user.username}`,
inline: false
},
{
name: ':gear: -> Créé le:',
value: `${moment(message.guild.createdAt).format('D/M/Y à HH:mm:ss')}`,
inline: false
},
{
name: ":gear: -> Tu as rejoins ce serveur le :", 
value:`${moment(message.member.joinedAt).format('D/M/Y à HH:mm:ss')} `, 
inline:false
}, 
{
name: ':gear: -> Nombre de membres humain ',
value: message.guild.members.filter(f => !f.user.bot).size,
inline: false
},
{
name: ':gear: -> Nombre de bots ',
value: message.guild.members.filter(f => f.user.bot).size,
inline: false
},
{
name: ':gear: -> Nombre de membres total ',
value: message.guild.members.size,
inline: false
},
{
name:":gear: -> Nombre d'utilisateurs en ligne", 
value:message.guild.members.filter(f => f.user.presence.status === "online").size, 
inline:false
}, 
{
name:":gear: -> nombre d'utilisateurs en hors ligne", 
value:message.guild.members.filter(f => f.user.presence.status === "offline").size, 
inline:false
}, 
{
name: ':gear: -> Nombre de rôles',
value: `${message.guild.roles.size == 0 ? "Pas de rôles" : message.guild.roles.size}`,
inline: false
},
{
name: ':gear: -> Nombre de channels',
value: `${message.guild.channels.size}`,
inline: false
},
{
name: ':gear: -> Liste des rôles',
value: message.guild.roles.map(r => r).join(", ").length > 1024 ? "Trop de rôles" : message.guild.roles.map(r => r).join(", "),
inline: false
}, 
{
name:":gear: -> Liste des emojis", 
value:message.guild.emojis.size == 0 ? "Aucun emojis." : message.guild.emojis.map(e => e).join(" ").length > 1024 ? "Trop d'emojis" : message.guild.emojis.map(e => e).join(" ") 
}],
timestamp:new Date(), 
footer: {
icon_url: this.client.user.avatarURL,
text: `©️ Serverinfo | Xenova`
}
}})

} 
} 

module.exports = ServerInfo;
