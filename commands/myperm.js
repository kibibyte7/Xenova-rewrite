const Command = require("../modules/Command.js");

class MyPerm extends Command {
  constructor(client) {
    super(client, {
      name: "myperm",
      description: "Affiche votre niveau de permission.",
      usage: "myperm",
      guildOnly: true
    });
  }

  run(message, args, level) {
    const perm = this.client.config.permLevels.find(l => l.level === level)
      .name;
    message.reply(`ton niveau de permission est: ${level} - ${perm}.`);
  }
}

module.exports = MyPerm;
