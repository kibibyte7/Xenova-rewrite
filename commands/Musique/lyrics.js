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
    
    if(!serverQueue) return message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} La playlist est vide, entre un titre de musique à rechercher.`);
    
    message.channel.send(`${this.client.emojis.cache.find(e => e.name === "typing")} Recherche de \`${serverQueue.songs.length === 0 ? args.join(" ") : serverQueue.songs[0].title}\`.`).then(m => m.delete({timeout: 5000}))
        
    fetch(`https://api.ksoft.si/lyrics/search?q=${encodeURIComponent(serverQueue.songs.length === 0 ? args.join(" ") : serverQueue.songs[0].title)}`, {
    method: "GET",
    headers: {  Authorization: process.env.ksoft }
    }).then(res => {
    res.json().then(lyrics => {
    	
        if(!lyrics.data[0]) return message.channel.send(`${this.client.emojis.cache.find(e => e.name === "wrongMark")} Aucuns résultats trouvés.`); 
        
        const right = this.client.emojis.cache.find(e => e.name === "droite") 

        const left =this.client.emojis.cache.find(e => e.name === "gauche") 

        const wrong = this.client.emojis.cache.find(e => e.name === "wrongMark") 

        let page = 1;
        
        let start = 0;

        let end = 2048;

        let finalpage = lyrics.data[0].lyrics.length < 2048 ? 1 : Math.round(lyrics.data[0].lyrics.length/2048)+1

        console.log(lyrics.data[0].lyrics.length) 
       
        message.channel.send({embed:{
        title:`Lyrics de la musique : ${lyrics.data[0].artist} - ${lyrics.data[0].name}`,      
        color:0x010101, 
        description:lyrics.data[0].lyrics.substring(start, end), 
        timestamp:new Date(),
        footer:{
        icon_url:this.client.user.avatarURL,
        text:`©️ Lyrics | Xenova | Page ${page}/${finalpage} | Propulsé par l'api Ksoft.si`
        } 
        }}).then(m => {
        
        m.react(left) 
        setTimeout(() =>{m.react(right)},1000)
        setTimeout(() =>{m.react(wrong)},2000)

        const filtre = (reaction, user) => reaction.emoji.name == left.name && user.id == message.author.id || reaction.emoji.name == right.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id; 
        
        const collect = m.createReactionCollector(filtre);
        
        collect.on('collect' , r => {
        
        if(r.emoji.name == left.name){

        r.reactions.remove(message.author) 

        if(page == 1) return;

        page--;
        
        start = start - 2048;

        end = end - 2048;

        m.edit({embed:{
            color:Math.floor(Math.random() * 16777214) + 1,
            author:{
                name:`Lyrics de la musique : ${lyrics.data[0].artist} - ${lyrics.data[0].name}`,
                icon_url:message.author.avatarURL
            },
            description:`${lyrics.data[0].lyrics.slice(start, end)}`,
            timestamp:new Date(),
            footer:{
                 icon_url:this.client.user.avatarURL,
                 text:`©️ Lyrics | Xenova | Page ${page}/${finalpage} | Propulsé par l'api Ksoft.si`
            }
        }})
        
        } 
        
        if(r.emoji.name == right.name){

        r.reactions.remove(message.author) 

        if(page == finalpage || finalpage < page) return;

        page++;
        
        start += 2048;

        end += 2048;

        m.edit({embed:{
            color:Math.floor(Math.random() * 16777214) + 1,
            author:{
                name:`Lyrics de la musique : ${lyrics.data[0].artist} - ${lyrics.data[0].name}`,
                icon_url:message.author.avatarURL
            },
            description:`${lyrics.data[0].lyrics.slice(start, end)}`,
            timestamp:new Date(),
            footer:{
                 icon_url:this.client.user.avatarURL,
                 text:`©️ Lyrics | Xenova | Page ${page}/${finalpage} | Propulsé par l'api Ksoft.si`
            }
        }})
        
        } 
        
        if(r.emoji.name == wrong.name){

        m.edit({embed:{
        color:0xff0c69, 
        description:`${wrong} Le paginateur est fermé, suppression du message dans 3 secondes.`,
        timestamp:new Date(), 
        footer:{
        icon_url:this.client.user.avatarURL,
        text:`©️ Lyrics | Xenova | Page ${page}/${finalpage} | Propulsé par l'api Ksoft.si`
        }
        }}).then(msg => {
        message.delete({timeout:4000})
        msg.delete({timeout:3000})
        }) 

        m.reactions.removeAll();

        collect.stop();

        } 
      
        }) 
        
        }) 
        }) 
       

        }) 

} 
}

module.exports = Lyrics;
