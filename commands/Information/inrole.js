const sm = require("string-similarity");

const Command = require("../../modules/Command.js")

class Inrole extends Command {
constructor (client) {
super(client, {
name:"inrole",
category:"Information", 
description:"Donne la liste des membres ayant le rôle souhaité.",
usage:"role <@mention>/id ou nom"
})
} 


run(message, args, level) {

let roles = [];

let indexes = [];

message.guild.roles.forEach(role => {

roles.push(role.name)

indexes.push(role.id)

})

let match = sm.findBestMatch(args.join(" "), roles);

let rolename = match.bestMatch.target;

let toMention = message.guild.roles.get(indexes[roles.indexOf(rolename)])
        
var toFind = message.guild.roles.find("name", args.join(" ")) || toMention;
    
    if(!toFind || toFind === undefined){
        message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Je n'ai pas trouvé le role \`args.join(" ")}\` essaie la mention, l'id ou le nom.`)
        return;
    }else{
       
        var filter = m => m.roles.find(r => r.name === toFind.name)
        var map = message.guild.members.filter(filter).map(u => u)
        let resp = ``;
        for(var i = 0; i < 50; i++){
        resp += isNaN(i) ? '' : `${map[i].user.username}\n`
        } 

        message.channel.send({embed:{
            color:Math.floor(Math.random() * 16777214) + 1,
            author:{
                name:`Liste des membres ayant le role ${toFind.name} [${message.guild.members.filter(filter).size}]`,
                icon_url:message.author.avatarURL
            },
            description:`${resp}\nEt ${parseInt(message.guild.members.filter(filter).size)-50} autres membres...`,
            timestamp:new Date(),
            footer:{
                 icon_url:this.client.user.avatarURL,
                 text:`©️ Inrole | Xenova`
            }
        }})
    }
} 
} 

module.exports = Inrole;
