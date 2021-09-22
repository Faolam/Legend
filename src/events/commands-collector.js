// Importação de Módulos
const { resolve, extname, basename } = require("path")
const { readdir } = require("fs")

// Caminho da pasta de comandos
let commands_path = resolve(__dirname, "../commands")

// Execução do arquivo
module.exports = {
    run: (bot) => {
        readdir(commands_path, (err, folders) => {
            if (err) {
                console.log("| ERRO | Falha ao iniciar.")
                console.log("Erro encontrado em " + basename(__filename) + ", descrição do erro : \n" + err);
            }

            try {
                folders.forEach(folder => {
                    readdir(commands_path + "/" + folder, (error, archives) => {
                        if (error) {
                            console.log("| ERRO | Falha ao iniciar.")
                            console.log("Erro encontrado em " + basename(__filename) + ", leitura da pasta " + folder + "descrição do erro : \n" + err);
                        }

                        archives.forEach(archive => {
                            if (extname(archive) === ".js") {
                                const {
                                    run,
                                    help
                                } = require(commands_path + "/" + folder + "/" + archive);

                                if (!run) {
                                    console.log("| ERRO | '" + archive + "' não possui a função de execução 'run()'");
                                } else if (!help.name) {
                                    console.log("| ERRO | '" + archive + "' não possui o essencial de execução 'help.name'");
                                } else if (!help.aliases) {
                                    console.log("| ERRO | '" + archive + "' não possui o essencial de execução 'help.aliases'");
                                } else if (!help.status) {
                                    console.log("| ERRO | '" + archive + "' não possui o essencial de execução 'help.status'");
                                } else if (!help.description) {
                                    console.log("| ERRO | '" + archive + "' não possui o essencial de execução 'help.description'");
                                }

                                bot.commands.set(help.name, { run, help })
                                console.log("| GOOD | '" + basename(__filename) + "' fez a leitura de todos os comandos da pasta '" + folder + "'!")
                            } else {
                                console.log("| ERRO | Falha ao iniciar.");
                                console.log("O arquivo '" + archive + "' não pode ser executado por não pertencer a uma classe operável (Arquivo do Robô).");
                            }
                        })

                    })
                })
            } catch(e) {
                console.log("| ERRO | Falha ao iniciar.")
                console.log("Provavelmennte um dos arquivos que " + basename(__filename) + " está lendo não possui os arquivos precisos! Descrição do erro : " + e)
            }
        })
    }
}