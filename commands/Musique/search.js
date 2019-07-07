const Command = require("../../modules/Command.js");
const ytdl = require("ytdl-core");
const ytdlDiscord = require("ytdl-core-discord");
const search = require("yt-search");
const { Util } = require("discord.js");

class Search extends Command {
  constructor(client) {
    super(client, {
      name: "search",
      description: "Cherche et joue la musique souhaitée.",
      category:"Musique", 
      usage: "search", 
      enabled:true
    });
  }

   run(message, args) {
  	
   search(args.join(" "), function (err, res){ 
   	
   	if(err) return message.channel.send(":x: Une erreur est survenue lors de la recherche.") 
   	
   	let videos = res.videos.slice(0, 10); 
   	
   	let resp = ''; 
   	
   	for (var i in videos) { 
   		
   	resp += `**[${parseInt(i)+1}]**\`${videos[i].title}\`\n`; 
   	
   	} 
   	
   	resp += `\`Choisi un résultat de entre 1 et ${videos.length} ou cancel pour annuler\`` 
   	
   	message.channel.send(resp) 
   	
   	const filter = m => !isNaN(m.content) && m.content < videos.length+1 && m.content > 0 && message.author || m.content ==="cancel" && message.author;
   	
   	const collector = message.channel.createCollector(filter); 
   	
   	collector.videos = videos; 
   	
   	collector.once('collect', function(m) { 
   		
   		if(m.content === "cancel"){ 
   			
   		collector.stop(); 
   		
   		console.log("reçu") 
   		
   		message.channel.send("Choix annulé"); 
   		
   		return; 
   		
   		}

            let Play = require("./play.js")
        
            let command = new Play();

            return command.run(message,  [this.videos[parseInt(m.content-1)].url])

 }) 
 
}) 

}
} 

module.exports = Search;
