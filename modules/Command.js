class Command {
 constructor(
 	client, {
 	name = "Aucun nom défini.", 
 	description = "Aucune description définie.", 
 	category = "Aucune catégorie définie.", 
 	usage = "Aucune utilisation définie.", 
 	enable = true, 
 	guildOnly = false, 
 	aliases = Array(), 
 	permLevel = "Utilisateur" 
 	}
 	) {
 	this.client = client;
 	this.conf = {enable, guildOnly, aliases, permLevel} 
 	this.help = {name, description, category, usage} 
 	} 
}

module.exports = Command
