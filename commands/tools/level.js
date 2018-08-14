exports.run = (client, message, args) => {
  require("../../generateCard.js")
  const fetch = require('node-fetch');
  var user;
  if (message.mentions.users.size > 0) {
      user = message.mentions.users.first()
  } else {
    user = message.author
  }
  fetch('https://mee6.xyz/api/plugins/levels/leaderboard/301615194520551426')
    .then(res => res.json())
    .then(json => {
      data = json.players.find(function(info) {
        return info.id === user.id;
      });
      rank = json.players.findIndex(function(info) {
        return info.id === user.id;
      });

      //message.channel.send("``" + "xp: " + data.xp + ", level: " + data.level +  "``")
      generateCard(data.xp, data.level, user.avatarURL({size: 1024, format: "png"}), user.tag, message.guild.members.get(user.id).displayName, data.detailed_xp[0], data.detailed_xp[1], user.id, 5, rank+1).then(id => {
        const attachment = new Discord.MessageAttachment('./userCards/' + id + '.png');
        message.channel.send("", attachment)
      })
    });
}
exports.info = {
  name: "Level",
  description: "Displays your rank",
  aliases: [],
  guildOnly: true,
  category: "Tools",
  hidden: false
}
