const Command =require("../../modules/Command.js") 

class Help extends Command {
constructor(client) {
	super(client, {
	 name:"help", 
	 description:"Affiche la page d'aide ou l'aide d'une commande.",
	 usage:"help [commande]", 
	 aliases:["h"] 
		}) 
	}
	
	run(message, args, level) {
	 	
	const settings = message.settings;
		 
			if(!args[0]){
				
		 const myCommands = message.guild ? this.client.commands.filter(cmd => this.client.levelCache[cmd.conf.permLevel] <= level): this.client.commands.filter(cmd => this.client.levelCache[cmd.conf.permLevel] <= level && cmd.conf.guildOnly !== true) 
		 	
		 	const commandsNames = myCommands.keyArray()
		 	const longest = commandsNames.reduce((long, str) => Math.max(long, str.length), 0);
		 		let currentCat = "";
		 		let output = ``;
		 		
		 		const sorted = myCommands.array().sort((p, c) => p.help.category > c.help.category ? 1: p.help.category > c.help.category && p.help.category === c.help.category ? 1 : -1);
			  
			  sorted.forEach(c => {
			  const cat = c.help.category
			  if(currentCat != cat) {
			   output += `${cat}`
			   currentCat = cat;
			  } 
			  output += `${settings.prefix}${c.help.name}${" ".repeat(longest - c.help.name.length)} : ${c.help.description}\n`
		  	})		  			  	
			
			message.channel.send({embed:{
			color:Math.floor(Math.random() * 16777214) + 1,
			title:`Liste des commandes de ${this.client.user.username} [${this.client.commands.size}]`,
		 		
                        description:output, 
			timestamp:new Date(), 
			footer:{
			icon_url:this.client.user.avatarURL,
			text:`Utilise: [${this.client.config.defaultSettings.prefix}help <Nom de la commande> pour plus de détails]`
			}
			}})
				
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
