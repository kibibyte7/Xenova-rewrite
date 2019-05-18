const Command =require("../../modules/Command.js") 

class Help extends Command {
constructor(client) {
	 super(client, {
	 name:"help", 
	 description:"Affiche la page d'aide ou l'aide d'une commande.",
         category:"Information", 
	 usage:"help [commande]", 
	 aliases:["h"] 
	 }) 
	}
	
	run(message, args, level) {
	 	
	const settings = message.settings;
		 
	         if(!args[0]){
		 
			message.channel.send({embed:{
			color:Math.floor(Math.random() * 16777214) + 1,
			title:`Menu de ${this.client.user.username}`,	
                        description:`Bienvenue dans l'interface help de **${this.client.user.username}**\n\nDans le bot il y a un total de **${this.client.commands.size} commandes**.\n\nVoici une liste de réactions pour les différentes catégories de commandes.\n\n⚙ = Système (Seul le owner du bot peut utiliser ces commandes.)\n\n⚡ = Admin (Seul un membre ayant un rôle nommé **XenoAdminPerm** peut les utiliser.)\n\n🔧 = Modérateur (Il faut un rôle nommé: **XenoModPerm** ou **XenoAdminPerm** pour utiliser ces commandes.)\n\n📄 = Informations (Informations sur une commande, serveur et autre.)\n\n📁 = Utilitaires (Commandes de recherches, math et autres.)\n\n🎵 = Musique (Commandes musique.)\n\n🎉 = Fun (Commandes funs, jeux, event.)\n\nNote:\nUtilise: **${this.client.config.defaultSettings.prefix}help <Nom de la commande> pour plus de détails.**`, 
			timestamp:new Date(), 
			footer:{
			icon_url:this.client.user.avatarURL,
			text:`©️ Help | Xenova`
			}
			}}).then(m => {
                        
                        m.react("⚙")
                        .then(m.react("⚡")
                        .then(m.react("🔧")
                        .then(m.react("📄")
                        .then(m.react("📁")
                        .then(m.react("🎵")
                        .then(m.react("🎉")
                        ))))))

                        //const filter = (reaction, user) => reaction.emoji.name === "⚙️" && user.id === message.author.id || reaction.emoji.name === "⚡" && user.id === message.author.id || reaction.emoji.name === "🔧" && user.id === message.author.id || reaction.emoji.name === "📄" && user.id === message.author.id || reaction.emoji.name === "📁" && user.id === message.author.id || reaction.emoji.name === "🎵" && user.id === message.author.id || reaction.emoji.name === "🎉" && user.id === message.author.id;
 
 
 
 
 
 
 
                        }) 
				
			}else{
			
			let command = args[0] 
			if(this.client.commands.has(command)){
				command = this.client.commands.get(command)
				if(level < this.client.levelCache[command.conf.permLevel]) return;
				message.channel.send({embed:{
				color:Math.floor(Math.random() * 16777214) + 1, 
				author:{
				name:`Help de la commande: ${command.help.name}`,
				icon_url:message.author.avatarUrl
				}, 
				fields:[{
				name:"Description:", 
				value:command.help.description
				},
				{
				name:"Utilisation:",
				value:settings.prefix+command.help.usage
				}, 
				{
				name:"Aliases:", 
				value:command.conf.aliases.length == 0 ? "Pas d'ailias" : command.conf.aliases.join	(", ") 
				}], 
				timestamp:new Date(), 
				footer:{
				icon_url:this.client.user.avatarUrl,
				text:`help ${command.help.name}` 
				}
				}})
				
			
			
       } 
   }
 
} 
}

module.exports = Help;
