exports.run = (client, message, args) => {
  message.channel.send('Ping?')
    .then(msg => {
      const embed = new Discord.MessageEmbed()
      embed.setColor("0011b2")
      embed.setTitle("Pong!")
      embed.addField("Response Time", (msg.createdTimestamp - message.createdTimestamp) +
        "ms")
      embed.addField("Discord API Ping", Math.floor(client.ping) + "ms")
      msg.edit({
        embed
      })
    });
}
exports.info = {
  name: "Ping",
  description: "Ping command",
  aliases: [],
  guildOnly: false,
  category: "Tests",
  hidden: false
}
