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
                        description:`Bienvenue dans l'interface help de **${this.client.user.username}**\n\nDans le bot il y a un total de **${this.client.commands.size} commandes**.\n\nVoici une liste de réactions pour les différentes catégories de commandes.\n\n⚙ = Système (Seul le owner du bot peut utiliser ces commandes.)\n\n⚡ = Admin (Seul un membre ayant un rôle nommé **XenoAdminPerm** peut les utiliser.)\n\n🔧 = Modérateur (Il faut un rôle nommé: **XenoModPerm** ou **XenoAdminPerm** pour utiliser ces commandes.)\n\n📄 = Informations (Informations sur une commande, serveur et autre.)\n\n📁 = Utilitaires (Commandes de recherches, math et autres.)\n\n🎵 = Musique (Commandes musique.)\n\n🎉 = Fun (Commandes funs, jeux, event.)\n\n❌ = Fermer le menu.\n\n\nNote:\nUtilise: **${this.client.config.defaultSettings.prefix}help <Nom de la commande> pour plus de détails.**`, 
			timestamp:new Date(), 
			footer:{
			icon_url:this.client.user.avatarURL,
			text:`©️ Help | Xenova`
			}
			}}).then(m => {
                        
                        m.react("⚙") 
                        .then(m.react("⚡") && this.client.wait(2000)
                        .then(m.react("🔧") && this.client.wait(2000)
                        .then(m.react("📄") && this.client.wait(2000)
                        .then(m.react("📁") && this.client.wait(2000)
                        .then(m.react("🎵") && this.client.wait(2000)
                        .then(m.react("🎉") && this.client.wait(2000)
                        .then(m.react("❌") && this.client.wait(2000)
                        )))))))

                        const filter = (reaction, user) => reaction.emoji.name === "⚙" && user.id === message.author.id || reaction.emoji.name === "⚡" && user.id === message.author.id || reaction.emoji.name === "🔧" && user.id === message.author.id || reaction.emoji.name === "📄" && user.id === message.author.id || reaction.emoji.name === "📁" && user.id === message.author.id || reaction.emoji.name === "🎵" && user.id === message.author.id || reaction.emoji.name === "🎉" && user.id === message.author.id || reaction.emoji.name === "❌" && user.id === message.author.id;
 
                        const collect = m.createReactionCollector(filter) 

                        collect.on('collect', r => {
                         
                        if(r.emoji.name === "⚙"){
                        r.remove(message.author)
                        m.edit({embed:{
			color:Math.floor(Math.random() * 16777214) + 1,
			title:`⚙ Commandes Système [${this.client.commands.filter(c => c.help.category === "Système").size}]`,	
                        description:this.client.commands.filter(c => c.help.category === "Système").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${cmd.help.description}`).join("\n"), 
                        timestamp:new Date(), 
			footer:{
			icon_url:this.client.user.avatarURL,
			text:`©️ Help | Xenova`
			}
			}})
                        } 

                        if(r.emoji.name === "⚡"){
                        r.remove(message.author)
                        m.edit({embed:{
			color:Math.floor(Math.random() * 16777214) + 1,
			title:`⚡ Commandes Admin [${this.client.commands.filter(c => c.help.category === "Admin").size}]`,	
                        description:this.client.commands.filter(c => c.help.category === "Admin").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${cmd.help.description}`).join("\n"), 
                        timestamp:new Date(), 
			footer:{
			icon_url:this.client.user.avatarURL,
			text:`©️ Help | Xenova`
			}
			}})
                        } 
    
                        if(r.emoji.name === "🔧"){
                        r.remove(message.author)
                        m.edit({embed:{
			color:Math.floor(Math.random() * 16777214) + 1,
			title:`🔧 Commandes Modérateur [${this.client.commands.filter(c => c.help.category === "Modérateur").size}]`,	
                        description:this.client.commands.filter(c => c.help.category === "Modérateur").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${cmd.help.description}`).join("\n"), 
                        timestamp:new Date(), 
			footer:{
			icon_url:this.client.user.avatarURL,
			text:`©️ Help | Xenova`
			}
			}})
                        } 
    
                        if(r.emoji.name === "📄"){
                        r.remove(message.author)
                        m.edit({embed:{
			color:Math.floor(Math.random() * 16777214) + 1,
			title:`📄 Commandes Information [${this.client.commands.filter(c => c.help.category === "Information").size}]`,	
                        description:this.client.commands.filter(c => c.help.category === "Information").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${cmd.help.description}`).join("\n"), 
                        timestamp:new Date(), 
			footer:{
			icon_url:this.client.user.avatarURL,
			text:`©️ Help | Xenova`
			}
			}})
                        } 
    
                        if(r.emoji.name === "📁"){
                        r.remove(message.author)
                        m.edit({embed:{
			color:Math.floor(Math.random() * 16777214) + 1,
			title:`📁 Commandes Utilitaires [${this.client.commands.filter(c => c.help.category === "Utilitaire").size}]`,	
                        description:this.client.commands.filter(c => c.help.category === "Utilitaire").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${cmd.help.description}`).join("\n"), 
                        timestamp:new Date(), 
			footer:{
			icon_url:this.client.user.avatarURL,
			text:`©️ Help | Xenova`
			}
			}})
                        } 
     
                        if(r.emoji.name === "🎵"){
                        r.remove(message.author)
                        m.edit({embed:{
			color:Math.floor(Math.random() * 16777214) + 1,
			title:`🎵 Commandes Musique [${this.client.commands.filter(c => c.help.category === "Musique").size}]`,	
                        description:this.client.commands.filter(c => c.help.category === "Musique").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${cmd.help.description}`).join("\n"), 
                        timestamp:new Date(), 
			footer:{
			icon_url:this.client.user.avatarURL,
			text:`©️ Help | Xenova`
			}
			}})
                        } 
             
                        if(r.emoji.name === "🎉"){
                        r.remove(message.author)
                        m.edit({embed:{
			color:Math.floor(Math.random() * 16777214) + 1,
			title:`🎉 Commandes Fun [${this.client.commands.filter(c => c.help.category === "Fun").size}]`,	
                        description:this.client.commands.filter(c => c.help.category === "Fun").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${cmd.help.description}`).join("\n"), 
                        timestamp:new Date(), 
			footer:{
			icon_url:this.client.user.avatarURL,
			text:`©️ Help | Xenova`
			}
			}})
                        } 

                        if(r.emoji.name === "❌"){
                        r.remove(message.author)
                        m.clearReactions();
                        collect.stop();
                        } 
                        setTimeout(() =>{collect.stop()},300000) 
                        })
                      
                        collect.on('end',x => {

                        m.edit({embed:{
			color:Math.floor(Math.random() * 16777214) + 1,
			title:`❌ Paginateur fermé`,	
                        description:`${this.client.emojis.find("name", "wrongMark")} Le paginateur a été fermé`, 
                        timestamp:new Date(), 
			footer:{
			icon_url:this.client.user.avatarURL,
			text:`©️ Help | Xenova`
			}
			}})
                        
                        }) 
 
 
 
 
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
				},
                                {
                                name:"Note:", 
                                value:"Tout ce qui se trouve dans des **<>** sont obligatoires et ce qui se trouve dans des **[]** sont optionnels." 
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
