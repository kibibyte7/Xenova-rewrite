class Command {
 constructor(
 	client, {
 	name = "null", 
 	description = "Aucune description définie.",
 	category = "Utilisateur", 
 	usage = "Aucune utilisation définie.",
    cooldown = 3,
 	enabled = true, 
 	guildOnly = true,
    permissions = new Array(), 
 	aliases = new Array(),
 	permLevel = "Utilisateur" 
 	}
 	) {
 	this.client = client;
 	this.conf = {cooldown, enabled, guildOnly, aliases, permissions ,permLevel}; 
 	this.help = {name, description, category, usage};
 	} 
}

module.exports = Command;
