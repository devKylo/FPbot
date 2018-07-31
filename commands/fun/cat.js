const fetch = require('node-fetch');
exports.run = (client, message, args) => {
  const embed = new Discord.MessageEmbed()
  fetch('http://aws.random.cat/meow')
    .then(res => res.json())
    .then(json => {
      embed.setImage(json.file)
      embed.setFooter("Meow UwU <3", client.user.avatarURL({"format": "png", "size": 512}))
      message.channel.send({embed})
    });
}
exports.info = {
  name: "Dog",
  description: "Meow",
  aliases: [],
  guildOnly: false,
  category: "Fun",
  hidden: false
}
