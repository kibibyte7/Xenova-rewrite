module.exports = class {
  constructor (client) {
    this.client = client;
  }

  async run (guild) {
    
    con.query("SELECT * FROM settings", (err, rows) => {

    con.query(`INSERT INTO settings (welcome_id, leave_id, ban_id, welcome_msg, leave_msg, ban_msg, user_autorole, bot_autorole, lang, guild_id) VALUES ('Non défini', 'Non défini', 'Non défini', 'Bienvenue sur **{server}**, {user} amuses toi bien ! 🤗', 'Mince, **{user}** nous a quitté... Bonne continuation à toi **{user}**...', "Et paf ! **{user}** s'est pris un coup de banhammer ! Tu n'as pas été sage l'ami." , 'Non défini', 'Non défini', 'en', ${guild.id})`)

    }) 
    
    guild.owner.user.send(`Merci de m'avoir ajouté à ton serveur, voici quelques notes avant de m'utiliser :\nLes rôles pour avoir des permissions qur le bot est \`XenoModPerm\`(pour les modos) et \`XenoAdminPerm\` (pour les admins)\n Je suis un bot créé par **${this.client.users.cache.find(u => u.id === "524996881198219276").tag}**`)

    this.client.user.setActivity(`${this.client.config.defaultSettings.prefix}help | ${this.client.guilds.cache.size} servs | ${this.client.users.cache.size} utilisateurs`, {type:"WATCHING"});
    this.client.channels.get("586596533701443594").send(`[+] Le bot a rejoint une nouvelle guilde : **${guild.name} (${guild.id})** avec **${guild.memberCount - 1} membres**`);
  }
};
