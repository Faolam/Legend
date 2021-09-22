module.exports = {
    run: (bot, msg, args) => {
        msg.channel.send("esse é o comando common")
    },
    help: {
        name: "common",
        aliases: ["c"],
        status: "common",
        description: "teste de comando comum a todos do server"
    }
}