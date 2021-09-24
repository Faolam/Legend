// Importações
const DiscordJs = require("discord.js");
const { Bot_Info, Adm_Priv } = require("../config/config.json");
const { Claras, Escuras } = require("../config/colors.json");
const { Estaticos, Animados } = require("../config/emojis.json");

// Execução do comando.
module.exports = {
    run: (bot, msg) => {
        if (msg.author.bot === true) return;
        if (!msg.content.startsWith(Bot_Info.Defaut_Prefix)) return;

        let args = msg.content.split(' ');
        let command = args.shift().slice(Bot_Info.Defaut_Prefix.length).toLowerCase()

        command = bot.commands.get(command) || bot.commands.find(cmd => {
            if (cmd.help.aliases.includes(command) === true) return cmd
        })

        // Embeds
        const a_embed = new DiscordJs.MessageEmbed()
            .setColor(Claras.Vermelho)
            .setDescription("```❌ Comando '" + msg.content.slice(Bot_Info.Defaut_Prefix.length) + "' não Reconhecido ❌```")
        const b_embed = new DiscordJs.MessageEmbed()
            .setColor(Claras.Amarelo)
            .setDescription("```🔒 Comando Restrito a Administradores 🔒```")
        const c_embed = new DiscordJs.MessageEmbed()
            .setColor(Escuras.Laranja)
            .setDescription("```🦺 Comando em Manutenção Temporária 🦺```")
        // Embeds

        if (command === undefined) return msg.channel.send({ embeds: [a_embed] }).then(() => {
            msg.react("🤔")
        })

        const perms = command.help.status

        if (perms == "admin") {
            return (Adm_Priv.includes(msg.author.id) ? command.run(bot, msg, args) : msg.channel.send({ embeds: [b_embed] }).then(() => {
                msg.react("❌")
            }))
        }
        if (perms == "common") {
            return command.run(bot, msg, args);
        }
        if (perms == "off") {
            return msg.channel.send({ embeds: [c_embed] });
        } else {
            return;
        }
    }
}