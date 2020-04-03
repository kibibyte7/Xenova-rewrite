const Command = require("../../modules/Command.js");

class Pause extends Command {
  constructor(client) {
    super(client, {
      name: "pause",
      description: "Arrêter la musique.",
      category:"Musique", 
      usage: "pause"
    });
  }

  run(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.playing) {
      serverQueue.playing = false;
      serverQueue.connection.dispatcher.pause();
      return message.channel.send(`${message.client.emojis.cache.find(e => e.name === "Pause")} La musique à été en pause !`);
    }
    return message.channel.send(
      `${message.client.emojis.cache.find(e => e.name ==="wrongMark")} Il y a aucune musique dans la playlist.`
    );
  }
}

module.exports = Pause;
