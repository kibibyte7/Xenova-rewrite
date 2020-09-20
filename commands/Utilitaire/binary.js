const Command = require("../../modules/Command.js");
const file = require("../../binaries.json");

class Binary extends Command {
    constructor(client) {
        super(client, {
            name: "binary",
            description: "envoie les infos du nombre en binare, en décimale et en hexadécimal.",
            usage: "binary s/n <nombre>",
            category: "Utility",
            aliases: []
        })
    }

    run(message, args, level) {

        if (!args[0] || isNaN(args[1])) {

            this.client.getHelp(message, this.help.name, level);

            return;

        }

        var natural = file.natural_binary.filter(b => b.decimal == args[1]).find(d => d.decimal == args[1]);
        var signed = file.signed_binary.filter(b => b.decimal == args[1]).find(d => d.decimal == args[1]);

        console.log(natural);

        message.channel.send({
            embed: {
                color: 0x010101,
                fields: [{
                    name: "Décimale:",
                    value: args[0] === "n" ?  natural.decimal : signed.decimal
                },
                {
                    name: "Binaire:",
                    value: args[0] === "n" ? natural.binary : signed.binary
                },
                {
                    name: "Hexadecimal:",
                    value: args[0] === "n" ? natural.hexa : signed.hexa
                }],
                timestamp: new Date(),
                footer: {
                    text: "Binary | Xenova",
                    icon_url: message.author.avatarURL()
                }
            }
        })

    }
}

module.exports = Binary;