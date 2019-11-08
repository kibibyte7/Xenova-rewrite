const Command = require("../../modules/Command.js") 

class Help extends Command {
constructor(client) {
super(client, {
name:"help", 
FRdescription:"Affiche la page d'aide ou l'aide d'une commande.",
category:"Information", 
usage:"help [commande]", 
aliases:["h"] 
})
}
	
   run(message, args, level, con) {

	 	const settings = message.settings

	 	con.query(`SELECT * FROM settings WHERE guild_id = ${message.guild.id}`, (err, rows) => {
	 	
	 	const language = rows[0].lang
	 	
	 	const help_interface = [
	 	this.client.commands.filter(c => c.help.category === "Système").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${language == "en" ? cmd.help.ENdescription : cmd.help.FRdescription}`).join("\n"), 
		this.client.commands.filter(c => c.help.category === "Admin").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${language == "en" ? cmd.help.ENdescription : cmd.help.FRdescription}`).join("\n"), 
		this.client.commands.filter(c => c.help.category === "Modérateur").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${language == "en" ? cmd.help.ENdescription : cmd.help.FRdescription}`).join("\n"), 
		this.client.commands.filter(c => c.help.category === "Information").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${language == "en" ? cmd.help.ENdescription : cmd.help.FRdescription}`).join("\n"), 
		this.client.commands.filter(c => c.help.category === "Musique").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${language == "en" ? cmd.help.ENdescription : cmd.help.FRdescription}`).join("\n"), 
		this.client.commands.filter(c => c.help.category === "Game").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${language == "en" ? cmd.help.ENdescription : cmd.help.FRdescription}`).join("\n"), 
		this.client.commands.filter(c => c.help.category === "Utilitaire").map(cmd => `\`\`${this.client.config.defaultSettings.prefix}${cmd.help.name}\`\` : ${language == "en" ? cmd.help.ENdescription : cmd.help.FRdescription}`).join("\n"), 
			
	 	] 
	  
	  let page = 1;
	  
	  const maxpage = help_interface.length;
	  
	  const right = this.client.emojis.find(e => e.name === "droite") 

   const left =this.client.emojis.find(e => e.name === "gauche") 

   const wrong = this.client.emojis.find(e => e.name === "wrongMark") 

	  if(!args[0]){
		 
			message.channel.send({embed:{
			color:Math.floor(Math.random() * 16777214) + 1,
			title:`Menu de ${this.client.user.username}`,	
			description:`Bienvenue dans l'interface d'aide de **${this.client.user.username}**\n\nDans le bot il y a un total de **${this.client.commands.size} commandes**.\n\nNOTE: Un rôle \`XenoAdminPerm\` et \`XenoModPerm\` sont nécessaires pour l'utilisation des commandes admins et modérateurs\n\nUtilise aussi \`${this.client.config.defaultSettings.prefix}help <Nom de la commande ou Nom d'une catégorie>\` pour plus de détails et te simplifier la vie.**`, 
			timestamp:new Date(), 
			footer:{
			icon_url:this.client.user.avatarURL,
			text:`©️ Help | Page: ${page}/${maxpage} | Xenova`
			}
			}}).then(m => {
			
			m.react(left)
			
			setTimeout(() =>{m.react(right)},1000)
			
			setTimeout(() =>{m.react(wrong)},2000)

   const filtre = (reaction, user) => reaction.emoji.name == left.name && user.id == message.author.id || reaction.emoji.name == right.name && user.id == message.author.id || reaction.emoji.name == wrong.name && user.id == message.author.id; 
        
   const collect = m.createReactionCollector(filtre);
        
			
			collect.on('collect' , r => {
   
   if(r.emoji.name == left.name){

   r.remove(message.author) 

   if(page == 1) return;

   page--;
   
   m.edit({embed:{
   color:Math.floor(Math.random() * 16777214) + 1,
   title:`Interface d'aide [${this.client.commands.size-1}]`, 
   description:help_interface[page],
   timestamp:new Date(), 
   footer:{
   icon_url:this.client.user.avatarURL,
   text:`Help | Page: ${page}/${maxpage} | Xenova`
   } 
   }})
   
   }
   
   if(r.emoji.name == right.name){

   r.remove(message.author) 

   if(page == maxpage) return;

   page++;
   
   m.edit({embed:{
   color:Math.floor(Math.random() * 16777214) + 1,
   title:`Interface d'aide [${this.client.commands.size-1}]`, 
   description:help_interface[page],
   timestamp:new Date(), 
   footer:{
   icon_url:this.client.user.avatarURL,
   text:`Help | Page: ${page}/${maxpage} | Xenova`
   } 
   }})
   
   }
   
   if(r.emoji.name == wrong.name){
   
   m.edit({embed:{
   color:Math.floor(Math.random() * 16777214) + 1, 
   description:`${wrong} Le paginateur est fermé, suppression du message dans 3 secondes.`,
   timestamp:new Date(), 
   footer:{
   icon_url:this.client.user.avatarURL,
   text:`©️ Help | Page: ${page}/${maxpage} | Xenova`
   }
   }}).then(msg => {
   message.delete(4000)
   m.delete(3000)
   }) 

   m.clearReactions();

   collect.stop();
   
   } 
   
   })
   
   })
   
   } else {
   
   let command = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]));
   
   if(this.client.commands.has(command.help.name)){
   	
				if(level < this.client.levelCache[command.conf.permLevel]) return;
				message.channel.send({embed:{
				color:Math.floor(Math.random() * 16777214) + 1, 
				author:{
				name:`Help de la commande: ${command.help.name}`,
				icon_url:message.author.avatarUrl
				}, 
				fields:[{
				name:"Description:", 
				value:command.help.FRdescription
				},
				{
				name:"Utilisation:",
				value:settings.prefix+command.help.usage
				}, 
				{
				name:"Aliases:", 
				value:command.conf.aliases.length == 0 ? "Pas d'ailias" : command.conf.aliases.join(", ") 
				},
				{
				name:"Note:",
				value:"Tout ce qui se trouve dans des **<>** sont obligatoires et ce qui se trouve dans des **[]** sont optionnels."
				}], 
				timestamp:new Date(), 
				footer:{
				icon_url:this.client.user.avatarUrl,
				text:`© Help ${command.help.name}` 
				}
				}})
				
   }
 } 	
}) 

} 
}

module.exports = Help;
