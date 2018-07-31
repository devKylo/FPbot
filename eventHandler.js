requireEvent = (event) => {
  return require(`./events/${event}`);
};

exports.run = (client) => {
  client.on("message", (...args) => requireEvent("message").run(client, ...args));
  client.on("guildMemberAdd", (...args) => requireEvent("guildMemberAdd").run(client, ...args));
}
