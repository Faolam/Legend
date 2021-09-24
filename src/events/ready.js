// Impostação de Módulos
const { Bot_Info } = require("../config/config.json")
const { activity, status } = require("../components/activity-stats")
const { basename } = require("path")

// Execução do comando
module.exports = {
    run: (bot) => {
        // Atividade / Presença do Robo
        let Status = "online" //dnd //idle //invisible //online
        let type = "COMPETING" // PLAYING // STREAMING // LISTENING // WATCHING // CUSTOM_STATUS // COMPETING
        let perfilActivity = [
            `🦺 Neste momento estou em manutenção!`,
            `💡 Meu prefixo original é "${Bot_Info.Defaut_Prefix}"`,
        ];
        let Interval = 10000;

        // Console Informations
        console.log("| GOOD | '" + basename(__filename) + "' foi iniciado com sucesso!")

        // Instancia de Atividade e status do robo!
        activity(bot, perfilActivity, Interval, type)
        status(bot, Status)
    }
}