const { Client, Intents } = require("discord.js");
const bot = new Client({ intents: [Intents.FLAGS.GUILDS] })

module.exports = bot