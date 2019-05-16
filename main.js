const { Client, Collection } = require("discord.js");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);
const Enmap = require("enmap")
const klaw = require("klaw")
const path = require("path")

class Xenova extends Client {
 constructor(option){ 
 super(option) 
 
 this.config = require("./modules/Config.js")
 
 this.commands = new Collection() 
 this.aliases = new Collection() 
 
 this.setting = new Enmap({
 	name:"settings", 
 	cloneLevel:"deep", 
 	fetchAll:false, 
 	autoFetch:true
 	}) 
 	
 this.logger = require("./modules/Logger")
 this.wait = require("util").promisify(setTimeout) 
 }
 
 //Permissions 
 permLevel(message) {
 	let permlvl = 0;
 	
 	const permOrder = this.config.permLevels
 	.slice(0)
 	.sort((p, c) => p.level < c.level ? 1 : -1)
 	
 	while(permOrder.length){
 		const currentLevel = permOrder.shift()
 		if(message.guild && currentLevel.guildOnly) continue;
 		if(currentLevel.check(message)){
 			 permlvl = currentLevel.level
 			 break;
 			}
 		} 
 		return permlvl;
 	} 
 	
 	loadCommands(commandPath, commandName) {
   	try{
 	  const props = new (require(`${commandPath}${path.sep}${commandName}`))(
 	  	this
 	  	) 
 	  	this.logger.log(`Chargement de la commande: ${commandName}`, "log");
 	  	props.conf.location = commandPath;
 	  	if(props.init) {
 	  	   props.init(this)
 	  	} 
 	  	this.commands.set(props.help.name)
 	  	props.aliases.forEach(alias => {
 	  	this.aliases.set(alias, props.help.name)
 	  }) 
 	  return false;
 	  } catch (e) {
 			return `Impossible de charger la commande ${commandName} : ${e}`;
 			} 
 	} 
 	
 	getSettings(guild){
 	const defaults = this.config.defaultSettings || {} 
 	const guildsettings = this.settings.get(guild.id) || {} 
 	const returnObject = {} 
 	Object.keys(defaults).forEach(key => {
 		returnObject[key] = guildData[key] ? guildData[key] : defaults[key] 
 		}) 
 		return returnObject;
 	} 
} 

const client = new Xenova()
console.log(client.config.permLevels.map(p => `${p.level} : ${p.name}`))

//Fonction d'initialisation

const init = async () => {
//recup des commandes
klaw("./commands").on('data', item => {
	const cmdFile = path.parse(item.path);
	if(!cmdFile.ext || cmdFile.ext !== ".js") return;
	const response = client.loadCommands(cmdFile.dir, `${cmdFile.name}${cmdFile.ext}`)
	if(response) client.logger.error(response)
	}) 
	
	//recup des événements 
	const evtFiles = await readdir("./events")
	client.logger.log(`Chargement de ${evtFiles.length} événements.`, "log") 
	evtFiles.forEach(file => {
		const evtName = file.split(".")[0] 
		client.logger.log(`Chargement de l'événement: ${evtName}`,"log")
		const event = new (require(`./events/${file}`))(client) 
		client.on(evtName, (...args) => event.run(...args))
		delete require.cache[require.resolve(`./events/${file}`)] 
		}) 
		
		client.levelCache = {} 
		
		for(let i = 0; i < client.config.permLevels.length; i++) {
			const thisLevel = client.config.permLevels[i]
			client.levelCache[thisLevel.name] = thisLevel.level;
		} 
			
		client.login(process.env.token) 
} 

init();
