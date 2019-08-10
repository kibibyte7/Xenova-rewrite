const fetch = require("node-fetch");
const Command = require("../../modules/Command.js");

class Lyrics extends Command {
  constructor(client) {
    super(client, {
      name: "lyrics",
      description: "Affiche les paroles de la musique souhaitée.",
      category:"Musique", 
      usage: "lyrics <recherche>", 
      aliases:["l"] 
    });
  }

  run(message, args) {
    


    const serverQueue = message.client.queue.get(message.guild.id);
    
    if(!serverQueue) {
    if(!args[0] || args.length < 1) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Tu dois entrer une recherche.`); 
    } else {
    	
    message.channel.send(`${this.client.emojis.find("name", "typing")} Recherche de \`${serverQueue ? serverQueue.songs[0].title : args.join(" ")}\`.`).then(m => m.delete(4000))
        
    fetch(`https://api.ksoft.si/lyrics/search?q=${encodeURIComponent(serverQueue ? serverQueue.songs[0].title :args.join(" "))}`, {
    method: "GET",
    headers: {  Authorization: process.env.ksoft }
    }).then(res => {
    res.json().then(lyrics => {
    	
        if(!lyrics.data[0]) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Aucuns résultats trouvés.`); 
        
        message.channel.send({embed:{
        title:`Lyrics de la musique : ${lyrics.data[0].artist} - ${lyrics.data[0].name}`,      
        color:0x010101, 
        description:lyrics.data[0].lyrics.substring(0, 2000)
        }})
        
        
        
        if(lyrics.data[0].lyrics.length < 4000){
        
        message.channel.send({embed:{
        color:0x010101, 
        description:lyrics.data[0].lyrics.slice(2000),
        timestamp:new Date(),
        footer:{
        icon_url:this.client.user.avatarURL,
        text:"© Lyrics | Propulsé par l'api Ksoft.si" 
        } 
        }})        
        
        } 
        
        if(lyrics.data[0].lyrics.length > 4000){
        
        message.channel.send({embed:{
        color:0x010101, 
        description:lyrics.data[0].lyrics.substring(2000, 4000),
        }}) 
        message.channel.send({embed:{
        color:0x010101, 
        description:lyrics.data[0].lyrics.slice(4000),
        timestamp:new Date(),
        footer:{
        icon_url:this.client.user.avatarURL,
        text:"© Lyrics | Propulsé par l'api Ksoft.si" 
        } 
        }})
        } 
        }) 
       }) 
       
    }

}	

}

module.exports = Lyrics;
