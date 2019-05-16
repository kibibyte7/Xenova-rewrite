const anime = require("node-kitsu");

const moment = require("moment");

const Command = require("../modules/Command.js")

class Anime extends Command {
constructor(client) {
super(client, {
name:"anime", 
description:"Donne des infos sur l'anime en question.",
usage:"anime <texte>" 
}) 
}

run (message, args, level) {

message.channel.send(":x: Spécifie un anime à rechercher.") 
	
	return;

	} else {

anime.searchAnime(args.join(), 0).then(results => {

    if(!results[0]) {

    	message.channel.send("⚡Aucun résultat trouvé.") 

    	return;

    	} else {

    	console.log(results[0].attributes) 

        message.channel.send({embed:{
    	color:0x010101,
    	title:results[0].attributes.canonicalTitle, 
    	author:{
    	name:message.author.tag,
    	icon_url:message.author.avatarURL
    	}, 
    	url:results[0].links.self,
    	fields:[
    	{
    	name:"Statut:", 
    	value:results[0].attributes.status == "finished" ? "Terminé" : "En cours" 
    	},
    	{
    	name:"Commencé le :", 
    	value:moment(results[0].attributes.startDate).format("LLLL") 
    	},
    	{
    	name:results[0].attributes.status == "finished" ? "Date de fin:" : "Date de la sortie du prochaine épisode:", 
    	value:results[0].attributes.status == "finished" ? moment(results[0].attributes.endDate).format("LLLL") : moment(results[0].attributes.nextRelease).format("LLLL")
    	}, 
    	{
    	name:"Rang de popularité:", 
    	value:results[0].attributes.popularityRank
        }, 
    	{
        name:"Synopsis:", 
        value:results[0].attributes.synopsis.length > 1024 ? results[0].attributes.synopsis.substring(0, 1021)+"..." : results[0].attributes.synopsis
        },
    	{
    	name:"Nombre de j'aime:", 
    	value:results[0].attributes.favoritesCount 
    	}, 
    	{
    	name:"NSFW ?", 
    	value:results[0].attributes.nsfw === false ? "Non" : "Oui"
    	}, 
    	{
    	name:"Nombre d'episodes:", 
    	value:results[0].attributes.episodeCount == null ? "Toujours en cours" : results[0].attributes.episodeCount 
    	}], 
    	thumbnail:{
    	url:results[0].attributes.posterImage.large
    	},
    	timestamp:new Date(), 
    	footer:{
    	icon_url:client.user.avatarURL,
    	text:"Anime" 
    	} 
    	}}) 
    	} 
    	}) 
} 

} 
}

module.exports = Anime
