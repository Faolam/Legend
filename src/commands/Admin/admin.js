module.exports = {
    run: (bot, msg, args) => {
        msg.channel.send("Esse é o comando admin")
    },
    help: {
        name: "admin",
        aliases: ["a"],
        status: "admin",
        description: "teste de comando administrativo"
    }
}