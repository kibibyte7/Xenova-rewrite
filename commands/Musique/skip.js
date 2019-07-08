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
    const skip = message.client.emojis.find("name","Skip")
    const { voiceChannel } = message.member;
    if (!voiceChannel)
      return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu dois être dans un salon vocal pour utiliser cette commande !`);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Il n'y a aucune musique dans la playlist.`);
    
    message.channel.send(`${skip} La musique : **${serverQueue.songs[0].title}** a été skip.`)
    serverQueue.connection.dispatcher.end("La musique a été skip.");
    
  }
}

module.exports = Skip;
