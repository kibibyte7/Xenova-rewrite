const request = require("request")
const superagent = require("superagent")

const Command = require("../../modules/Command.js")

class Bingo extends Command {
constructor(client) {
super(client, {
name:"bingo", 
description:"Deviner le nombre entre 0 et le nombre souhaité. (100 par défaut)", 
category:"Fun", 
permLevel:"XenoModPerm" 
}) 
} 

run (message, args, level) {

const BingoUrl = process.env.bingourl;
     request(BingoUrl, (err, res, body) => {
         
         console.log('chargement !')
         
         if(err || res.statusCode!== 200)return
         
         console.log('chargé avec succés')
         var bingo = JSON.parse(body)
    let nombre = !isNaN(args[0]) ? Math.floor(Math.random() * args[0]) : Math.floor(Math.random()*100);
    
        if(bingo[message.guild.id]){
            message.channel.send("le bingo est déjà en cours.")
            return;
        }else{
       
        message.channel.send(`${this.client.emojis.find("name", "typing")} Veux tu lancer un bingo entre 0 et ${nombre} ?`).then(m => {
        
        const check = this.client.emojis.find("name", "checkMark")

        const wrong = this.client.emojis.find("name", "wrongMark")

         const filter = (reaction, user) => reaction.emoji.name == check.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id;
	     
         var collectR = m.createReactionCollector(filter)
	     
         collectR.on('collect', r => {
	     	
         if(r.emoji.name == check.name){
	     		
         r.remove(message.author); 

        if(!bingo[message.guild.id]) bingo[message.guild.id] = {};
        request({ url: BingoUrl, method: 'PUT', json: bingo})
        message.author.send(`le nombre est : **${nombre}**`)
        m.edit(`${check} Le bingo est lancé devinez le nombre entre **0 et ${!isNaN(args[0]) ? args[0] : "100"}**.`)
        
        var timer = setTimeout(() => {
        delete bingo[message.guild.id]
        request({ url: BingoUrl, method: 'PUT', json: bingo})
        message.channel.send("Zetes des noob à ne pas trouver le nombre au bout de 2 minutes, la réponse était : **"+nombre+"**")
     }, 120000);

    var collect = message.channel.createCollector(m => m);
    collect.on("collect", m => {
            if(m.content === `${nombre}`){
                console.log("Reçu")
                clearTimeout(timer)
                delete bingo[message.guild.id]
                request({ url: BingoUrl, method: 'PUT', json: bingo})
                collect.stop();
                message.channel.send(`GG à ${m.author} qui a trouvé le nombre **${nombre}** !`)
            }
     },120000)
     m.clearReactions()
     collectR.stop();
     } else {

     m.clearReactions();

     m.edit(`${wrong} Bingo entre **0** et **${nombre}** annulé.`) 

     collectR.stop();

}      

}) 

}) 

}
   
})

} 
} 