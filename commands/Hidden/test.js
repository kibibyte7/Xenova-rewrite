const Command =require("../../modules/Command.js") 

const clashApi = require("clash-of-clans-api")

const clash = clashApi({
request: {
    proxy: process.env.FIXIE_URL,
},
token:process.env.coctoken
})

class ClashOfClans extends Command {
constructor(client) {
super(client, {
name:"coc", 
FRdescription:"Donne des statistiques sur un clans ou un utilisateur.",
category:"Information", 
usage:"", 
aliases:[] 
}) 
}
	
run(message, args, level, con) {

clash.clanByTag(args[0])
.then(clan => {
message.channel.send({embed:{
color:0x010101,
title:`Informations sur le clan: ${clan.name}`,
fields:[{
name:"Type:", 
value:clan.type === 'inviteOnly' ? "Sur invitation" : "Ouvert"
},
{
name:"Nombre de membres:", 
value:clan.members
},
{
name:"Trophées requis:", 
value:clan.requiredTrophies
},
{
name:"Fréquence guerres de clans:", 
value:clan.warFrequency === "always" ? "Toujours" : clan.warFrequency
},
{
name:"Description:", 
value:clan.description
},
{
name:"Localisation:",
value:clan.location.name
}, 
{
name:"Niveau du clan:" 
value:clan.clanLevel
}, 
{
name:"Points du clan:" 
value:`${clan.clanPoints} - ${clan.clanVersusPoints}`
},
{
name:"Guerres de clans gagnées d'affilié:" 
value:clan.warWinStreak
},
{
name:"Guerres de clans gagnées en total:", 
value:clan.warWins
}],
thumbnail:{
url:clan.badgeUrls.large
},
timestamp:new Date(), 
footer:{

} 
}}) 
})
.catch(e => console.log(e))

} 
}

module.exports = ClashOfClans;	
