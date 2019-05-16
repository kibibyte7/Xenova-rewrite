module.exports = class {
constructor(client) {
this.client = client;
} 

async run(message) {
	if(message.author.bot) return;
	if(message.channel.type === "dm") return;
	
	if(!message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")){
		try{
			message.author.send(`Je n'ai pas la permission d'envoyer des messages dans ${message.channel.name}`)
       }catch(e) {
  	return;
  	}  
  } 

  const settings = this.client.getSettings(message.guild);
  this.settings = settings;
  
  if(message.content.indexOf(settings.prefix) !== 0) return;
  
  const args = message.content.slice(settings.prefix.length).trim().split(/ + /g) 
  const command = args.shift().toLowerCase();
  
  if(message.guild && !message.member) await message.guild.fetchMember(message.author)
  
  const level = this.client.permLevel(message)
  
  const cmd = this.client.commands.get(command) || this.client.commands.get(this.client.aliases.get(command))
 
  if(!cmd) return;
  
  if(level < this.client.levelCache[cmd.conf.permLevel]){
  	
  	if(settings.systemNotice === "true") {
  		
  		return message.channel.send(`${this.client.emojis.find("name","wrongMark")} Tu n'as pas la permission d'utiliser la commande\nTon niveau de permissions: **${level} ${this.client.permLevels.find(l => l.level === level).name}**\nLe niveau de permissions requis: **${this.client.levelCache[cmd.conf.permLevel]} ${cmd.conf.permLevel}**`) 
  		
  		} else {
  			
  			return;
  			
  		} 
  	
  	}
   
   message.author.permLevel = level;
   
   message.flags = [] 
   
   while(args[0] && args[0][0] === "-"){
   	message.flags.push(args.shift().slice(1))
   	}
   	
   	this.client.logger.log(`${this.client.config.permLevels.find(l => l.level).name} ${message.author.username} a utilisé la commande ${cmd.help.name}`, "log")
   cmd.run(message, args, level) 
 } 
} 
