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
    let resp = `**Playlist:**\n`;
    
    const serverQueue = message.client.queue.get(message.guild.id);
    
    if (!serverQueue)
      return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Il n'y a aucune musique en cours !`);
    let songs = serverQueue.songs.slice(1);
    
    if(songs.length > 0){
     
    for(var i in songs){
    !isNaN(i) ? resp += `[${parseInt(i)+1}] - **${songs[parseInt(i)].title}** - Demandé par: **${songs[parseInt(i)].requester}**\n` :``;
    } 
    
    var songs = message.client.queue.get(message.guild.id).songs;

    var time = 0;

   for(var i in songs){

   isNaN(i) ? `` : time = parseInt(time)+parseInt(songs[i].duration);

   }

   var minutes = Math.floor(time/60);
   var seconds = Math.floor(time%60);
      
   message.channel.send(`**Musique actuelle:** ${serverQueue.songs[0].title} demandé par **${serverQueue.songs[0].requester}**\n\nDurée totale: **${minutes} Minutes et ${seconds} Secondes**\n\n${resp}\n\nAjoute d'autres musiques avec +play <url/titre>`);
    
      
    } else {
      
    message.channel.send(`**Musique actuelle:** ${serverQueue.songs[0].title} demandé par **${serverQueue.songs[0].requester}**`);
      
    }
  }
}

module.exports = Queue;
