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
    
    
    message.channel.send(`${this.client.emojis.find("name", "typing")} Recherche de \`${!serverQueue ? args.join(" ") : serverQueue.songs[0].title}\`.`).then(m => m.delete(4000))
        
    fetch(`https://api.ksoft.si/lyrics/search?q=${encodeURIComponent(!serverQueue ? args.join(" ") : serverQueue.songs[0].title)}`, {
    method: "GET",
    headers: {  Authorization: process.env.ksoft }
    }).then(res => {
    res.json().then(lyrics => {
    	
        if(!lyrics.data[0]) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Aucuns résultats trouvés.`); 
        console.log(lyrics.data[0].lyrics.length) 
        
        if(lyrics.data[0].lyrics.length < 2048){
        message.channel.send({embed:{
        title:`Lyrics de la musique : ${lyrics.data[0].artist} - ${lyrics.data[0].name}`,      
        color:0x010101, 
        description:lyrics.data[0].lyrics.substring(0, 2048), 
        timestamp:new Date(),
        footer:{
        icon_url:this.client.user.avatarURL,
        text:"© Lyrics | Xenova | Propulsé par l'api Ksoft.si" 
        } 
        }})
        return;
        } else {
        
        message.channel.send({embed:{
        title:`Lyrics de la musique : ${lyrics.data[0].artist} - ${lyrics.data[0].name}`,      
        color:0x010101, 
        description:lyrics.data[0].lyrics.substring(0, 2048), 
        timestamp:new Date()
        }})

        } 
         
        
        if(lyrics.data[0].lyrics.length < 4096){
        
        message.channel.send({embed:{
        color:0x010101, 
        description:lyrics.data[0].lyrics.substring(2048, 4096), 
        timestamp:new Date(),
        footer:{
        icon_url:this.client.user.avatarURL,
        text:"© Lyrics | Xenova | Propulsé par l'api Ksoft.si" 
        } 
        }})
        return;
        } else {
        
        message.channel.send({embed:{
        title:`Lyrics de la musique : ${lyrics.data[0].artist} - ${lyrics.data[0].name}`,      
        color:0x010101, 
        description:lyrics.data[0].lyrics.substring(4096, 6144), 
        timestamp:new Date()
        }})

        }  
        

        if(lyrics.data[0].lyrics.length > 6144){
        
        message.channel.send({embed:{
        color:0x010101, 
        description:lyrics.data[0].lyrics.slice(6144),
        timestamp:new Date(),
        footer:{
        icon_url:this.client.user.avatarURL,
        text:"© Lyrics | Xenova | Propulsé par l'api Ksoft.si" 
        } 
        }})
        } 
        }) 
        }) 
       

}	

}

module.exports = Lyrics;
