const fetch = require('node-fetch');
exports.run = (client, message, args) => {
  const embed = new Discord.MessageEmbed()
  fetch('https://random.dog/woof.json')
    .then(res => res.json())
    .then(json => {
      embed.setImage(json.url)
      embed.setFooter("B-bark! OwO", client.user.avatarURL({"format": "png", "size": 512}))
      message.channel.send({embed})
    });
}
exports.info = {
  name: "Dog",
  description: "Bark owo",
  aliases: [],
  guildOnly: false,
  category: "Fun",
  hidden: false
}
