const weather = require("weather-js");
const Command = require("../../modules/Command");

class Weather extends Command {
    constructor(client) {
        super(client, {
            name: "weather",
            description: "Affiche le temps qu'il fait dans une ville donnée",
            category: "Utility",
            usage: "weather"
        })
    }

    run(message, args, level) {

        if (!args[0]) return this.client.getHelp(message, this.help.name, level);

        weather.find({ search: `${args.join(" ")}`, degreeType: 'C' }, function (err, result) {

            if (err) throw err;
            console.log(result)
            message.channel.send({
                embed: {
                    color: 0x000000,
                    author: {
                        name: result[0].location.name
                    },
                    fields: [{
                        name: "Fuseau horaire",
                        value: result[0].location.timezone
                    },
                    {
                        name: "Type de degrés",
                        value: result[0].location.degreetype
                    },
                    {
                        name: "Temps:",
                        value: result[0].current.skytext === "Sunny" ? "Ensoleillé" : result[0].current.skytext === "Rain" ? "Pluvieux" : result[0].current.skytext === "Mostly Cloudy" ? "Nuageux" : result[0].current.skytext === "Rain Showers" ? "Averses de pluie" : result[0].current.skytext === "Partly Sunny" ? "Partiellement ensoleillé" : result[0].current.skytext === "Mostly Sunny" ? "Principalement ensoleillé" : result[0].current.skytext === "Clear" ? "Dégagé" : result[0].current.skytext
                    },
                    {
                        name: "Humidity",
                        value: result[0].current.humidity
                    },
                    {
                        name: "Vitesse du vent",
                        value: result[0].current.windspeed
                    }],
                    timestamp: new Date(),
                    footer: {
                        text: "©️ Weather | Xenova",
                        icon_url: message.author.avatarURL
                    }
                }
            })

        })
    }
}

module.exports = Weather
