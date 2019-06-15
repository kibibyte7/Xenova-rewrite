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

    const play = async song => {
      //const queue = message.client.queue.get(message.guild.id);
      //if (!song) {
        //queue.voiceChannel.leave();
        //message.client.queue.delete(message.guild.id);
        //return;
      //}

    try {
    var connection = message.member.voiceChannel.join();
    ksoft.lyrics.searchAndPlay(args.join(" "), connection) 
    
  } catch (e) {
  console.log(e) 
} 
}

module.exports = Play;
