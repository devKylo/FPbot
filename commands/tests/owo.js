exports.run = (client, message, args) => {
  message.channel.send("o-owo? hewwo <@" + message.author.id + ">")
}
exports.info = {
  name: "OwO",
  description: "What's this?",
  aliases: [],
  guildOnly: false,
  category: "Tests",
  hidden: false
}
