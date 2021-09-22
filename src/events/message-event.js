// Importações
const { Bot_Info } = require("../config/config.json")

// Execução do comando.
module.exports = {
    run: (bot, msg) => {
        if (msg.author.bot === true) return;
        if (!msg.content.startsWith(Bot_Info.Defaut_Prefix)) return;

        let args = msg.content.split(' ');
        let command = args.shift().slice(Bot_Info.Defaut_Prefix.length).toLowerCase()

        command = bot.commands.get(command) || bot.commands.find(cmd => {
            if(cmd.help.aliases.includes(command) === true) return cmd
        })

        if (command === undefined) return msg.channel.send("👋 Salve " + msg.author.toString() + " !\nNão fui capaz de reconhecer o comando `" + msg.content.slice(Bot_Info.Defaut_Prefix.length) + "`, tente-o de **outra** forma!") 

        msg.channel.send("Comando reconhecido '" + command.help.name + "'.")
    }
}