module.exports = class {
constructor(client){
this.client = client
} 

async run() {
	await this.client.wait(1000)
	
	this.client.appInfo = this.client.fetchApplication();
	setInterval(async () => {
	this.client.fetchApplication()
	}, 60000)
	
	this.client.user.setActivity(`${this.client.config.prefix}help, {type:"STREAMING"})
	
	this.client.logger.log(`${this.client.user.tag} lancé avec succès.`, "ready") 
	
	} 
} 
