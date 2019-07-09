const Command = require("../../modules/Command.js");

class Volume extends Command {
  constructor(client) {
    super(client, {
      name: "volume",
      description: "Ajuster le volume de la musique.",
      usage: "volume [nombre]"
    });
  }

  run(message, args) {
    const { voiceChannel } = message.member;
    if (!voiceChannel)
      return message.channel.send(
        `${message.client.emojis.find("name","wrongMark")} Tu être dans un salon vocal pour utiliser cette commande !`
      );
    const serverQueue = message.client.queue.get(message.guild.id);
    if (!serverQueue)
      return message.channel.send("Il n'y a aucune musique en cours !");
    if (isNaN(args[0])) 
      return message.channel.send(
        `${message.client.emojis.find("name","checkMark")} Le volume actuel est: **${serverQueue.volume}**`
      );
    serverQueue.volume = args[0];
    serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
    return message.channel.send(`${message.client.emojis.find("name","checkMark")} J'ai mis le volume à: **${args[0]}**`);
  }
}

module.exports = Volume;
