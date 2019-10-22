class Command {
 constructor(
 	client, {
 	name = null, 
 	FRdescription = "Aucune description définie.",
        ENdescription: "Description is not defined.", 
 	category = "Utilisateur", 
 	FRusage = "Aucune utilisation définie.",
        ENusage:"Usage is not defined.",
        cooldown:3,
 	enabled = true, 
 	guildOnly = true, 
 	aliases = new Array(), 
 	permLevel = "Utilisateur" 
 	}
 	) {
 	this.client = client;
 	this.conf = {enabled, guildOnly, aliases, permLevel}; 
 	this.help = {name, description, category, usage};
 	} 
}

module.exports = Command;
