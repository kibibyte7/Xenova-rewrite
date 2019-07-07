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
    let songs = serverQueue.songs;
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send("Il n'y a aucune musique en cours !");
    return for(var i in songs){
    if(songs[i] == undefined) resp += ``;
    resp += `[${parseInt(i)+1}] - **${songs[i].title}** - Demandé par: **{songs[i].requester}**`
    } 
    
message.channel.send(`
**Musique actuelle:** ${serverQueue.songs[0].title} demandé par **${serverQueue.songs[0].requester}**\n\n${resp}`
);
  }
}

module.exports = Queue;
