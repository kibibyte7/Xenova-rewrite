const Command = require("../../modules/Command.js");
const Ksoft = require("ksoft.js");
const ksoft = new Ksoft(process.env.ksoft);

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
      return message.channel.send(
        "Tu dois être dans un salon vocal pour utiliser cette commande !"
      );

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
        if (!message.member.voice.channel) return message.channel.send('Please join a voice channel');
        const voiceChannel = message.member.voice.channel;
        const voiceConnection = await voiceChannel.join();
        ksoft.lyrics.searchAndPlay(query, voiceConnection).then(res => {
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
