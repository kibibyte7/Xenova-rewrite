const Command = require("../../modules/Command.js");

class Reload extends Command {
  constructor (client) {
    super(client, {
      name: "reload",
      description: "Recharge une command qui a été modifié.",
      category: "System",
      usage: "reload <commande>",
      permLevel: "XenoOwner"
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    if (!args || args.size < 1) return message.reply("Tu dois spécifier la commande à recharger.");
    
    const commands = this.client.commands.get(args[0]) || this.client.commands.get(this.client.aliases.get(args[0]));
    if (!commands) return message.reply(`La commande \`${args[0]}\` n'existe pas, essaie l'alias ou de taper correctement le nom de la commande.`);

    let response = await this.client.unloadCommand(commands.conf.location, commands.help.name);
    if (response) return message.reply(`Erreur de déchargement: ${response}`);

    response = this.client.loadCommand(commands.conf.location, commands.help.name);
    if (response) return message.reply(`Erreur de chargement: ${response}`);

    message.reply(`La commande \`${commands.help.name}\` a été rechargé.`);
  }
}
module.exports = Reload;
