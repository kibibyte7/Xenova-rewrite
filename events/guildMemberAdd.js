module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (member) {

    this.client.user.setActivity(`${this.client.config.defaultSttings.prefix}help | ${this.client.guilds.size} servs | ${this.client.users.size} utilisateurs`, {type:"STREAMING"});
  }
};
