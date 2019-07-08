const Command = require("../../modules/Command.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const search = require("yt-search");
const { Util } = require("discord.js");

class Play extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      description: "Jouer et ajouter de la musique.",
      category:"Musique", 
      usage: "play", 
      enabled:true
    });
  }

  async run(message, args) {
    const { voiceChannel } = message.member;
    if (!voiceChannel)
      return message.channel.send(`${this.client.emojis.find("name","wrongMark")} Tu dois être dans un salon vocal pour utiliser cette commande !`);
      
      let validate = ytdl.validateURL(args[0]);

        if(!validate){

            let Search = require("./search.js")

            let command = new Search() 

            return command.run(message, args)

                

        }

    const serverQueue = message.client.queue.get(message.guild.id);
    
 
    const songInfo = await ytdl.getInfo(args[0]);
    const song = {
      id: songInfo.video_id,
      title: songInfo.title,
      url: songInfo.video_url, 
      requester:message.author.username
    };
    console.log(song) 
     
    
    if (serverQueue) {
      serverQueue.songs.push(song);
      return message.channel.send(`${this.client.emojis.find("name", "Add")}**${song.title}** est ajoutée à la queue !`);
    }
    

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel,
      connection: null,
      songs: [],
      volume: 1,
      playing: true, 
      loop:false
    };

    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);

    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        queue.voiceChannel.leave();
        message.client.queue.delete(message.guild.id);
        return;
      }

      const dispatcher = queue.connection
        .playOpusStream(await ytdlDiscord(song.url), { passes: 3 })
        .on("end", reason => {
          if (reason === "Récupération trop lente !")
            console.log("La musique s'est arrêtée !");
          else console.log(reason);
          if(queue.loop == true) {
          return play(queue.songs[0])
          }

          if(queue.loop == false) {
          queue.songs.shift();
          play(queue.songs[0]);
          } 
          
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      queue.textChannel.send(`${${this.client.emojis.find("name", "Playing")}} Je joue: **${song.title}** demandé par : **${song.requester}**`);
    };

    try {
      const connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(queueConstruct.songs[0]);
    } catch (error) {
      console.error(`Je n'ai pas pu rejoindre le salon: ${error}`);
      message.client.queue.delete(message.guild.id);
      await voiceChannel.leave();
    }
  }
}

module.exports = Play;
