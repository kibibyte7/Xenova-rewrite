const Command = require("../modules/Command.js");

class MyPerm extends Command {
  constructor(client) {
    super(client, {
      name: "myperm",
      description: "Affiche votre niveau de permission.",
      usage: "myperm",
      guildOnly: false
    });
  }

  run(message, args, level) {
    const perm = this.client.config.permLevels.find(l => l.level === level).name;
    message.reply(`${this.client.emojis.find("name", "checkMark")} Ton niveau de permission est: ${level} - ${perm}.`);
  }
}

module.exports = MyPerm;
