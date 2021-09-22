// Importações
const { Bot_Info, Adm_Priv } = require("../config/config.json");
const { Claras, Escuras } = require("../config/colors.json")
const { Estaticos, Animados } = require("../config/emojis.json")

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

        if (command === undefined) return msg.channel.send(Animados.pepeJamSides + " Salve " + msg.author.toString() + " !\nNão fui capaz de reconhecer o comando `" + msg.content.slice(Bot_Info.Defaut_Prefix.length) + "`, tente-o de **outra** forma!") 

        const perms = command.help.status

        if (perms == "admin") {
            return (Adm_Priv.includes(msg.author.id) ? command.run(bot, msg, args) : msg.channel.send("✋ Infelizmente esse comando é restrito à categoria ***ADMINISTRADOR***").then(() => {
                msg.react("❌")
            }))
        }
        if (perms == "common") {
            return command.run(bot, msg, args);
        }
        if (perms == "off") {
            return msg.channel.send("```❌ Esse comando está temporariamente inativo devido a ocorrência de sua manutenção. É aconselhado aguardar a volta de seu funcionamento ou avisar a staff sobre essa ocasião.```");
        } else {
            return;
        }
    }
}