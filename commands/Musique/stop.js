const Command = require("../../modules/Command.js");

class Stop extends Command {
  constructor(client) {
    super(client, {
      name: "stop",
      description: "Arrêter la musique.",
      usage: "stop",
      category:"Musique" 
    });
  }

  run(message) {
    const stop = this.client.emojis.find("name","stop")
    const { voiceChannel } = message.member;
    if (!voiceChannel)
      return message.channel.send(
        "Tu dois être dans un salon vocal pour utiliser cette commande !"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Il n'y a aucune musique dans la playlist.`);
    serverQueue.songs = [];
    serverQueue.connection.dispatcher.end("La musique a été stoppée !");
    message.channel.send(`${stop} La musique a été stoppée et j'ai quitté le vocal.`) 
  }
}

module.exports = Stop;
