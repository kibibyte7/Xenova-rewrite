module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(message) {
    if (message.author.bot) return;

    if (
      !message.channel.permissionsFor(message.guild.me).missing("SEND_MESSAGES")
    )
      return;
    
      

    // Paramètres
    const settings = this.client.getSettings(message.guild);
    message.settings = settings;

    if (message.content.indexOf(settings.const prefixMention = new RegExp(`^<@!?${this.client.user.id}>( |)$`);
    if (message.content.match(prefixMention)) {
      return message.channel.send(`${this.client.emojis.find("name", "checkMark")} Le préfixe du serveur est \`${settings.prefix}\``);
    }prefix) !== 0) return;

    const args = message.content
      .slice(settings.prefix.length)
      .trim()
      .split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.guild && !message.member)
      await message.guild.fetchMember(message.author);

    const level = this.client.permlevel(message);

    const cmd =
      this.client.commands.get(command) ||
      this.client.commands.get(this.client.aliases.get(command));
    if (!cmd) return;

    if (level < this.client.levelCache[cmd.conf.permLevel]) {
      if (settings.systemNotice == true) {
        return message.channel
          .send(`${this.client.emojis.find("name", "wrongMark")} Tu n'as pas la permission pour utiliser cette commande.\nTon niveau de permission est **${level} (${this.client.config.permLevels.find(l => l.level === level).name})**\nCette commande requirt le niveau de permission: **${ this.client.levelCache[cmd.conf.permLevel]} (${cmd.conf.permLevel})**`);
      } else {
        return;
      }
    }

    message.author.permLevel = level;

    message.flags = [];
    while (args[0] && args[0][0] === "-") {
      message.flags.push(args.shift().slice(1));
    }
   
    if(cmd.conf.enabled === false){
    if(settings.systemNotice == true) {
        return message.channel
         .send(`${this.client.emojis.find("name", "wrongMark")} Cette commande est désactivée suite à des bugs.`)
       } 
     } 
    // Lancement de la commande
    this.client.logger.log(
      `${message.author.username} (${message.author.id} - ${
        this.client.config.permLevels.find(l => l.level === level).name
      }) lance la commande ${cmd.help.name}`
    );
    cmd.run(message, args, level);
  }
};
