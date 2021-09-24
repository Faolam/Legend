// Importações
const { MessageEmbed } = require("discord.js")
const { Claras, Escuras } = require("../../config/colors.json") 
const { Estaticos, Animados } = require("../../config/emojis.json")

// Comando
module.exports = {
    run: (bot, msg, args) => {
        const a_embed = new MessageEmbed()
            .setAuthor(bot.user.username + " Admin Informations", bot.user.displayAvatarURL({dynamic: true, format: "png", size: 1024}))
            .setColor(Claras.Verde)
            .setDescription("**--> Status : ** " + (bot.user.presence.status == "online" ? bot.user.presence.status.toUpperCase() + " " + Animados.online : bot.user.presence.status.toUpperCase() + " " + Animados.offline)+ "\n")
            
        // console.log(bot.user.presence)
        msg.channel.send({ embeds: [a_embed] })
    },
    help: {
        name: "status",
        aliases: ["stats"],
        status: "admin",
        description: "Comando que mostra os Status do robô."
    }
}