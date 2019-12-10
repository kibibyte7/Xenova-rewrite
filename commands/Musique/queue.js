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
    let songs = serverQueue.songs;
    for(var i in songs){
    songs.length == 1 ? resp += `Ajoute d'autres musiques avec +play <url/titre>` : resp += `[${parseInt(i)+1}] - **${songs[parseInt(i)+1].title}** - Demandé par: **${songs[parseInt(i)+1].requester}**\n`
    } 
    
message.channel.send(`
**Musique actuelle:** ${serverQueue.songs[0].title} demandé par **${serverQueue.songs[0].requester}**\n\n${resp}`
);
  }
}

module.exports = Queue;
