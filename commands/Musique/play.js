const Command = require("../../modules/Command.js");
const Ksoft = require("ksoft.js");
const ksoft = new Ksoft(process.env.ksoft);
const { MessageEmbed } = require("discord.js") 

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
    

    //const serverQueue = message.client.queue.get(message.guild.id);
    //const song = {
      //,
      //title: songInfo.title,
      //url: songInfo.video_url
   // };
   // console.log(song) 

    //if (serverQueue) {
      //serverQueue.songs.push(song);
      //return message.channel.send(
        //`✅ **${song.title}** est ajoutée à la queue !`
      //);
    //}

    //const queueConstruct = {
      //textChannel: message.channel,
      //voiceChannel,
      //connection: null,
      //songs: [],
      //volume: 1,
      //playing: true
    //};
    //message.client.queue.set(message.guild.id, queueConstruct);
    //queueConstruct.songs.push(song);

    //const play = async song => {
      //const queue = message.client.queue.get(message.guild.id);
      //if (!song) {
        //queue.voiceChannel.leave();
        //message.client.queue.delete(message.guild.id);
        //return;
      //}

    
    const query = args.join(" ") ;
        if (!message.member.voiceChannel) return message.channel.send('Please join a voice channel');
        const voiceChannel = message.member.voiceChannel;
        const connection = await voiceChannel.join();
        ksoft.lyrics.searchAndPlay(query, connection).then(res => {
        console.log(res.json)
            const embed = new Discord.MessageEmbed()
                .setTitle('Song Info')
                .setColor('ce0202')
                .setDescription(`[${res.apiResponse.name}](${res.youtubeResult.url})`)
                .addField('Song Duration:', res.youtubeResult.duration)
                //.addField('Artist:', res.apiResponse.artist)
                .addField('Lyrics:', res.apiResponse.lyrics)
                .setThumbnail(res.apiResponse.album_art)
                .setFooter('Powered by: Ksoft.si');
            message.channel.send(embed);
        });
} 

}

module.exports = Play;
