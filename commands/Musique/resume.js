const Command = require("../../modules/Command.js");

class Resume extends Command {
  constructor(client) {
    super(client, {
      name: "resume",
      description: "Remet en marche la musique en pause.",
      usage: "resume"
    });
  }

  run(message) {
    const play = message.client.emojis.cache.find(e => e.name ==="Play")
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && !serverQueue.playing) {
      serverQueue.playing = true;
      serverQueue.connection.dispatcher.resume();
      return message.channel.send(`${play} Je remets en marche la musique !`);
    }
    return message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Il y a aucune musique dans la playlist.`);
  }
}

module.exports = Resume;
