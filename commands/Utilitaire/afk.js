const superagent = require("superagent") 
const request = require("request") 

const Command = require("../../modules/Command.js");
class Afk extends Command {
constructor(client) {
super(client, {
name:"afk",
description:"Met un message de afk quand l'utilisateur est mentionné.",
usage:"afk [texte]"
})

} 

run(message, args, level){

const afkUrl = process.env.afk;
            request(afkUrl, (err, res, body) => {
        
                
                console.log('chargement !')
                
                if(err || res.statusCode!== 200)return
                
                console.log('chargé avec succés')
                var afk = JSON.parse(body)
                if(!afk[message.guild.id + message.author.id]) afk[message.guild.id + message.author.id] = {};
                if(!afk[message.guild.id + message.author.id].reason) afk[message.guild.id + message.author.id].reason = args.length == 0 ? "AFK" : `${args.join(" ")}`;
                if(!afk[message.guild.id + message.author.id].time) afk[message.guild.id + message.author.id].time = new Date().getTime() + 120000;
                request({ url: afkUrl, method: 'PUT', json: afk})

                message.reply(`Tu es maintenant en afk pour : **${afk[message.guild.id + message.author.id].reason}**.`)
               })
  } 
} 

module.exports = Afk;           
