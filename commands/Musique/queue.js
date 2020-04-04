const Command = require("../../modules/Command.js");

class Queue extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      description: "Afficher la liste de musique.",
      usage: "queue", 
      category:"Musique", 
      aliases:["q"] 
    });
  }

  run(message) {
    let resp = ``;
    
    const serverQueue = message.client.queue.get(message.guild.id);
    
    if (!serverQueue)
    return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Il n'y a aucune musique en cours !`);
    let songs = serverQueue.songs.slice(1);
     
    for(var i in songs){
    !isNaN(i) ? resp += `[${parseInt(i)+1}] - **${songs[parseInt(i)].title}** - Demandé par: **${songs[parseInt(i)].requester}**\n` :``;
    } 
    
    var songsdurations = message.client.queue.get(message.guild.id).songs;

    var time = 0;

   for(var i in songsdurations){

   isNaN(i) ? `` : time = parseInt(time)+parseInt(songsdurations[i].duration);

   }

   var minutes = Math.floor(time/60);
   var seconds = Math.floor(time%60);
      
   message.channel.send({embed:{
   color:0x070a29,
   title:`Playlist du serveur:`,
   thumbnail:{
   url:message.guild.iconURL()
   },
   fields:[{
     name:`Musique actuelle:`,
     value:`${serverQueue.songs[0].title} demandé par **${serverQueue.songs[0].requester}**`
     },
     {
     name:`File d'attente:`,
     value:`${songs.length == 1 ? "Aucunes autres musiques dans la file d'attente, ajoute en d'autres musiques avec +play <url/titre>" : resp}`
     },
     {
     name:`Durée totale:`,
     value:`${minutes} Minutes et ${seconds} Secondes`
     }],
     footer:{
     text:`© Queue | Xenova`,
     icon_url:this.client.user.avatarURL(), 
     }
     }});
  }
}

module.exports = Queue;
