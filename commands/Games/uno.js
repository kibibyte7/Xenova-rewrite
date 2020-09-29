const { Collection } = require("discord.js");
const { Game } = require("uno-engine");

const Command = require("../../modules/Command");

class Uno extends Command {
    constructor(client) {
        super(client, {
            name: "uno",
            description: "on joue au uno",
            usage: "uno start/stop",
            category: "Game"
        })
    }

    run(message, args, level) {

        if (args[0] === "start") {

            var players = [{
                id: message.author.id,
                user: message.author.username,
                dm: message.author
            }];

            var host = [{
                id: message.author.id,
                user: message.author.username,
                dm: message.author
            }];

            const maxplayers = args[1] > 10 || args[1] < 2 || !args[1] ? 2 : args[1];

            var filter = m => m.content === "+join" && message.author || m.content === "+start" && host[0].dm;

            message.channel.send(`En attente de joueurs... ${players.length}/${maxplayers}.  Faites : *join pour rejoindre la partie.`).then(m => {

                var collector = m.channel.createMessageCollector(filter);

                collector.on("collect", msg => {
                    if(msg.content === "+join" && message.content !== "+start"){
                    //if (players.find(p => p.id === msg.author.id)) return msg.channel.send(`${this.client.findEmoteByName("wrongMark")} ${msg.author} Tu es déja dans la partie.`)

                    if (players.length == maxplayers) return msg.channel.send(`${this.client.findEmoteByName("wrongMark")} ${msg.author} La partie est pleine`)

                    players.push({ id: msg.author.id })

                    m.edit(`En attente de joueurs... ${players.length}/${maxplayers}.  Faites : *join pour rejoindre la partie.`);

                    msg.channel.send(`**${msg.author.username}** a rejoint la partie.`)

                    }
                    
                    if (msg.content === "+start" && message.content === "+join") {

                        const customRules = ["CumulativeDrawTwo"];

                        const game = new Game(players, customRules);

                        m.edit("Commencement du jeu...");

                        players[0].dm.send(game.currentPlayer.hand);

                        message.channel.send("Nous commençons par un: " + game.discardedCard);

                        message.channel.send(players[0].user + " Tu commances !");

                    }
                });
            });
        }
    }
}

module.exports = Uno;
