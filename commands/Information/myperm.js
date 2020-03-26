const Command = require("../../modules/Command.js");

class MyPerm extends Command {
  constructor(client) {
    super(client, {
      name: "myperm",
      FRdescription: "Affiche ton niveau de permission.",
      category:"Information", 
      usage: "myperm",
      guildOnly: false
    });
  }

  run(message, args, level) {
    const perm = this.client.config.permLevels.find(l => l.level === level).name;
    message.reply(`${this.client.emojis.cache.find("name", "checkMark")} Ton niveau de permission est: ${level} - ${perm}.`);
  }
}

module.exports = MyPerm;
