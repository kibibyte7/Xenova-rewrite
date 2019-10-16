module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (guild) {
    

    con.query("SELECT * FROM settings", (err, rows) => {

    con.query(`DELETE FROM settings WHERE guild_id = ${guild.id}`)

    }) 

    this.client.user.setActivity(`${this.client.config.defaultSettings.prefix}help | ${this.client.guilds.size} servs | ${this.client.users.size} utilisateurs`, {type:"STREAMING"});
    this.client.channels.get("586596533701443594").send(`[-] Le bot a quitté une guilde : **${guild.name} (${guild.id})** avec **${guild.memberCount - 1} membres**`);
  }
};
