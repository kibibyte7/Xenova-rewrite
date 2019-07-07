const Command = require("../../modules/Command.js");

class Queue extends Command {
  constructor(client) {
    super(client, {
      name: "queue",
      description: "Afficher la liste de musique.",
      usage: "queue"
    });
  }

  run(message) {
    let resp = `**Playlist:**\n`;
    
    const serverQueue = message.client.queue.get(message.guild.id);
    
    if (!serverQueue)
      return message.channel.send("Il n'y a aucune musique en cours !");
    let songs = serverQueue.songs;
    for(var i in songs){
    resp += isNaN(i) ? `` : `[${parseInt(i)+1}] - **${songs[i].title}** - Demandé par: **${songs[i].requester}**\n`
    } 
    
message.channel.send(`
**Musique actuelle:** ${serverQueue.songs[0].title} demandé par **${serverQueue.songs[0].requester}**\n\n${resp}`
);
  }
}

module.exports = Queue;
