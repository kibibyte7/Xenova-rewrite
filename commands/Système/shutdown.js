const Command = require("../../modules/Command.js");

class Shutdown extends Command {
  constructor (client) {
    super(client, {
      name: "shutdown",
      description: "S'il est sous pm2, le bot redémarre.",
      category: "Système",
      usage: "shutdown",
      permLevel: "XenoOwner",
      aliases: []
    });
  }

  async run (message, args, level) { // eslint-disable-line no-unused-vars
    try {
      await message.reply("Extinction du bot.");
      this.client.commands.forEach(async cmd => {
        await this.client.unloadCommand(cmd);
      });
      process.exit(1);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Shutdown;
