// Importações
const { Collection } = require("discord.js")
const { Bot_Info } = require("./config/config.json");
const bot = require("./components/client");
const { extname, resolve, basename } = require("path");
const { readdir } = require("fs") 

// Nova instancia de captura de comandos
bot.commands = new Collection();

// Caminhos
let Events_Path = resolve(__dirname, "./events");

// Lendo toda a pasta de eventos
readdir(Events_Path, (err, archives) => {
    if (err) {
        console.log("| ERRO | Falha ao iniciar.")
        console.log("Erro encontrado em " + basename(__filename) + ", descrição do erro : \n" + err);
    }
    archives.forEach(archive => {
        if(extname(archive) === ".js") {
            let archive_name = archive.split(".")[0];
            const module_found = require(Events_Path + `/${archive}`);

            try {
                if(archive_name === "message") {
                    bot.on("message", (msg) => module_found.run(bot, msg));
                }
                if (archive_name === "commands-collector") {
                    bot.on("ready", () => module_found.run(bot));
                }
                else {
                    bot.on(`${archive_name}`, (...prop) => module_found.run(bot, ...prop));
                }
            } catch(e) {
                console.log("| ERRO | Falha ao iniciar.")
                console.log("Provavelmennte um dos arquivos que " + basename(__filename) + " está lendo não possui um móodulo executável! Descrição do erro : " + e)
            }
        } else {
            console.log("| ERRO | Falha ao iniciar.")
            console.log("O arquivo '" + archive + "' não pode ser executado por não pertencer a uma classe operável (Arquivo do Robô).")
        }
    });
})

// Login do BOT
console.log("| GOOD | '" + basename(__filename) + "' obteve sucesso ao iniciar o robô!")
bot.login(Bot_Info.Token);