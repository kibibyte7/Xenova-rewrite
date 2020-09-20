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
    const skip = this.client.emojis.cache.find(e => e.name === "Skip")
    const { voiceChannelBoolean } = message.member.voice.channel ? true : false;
    const voiceChannel = message.member.voice.channel;
    if (voiceChannelBoolean == false)
      return message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Tu dois être dans un salon vocal pour utiliser cette commande !`);
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Il n'y a aucune musique dans la playlist.`);
    
    message.channel.send(`${skip} La musique : **${serverQueue.songs[0].title}** a été skip.`)
    serverQueue.connection.dispatcher.emit("finish");
    
  }
}

module.exports = Skip;
