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
      
        this.client.channels.get("586596535165386759").send({embed:{
		color:0x010101, 
		author:{
                name:"Shutdown"
                },
		description:"Le bot va redémarrer dans quelques instants suite à des mises à jours.",
		timestamp:new Date(),
		footer:{
                icon_url:this.client.user.avatarURL,text:"© Shutdown | Xenova"
		} 
                }}) 

      await message.reply("Extinction du bot.");
      this.client.commands.forEach(async cmd => {
        await this.client.unloadCommand(cmd);
      });
      process.exit(143);
    } catch (e) {
      console.log(e);
    }
  }
}

module.exports = Shutdown;
