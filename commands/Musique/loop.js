const Command = require("../../modules/Command.js");

class Loop extends Command {
  constructor(client) {
    super(client, {
      name: "loop",
      description: "Met la première musique en boucle.",
      category:"Musique", 
      usage: "loop"
    });
  }

  run(message) {
    const serverQueue = message.client.queue.get(message.guild.id);
    if (serverQueue && serverQueue.loop){
      if(serverQueue.loop  == false) {
      serverQueue.loop = true;
      serverQueue.connection.dispatcher.pause();
      return message.channel.send("🔄 boucle activée !");
    } else {
    serverQueue.loop = false;
    serverQueue.connection.dispatcher.pause();
    return message.channel.send("🔄 boucle désactivée !");
    } 
    return message.channel.send(
      `${this.client.emojis.find("name", "wrongMark")} Il y a aucune musique dans la playlist.`
    );
    } 
  }
}

module.exports = Loop;
