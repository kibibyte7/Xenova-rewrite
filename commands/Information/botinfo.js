const Command = require("../../modules/Command.js")
const moment = require("moment")
const { version } = require("discord.js") 

class BotInfo extends Command {
constructor(client) {
super(client, {
name:"botinfo", 
description:"Affiche les informations du bot.", 
category:"Information", 
usage:"botinfo", 
aliases:["bi", "infos"] 
}) 
} 

run(message, args, level){
var s = (Math.round(this.client.uptime / 1000) % 60)
var m = (Math.round(this.client.uptime / (1000 * 60)) % 60)
var h = (Math.round(this.client.uptime / (1000 * 60 * 60)))
m = (m < 10) ? "0" + m : m;
s = (s < 10) ? "0" + s : s;

message.channel.send({embed:{
        color: Math.floor(Math.random() * 16777214) + 1, //pour une couleur en mode random
        fields:[{
        name:"Owner du bot",
        value: this.client.users.find("id", "524996881198219276").tag, //pas oublier le s de client.users
        inline: false //field en ligne : Vrai ou Faux true/false
        },
        {
        name:"Uptime:", 
        value:`${h}:${m}:${s}`
        }, 
        {
        name: "Version de node",
        value: process.version,//version du processus
        inline: false
        },
        {
        name: "Mémoire utilisée",
        value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB`,
        inline: false
        },
        {
        name:"Nombre de commandes", 
        value: `il y a ${this.client.commands.size} commandes`, 
        inline:false
       }, 
         {
        name:"Date de création", 
        value:`J'ai été créé le : ${moment(this.client.user.createdAt).format("DD/MM/YY à HH:mm:ss")}`, 
        inline:false
      }, 
       {
        name:"Nombre de serveurs", 
        value:`Je suis dans : ${this.client.guilds.size} serveurs.`, 
        inline:false
       }, 
        {
        name:"Nombre d'utilisateurs", 
        value:`Je suis avec : ${this.client.users.size} utilisateurs.`, 
        inline:false
      },
        {
        name:"Support", 
        value:`[lien du support](https://discord.gg/mK6hEtZ)`, 
        inline:false
      }, 
        {
        name:"Invite", 
        value:`[invitation du bot](https://discordapp.com/oauth2/authorize?client_id=${this.client.user.id}&scope=bot&permissions=-1)`, 
        inline:false
      }
    ],
    thumbnail:{
        url:this.client.user.avatarURL
    },
    timestamp:new Date,
    footer:{
        text: "botinfo",
        icon_url:this.client.user.avatarURL
    }
    }})
} 
}

module.exports = BotInfo;
