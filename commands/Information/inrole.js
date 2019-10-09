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

let right = this.client.emojis.find(e => e.name === "droite") 

let left =this.client.emojis.find(e => e.name === "gauche") 

let wrong = this.client.emojis.find(e => e.name === "wrongMark") 

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
        let membres = [];
        let page = 1;
        let start = 0;
        let end = 50;
        let resp = ``;

        message.guild.members.filter(filter).forEach(function(membre){
        membres.push(membre.user.username)
        })

        let finalpage = Math.floor(membres.length/50);

        message.channel.send({embed:{
            color:Math.floor(Math.random() * 16777214) + 1,
            author:{
                name:`Liste des membres ayant le role ${toFind.name} [${message.guild.members.filter(filter).size}]`,
                icon_url:message.author.avatarURL
            },
            description:`${membres.slice(start, end).join("\n")}`,
            timestamp:new Date(),
            footer:{
                 icon_url:this.client.user.avatarURL,
                 text:`©️ Inrole | Xenova | Page ${page}/${finalpage}`
            }
        }}).then(m => {

        m.react(left) 
        setTimeout(() =>{m.react(right)},1000)
        setTimeout(() =>{m.react(wrong)},2000)

        const filter = (reaction, user) => reaction.name === left.name && user.id === message.author.id || reaction.name === right.name && user.id === message.author.id || reaction.name === wrong.name && user.id === message.author.id 
        
        const collect = m.createReactionsCollector(filter) 
        
        collect.on("collect", r => {
        
        if(r.name === left.name){

        r.remove(message.author) 

        if(page == 1) return;

        page--;
        
        start = parseInt(start - 50);

        end = parseInt(end - 50);

        m.edit({embed:{
            color:Math.floor(Math.random() * 16777214) + 1,
            author:{
                name:`Liste des membres ayant le role ${toFind.name} [${message.guild.members.filter(filter).size}]`,
                icon_url:message.author.avatarURL
            },
            description:`${membres.slice(start, end).join("\n")}`,
            timestamp:new Date(),
            footer:{
                 icon_url:this.client.user.avatarURL,
                 text:`©️ Inrole | Xenova | Page ${page}/${finalpage}`
            }
        }})
        
        } 
        
        if(r.name === right.name){

        r.remove(message.author) 

        if(page == finalpage) return;

        page++;
        
        start = parseInt(start + 50);

        end = parseInt(end + 50);

        m.edit({embed:{
            color:Math.floor(Math.random() * 16777214) + 1,
            author:{
                name:`Liste des membres ayant le role ${toFind.name} [${message.guild.members.filter(filter).size}]`,
                icon_url:message.author.avatarURL
            },
            description:`${membres.slice(start, end).join("\n")}`,
            timestamp:new Date(),
            footer:{
                 icon_url:this.client.user.avatarURL,
                 text:`©️ Inrole | Xenova | Page ${page}/${finalpage}`
            }
        }})
        
        } 

        }) 
        
        if(r.name === wrong.name){

        m.edit({embed:{
        color:0xff0c69, 
        description:`${wrong} Le paginateur est fermé, suppression du message dans 3 secondes.`,
        timestamp:new Date(), 
        footer:{
        icon_url:this.client.user.avatarURL,
        text:"© Inrole | Xenova" 
        }
        }}).then(msg => {
        message.delete(4000)
        msg.delete(3000)
        }) 

        m.clearReactions();

        collect.stop();

        } 
    }) 
    }
} 
} 

module.exports = Inrole;
