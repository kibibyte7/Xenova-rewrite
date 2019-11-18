const Command =require("../../modules/Command.js") 

const clashApi = require("clash-of-clans-api")

const clash = clashApi({
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
.then(response => console.log(response))
.catch(e => console.log(e))

} 
}

module.exports = ClashOfClans;	
