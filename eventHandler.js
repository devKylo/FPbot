requireEvent = (event) => {
  return require(`./events/${event}`);
};

exports.run = (client) => {
  client.on("message", (...args) => requireEvent("message").run(client, ...args));
}
