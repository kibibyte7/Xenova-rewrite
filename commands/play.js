const Command = require("../modules/Command.js") 

const ytdl = require("ytdl-core")
const ydtldiscord = require ("ytdl-core-discord") 
const { Util } = require("discord.js") 

class Play extends Command {
	constructor(client) {
	super(client, {
	name:"play",
	description:"Joue la musique souhaitée en vocal.",
	usage:"play <lien ou titre>", 
	aliases:["p"] 
	}) 
	} 
	
	
async run(message, args, level){
const { voiceChannel } = message.member;
if(!voiceChannel) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu n'es pas dans un channel vocal.`);
  const serverQueue = this.client.queue.get(message.guild.id) 
  const songInfo = ytdl.getInfo(args[0]);
  const song = {
  title:"non défini", 
  url:args[0],
  requester:message.author.username
  } 
  
  if(serverQueue) {
  serverQueue.songs.push(song)
  return message.channel.send(`${this.client.emojis.find("name", "checkMark")} **${song.title}** a été ajouté à la playlist.`)
  } 
  
  const queueConstruct = {
  textChannel:message.channel,
  voiceChannel,
  connection:null,
  songs:[], 
  playing:true, 
  voulume:1
  } 
  
  this.client.queue.set(message.guild.id, queueConstruct) 
  queueConstruct.songs.push(song) 
  const play = async song => {
  	const queue = this.client.queue.get(message.guil.id)
  	if(!queue){
  	 queue.voiceChannel.leave()
  	 this.client.queue.delete(message.guild.id)
  	 return;
  		}
  		
  		const dispatcher = queue.connection
  		.playOpusStream(await ytdldiscord(song.url), {passes: 3})
  		.on('end', reason => {
  			if(reason === "Timeout")
  			console.log("La musique s'est arrêté.") 
  			else console.log(reason)
  			queue.songs.shift()
  			play(queue.songs[0])
  			}).on("error", e => console.log(e)) 
  			dispatcher.setVolumeLogarithmic(queue.volume / 5)
  			queue.textChannel.send(`Je joue **${song.title}** demandé par **${song.requester}**.`)
  	} 
  	try{
  	const connection = voiceChannel.join();
  	queueConstruct.connection = connection;
  	play(queueConstruct.songs[0])
  	} catch (e) {
  	message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Je n'ai pas pu rejoindre le channel vocal: **${e}**`)
  	this.client.queue.delete(message.guild.id)
  	await voiceChannel.leave()
  	} 
  
  }
} 


module.exports = Play;
