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
    if(serverQueue.loop  === false) {
      serverQueue.loop = true;
      message.channel.send("🔄 boucle activée !");
    } else {
    serverQueue.loop = false;
    message.channel.send("🔄 boucle désactivée !");
    } 
    }else{
   return message.channel.send(
      `${this.client.emojis.find("name", "wrongMark")} Il y a aucune musique dans la playlist.`
    );
   } 
  }
}

module.exports = Loop;
