const Command = require("../../modules/Command.js");
const ytdl = require("ytdl-core");
const search = require("yt-search");
const { Util } = require("discord.js");

class Play extends Command {
  constructor(client) {
    super(client, {
      name: "play",
      description: "Jouer et ajouter de la musique.",
      category:"Musique", 
      usage: "play", 
      enabled:true,
      permissions:["CONNECT", "USE_EXTERNAL_EMOJIS"],
      aliases:["p"]
    });
  }

  async run(message, args) {
    const { voiceChannelBoolean } = message.member.voice.channel ? true : false;
    const voiceChannel = message.member.voice.channel;
    if (voiceChannelBoolean == false)
      return message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Tu dois être dans un salon vocal pour utiliser cette commande !`);
      
      let validate = ytdl.validateURL(args[0]);

        if(!validate){

            let Search = require("./search.js")

            let command = new Search();

            return command.run(message, args)

                

        }

    const serverQueue = message.client.queue.get(message.guild.id);
    
 
    const songInfo = await ytdl.getInfo(args[0]);
    console.log(songInfo)
    const song = {
      id: songInfo.video_id,
      title: songInfo.title,
      url: songInfo.video_url, 
      requester:message.author.username,
      duration:songInfo.length_seconds,
    };
    console.log(song) 
     
    
    if (serverQueue) {
      serverQueue.songs.push(song);
      return message.channel.send(`${message.client.emojis.cache.find(e => e.name === "Add")} **${song.title}** est ajoutée à la queue !`);
    }

    const queueConstruct = {
      textChannel: message.channel,
      voiceChannel,
      connection: null,
      songs: [],
      volume: 1,
      playing: true, 
      loop:false,
    };
    
    message.client.queue.set(message.guild.id, queueConstruct);
    queueConstruct.songs.push(song);
    const play = async song => {
      const queue = message.client.queue.get(message.guild.id);
      if (!song) {
        this.client.channels.cache.get(queue.textChannel.id).send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} La playlist est vide.`);
        
        await queue.voiceChannel.leave();
        
        setTimeout(() => {
          
        message.client.queue.delete(message.guild.id);
          
        }, 5000);
        
        return;
      }

      const dispatcher = queue.connection
        .play(await ytdl(queue.songs[0].url, {type:"opus"}))
        .on("finish", () => {
          
          if(queue.loop == true) {
            
          return play(queue.songs[0].url, {type:"opus"})
            
          } else {
          
          var nextSong = queue.songs.shift();
           
          setTimeout(() => {
            
          play(ytdl(nextSong.url, {type:"opus"}))
          
          }, 1000)
                     
          }
          
        })
        .on("error", error => console.error(error));
      dispatcher.setVolumeLogarithmic(queue.volume / 5);
      queue.textChannel.send(`${message.client.emojis.cache.find(e => e.name === "Playing")} Je joue: **${queue.songs[0].title}** demandé par : **${queue.songs[0].requester}**`);
    };

    try {
      const connection = await voiceChannel.join();
      queueConstruct.connection = connection;
      play(await ytdl(queueConstruct.songs[0].url, {type:"opus"}));
    } catch (error) {
      console.error(`Je n'ai pas pu rejoindre le salon: ${error}`);
      message.client.queue.delete(message.guild.id);
      await voiceChannel.leave();
    }
  }
}

module.exports = Play;
