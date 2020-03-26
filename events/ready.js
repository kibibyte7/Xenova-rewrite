module.exports = class {
constructor(client){
this.client = client
} 

async run() {

	await this.client.wait(1000);
	this.client.appInfo = this.client.fetchApplication();
	setInterval(async () => {
	this.client.fetchApplication()
	}, 60000)
	
        
        try{
	
	let c = this.client.channels.cache.get("586596535165386759");
        
        c.send({embed:{
		color:0x010101, 
		author:{
                name:"Lancement réussi"
                },
		description:"Bot démarré avec succès !",
		timestamp:new Date(),
		footer:{
                icon_url:this.client.user.avatarURL,text:"lancé"
		} 
                }}) 
	} catch(e) {

	console.log(e.message)

	} 

        require("../modules/Dashboard.js")(this.client);

	this.client.user.setActivity(`${this.client.config.defaultSettings.prefix}help | ${this.client.guilds.cache.size} servs | ${this.client.users.cache.size} utilisateurs`, {type:"WATCHING"})
	
	this.client.logger.log(`${this.client.user.tag} lancé avec succès.`, "ready") 
	

} 
} 
