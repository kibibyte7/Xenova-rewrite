const Command = require("../../modules/Command.js");

class Skip extends Command {
  constructor(client) {
    super(client, {
      name: "skip",
      description: "Skip la musique qui est en train d'être jouée.",
      usage: "skip"
    });
  }

  run(message) {
    const { voiceChannel } = message.member;
    if (!voiceChannel)
      return message.channel.send(
        "Tu dois être dans un salon vocal pour utiliser cette commande !"
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Il n'y a aucune musique dans la playlist.`);

    serverQueue.connection.dispatcher.end("La musique a été skip.");
  }
}

module.exports = Skip;
