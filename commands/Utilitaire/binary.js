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

        const letters = {
            accepted:["s", "n"]
        }

        if(!args[0]) return this.client.getHelp(message, this.help.name, level);
        
        if(!args[0].endsWith(letters.accepted.find(l => l === args[0]))) return this.client.getHelp(message, this.help.name, level);

        if (args[1] === "info") {

            return message.channel.send({
                embed: {
                    color: 0x000444,
                    fields: [
                        {
                            name: `Possibilités`,
                            value: `${args[0] === "s" ? file.signed_binary.length : file.natural_binary.length}`
                        },
                        {
                            name: `Minimum (${args[0] === "s" ? "Binaire signé" : "Binaire naturel"})`,
                            value: `${args[0] === "s" ? file.signed_binary.find(d => d.decimal === "-128").decimal : file.natural_binary.find(d => d.decimal === "0").decimal}`
                        },
                        {
                            name: `Maximum (${args[0] === "s" ? "Binaire signé" : "Binaire naturel"})`,
                            value: `${args[0] === "s" ? file.signed_binary.find(d => d.decimal === "127").decimal + 1 : file.natural_binary.length - 1}`
                        }
                    ],
                    timestamp: new Date(),
                    footer: {
                        text: `Binary info (${args[0] === "s" ? "signé" : "naturel"}) Xenova`,
                        icon_url: message.author.avatarURL()
                    }
                }
            })
        }

        if (isNaN(args[1])) return this.client.getHelp(message, this.help.name, level);

        if(args[0] === "n" && args[1] > 255) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Le binare naturel comporte un nombre des nombres entre 0 et 255 ni plus ni moins.`);
        if(args[0] === "n" && args[1] < 0) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Le binare naturel comporte un nombre des nombres entre 0 et 255 ni plus ni moins.`);
        if(args[0] === "s" && args[1] > 127) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Le binare signé comporte un nombre des nombres entre 127 et -128 ni plus ni moins.`);
        if(args[0] === "s" && args[1] < -128) return message.channel.send(`${this.client.findEmoteByName("wrongMark")} Le binare signé comporte un nombre des nombres entre 127 et -128 ni plus ni moins.`);

        var natural = file.natural_binary.filter(b => b.decimal == args[1]).find(d => d.decimal == args[1]);
        var signed = file.signed_binary.filter(b => b.decimal == args[1]).find(d => d.decimal == args[1]);

        message.channel.send({
            embed: {
                color: 0x010101,
                fields: [{
                    name: "Décimale:",
                    value: args[0] === "n" ? natural.decimal : signed.decimal
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
