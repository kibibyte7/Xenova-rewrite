var Twit = require('twit')
 
var T = new Twit({
  consumer_key:         process.env.consumer_key,
  consumer_secret:      process.env.consumer_secret,
  access_token:         process.env.access_token,
  access_token_secret:  process.env.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
  strictSSL:            true,     // optional - requires SSL certificates to be valid.
})


const Command = require("../../modules/Command.js");

class Tweet extends Command {
  constructor(client) {
    super(client, {
      name: "tweet",
      FRdescription: "Le bot poste un tweet sur Twitter.",
      ENdescription:"The bot posts a tweet on Twitter.", 
      category:"Fun", 
      FRusage: "tweet <texte>",
      ENusage:"tweet <text>",
      cooldown: 10,
      permissions:["EMBED_LINKS"], 
      aliases:[] 
    });
  }

  run(message, args) {
  
  if(args.length == 0) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Entre un texte à tweeter.`) 
  
  if(args.join(" ").length + ": ".length + message.author.tag.length > 140) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Ton message est trop long. Il doit pas dépasser les 140 caractères.`)
      	    	
      	T.post('statuses/update', { status: `${message.author.tag}: ${args.join(" ")}` } , function(err, data, response) {
      console.log(data)
      message.channel.send({embed:{
      	color:0xff0c69, 
      	title:"Twitter", 
      	description:"Les tweets ont une limite de 140 caractères, donc faut pas trop faire de pavé.", 
      	fields:[{
      	name:`Contenu:`, 
      	value:data.text
      	},
      	{
      	name:`Le lien:`,
      	value:`[Dernier status de Xenova](https://twitter.com/${data.user.screen_name}/status/${data.id_str}?s=19)`, 
      	}], 
      	timestamp:new Date(), 
        footer:{
      	icon_url:data.user.profile_image_url_https,
      	text:"©️ Tweet | Xenova" 
      	} 
      	}}) 
      })

}	

}

module.exports = Tweet;
