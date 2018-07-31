exports.run = (client, message) => {
  if (!message.content.startsWith("FP.")) return;
  if (message.author.bot) return;

  //commands.keyArray()

  var args = message.content.slice(3).trim().split(/ +/g);
  var command = args.shift().toLowerCase();

  // Actually run functions
  let found = false;
  if (client.commands.has(command)) {
    let funct = client.commands.get(command);
    if (funct.info.guildOnly === true && message.channel.type === "dm") {
      return message.channel.send("Sorry, this is a server-only command.")
    }
    funct.run(client, message, args);
    found = true;
  } else {
    client.commands.forEach(com => {
      if (com.info.aliases.includes(command) && !found) {
        if (com.info.guildOnly === true && message.channel.type === "dm") {
          return message.channel.send(
            "Sorry, this is a server-only command.")
        }
        com.run(client, message, args);
        found = true;
      }
    });
  }
};
