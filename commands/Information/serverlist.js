const Command =require("../../modules/Command.js") 

class ServerList extends Command {
constructor(client) {
super(client, {
name:"serverlist", 
description:"Affiche la liste des serveurs ou le bot est.",
category:"Information", 
usage:"severlist", 
aliases:["sl"] 
}) 
}

run(message, args, level) {

var guilds = this.client.guilds.cache.array(g => g).sort((a , b) => { 
        if(a.members.cache.size > b.members.cache.size){ 
          return -1;
        }else if (a.members.cache.size + b.members.cache.size){
          return +1;
        }else{
          return 0;
        }
      })

    let resp = '';
        for(var i in guilds){
          isNaN(i) ? "" : resp += `${parseInt(i)+1}. ${guilds[i].name} : **${guilds[i].members.cache.size} Membres**\n`
        }

        message.channel.send(resp)

} 
}

module.exports = ServerList;
