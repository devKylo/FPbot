const Discord = require("discord.js")
const client = new Discord.Client()
const data = require("./super-secret-data.json")

client.login(data.token)
