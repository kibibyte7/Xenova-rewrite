module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (guild) {

    this.client.user.setActivity(`${this.client.config.defaultSttings.prefix}help | ${this.client.guilds.size} servs | ${this.client.users.size} utilisateurs`, {type:"STREAMING"});
    this.client.channels.get("").send(`[+] Le bot a rejoint une nouvelle guilde : **${guild.name} (${guild.id})** avec **${guild.memberCount - 1} membres**`);
  }
};
