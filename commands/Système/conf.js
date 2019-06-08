const { inspect } = require("util");

const Command = require("../../modules/Command.js");

class Conf extends Command {
  constructor (client) {
    super(client, {
      name: "conf",
      description: "Modifier les configurations de toutes les guildes, ça se passe uniquement dans le bot.",
      category: "Système",
      usage: "conf <view/get/edit> <clé> <valeur>",
      guildOnly: true,
      aliases: ["key"],
      permLevel: "XenoOwner"
    });
  }

  async run (message, [action, key, ...value], level) {
  
  const defaults = this.client.settings.get("default");

  if (action === "add") {
      if (!key) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie une clé à ajouter.`);
      if (defaults[key]) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Cette clé existe déjà dans les paramètres serveurs.`);
      if (value.length < 1) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie une valeur.`);

     
      defaults[key] = value.join(" ");
  
      
      this.client.settings.set("default", defaults);
      message.channel.send(`${this.client.emojis.find("name", "checkMark")} **${key}** ajouté avec succès ayant la valeur **${value.join(" ")}**`);
    } else
  
   
    if (action === "edit") {
      if (!key) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} une clé à éditer.`);
      if (!defaults[key]) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Cette clé n'existe pas. `);
      if (value.length < 1) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie une nouvelle valeur.`);

      defaults[key] = value.join(" ");

      this.client.settings.set("default", defaults);
      message.channel.send(`${this.client.emojis.find("name", "checkMark")} **${key}** édité en ${value.join(" ")} avec succès.`);
    } else
  
      if (action === "del") {
      if (!key) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie une clé à effacer.`);
      if (!defaults[key]) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Cette clé n'existe pas.`);
    
      
      const response = await this.client.awaitReply(message, `Es tu sûr de vouloir effacer **${key}** dans tout les paramètres serveurs ? Les changements ne sont pas récupérables.`);

      
      if (["y", "yes", "oui", "o"].includes(response)) {

     
        delete defaults[key];
        this.client.settings.set("default", defaults);
      
        for (const [guildid, conf] of this.client.settings.filter((setting, id) => setting[key] && id !== "default")) {
          delete conf[key];
          this.client.settings.set(guildid, conf);
        }
      
        message.channel.send(`${this.client.emojis.find("name", "checkMark")} **${key}** a été effacé avec succès.`);
      } else
      
      if (["n","non","cancel"].includes(response)) {
        message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Action annulée.`);
      }
    } else
  
    
    if (action === "get") {
      if (!key) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Spécifie une clé à voir.`);
      if (!defaults[key]) return message.channel.send(`${this.client.emojis.find("name", "wrongMark")} Cette clé n'existe pas.`);
      message.channel.send(`${this.client.emojis.find("name", "checkMark")} Les valeurs de ${key} est ${defaults[key]}`);

    } else {
      const array = [];
      Object.entries(this.client.settings.get("default")).forEach(([key, value]) => {
        array.push(`${key}${" ".repeat(20 - key.length)}::  ${value}`); 
      });
      await message.channel.send(`= Bot paramètres par défaut =
${array.join("\n")}`, {code: "asciidoc"});    }
  }
}

module.exports = Conf;
