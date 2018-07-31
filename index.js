Discord = require("discord.js")
const client = new Discord.Client()
const data = require("./super-secret-data.json")
const Enmap = require("enmap");
const fs = require("fs");

client.commands = new Map();

//need work on command handler (message.js)
loadCommands = (dir, comArray) => {
  try {
    files = fs.readdirSync(dir);
    files.forEach(f => {
      if (fs.statSync(dir + f).isDirectory()) {
        loadCommands(dir + f + "/", comArray);
      } else {
        let commandFile = require(dir + f);
        let commandName = f.split(`.`)[0];
        comArray.set(commandName, commandFile);
      }
    });
  } catch (err) {
    console.log(err);
  }
};

client.on('ready', () => {
  console.log("online.");
  loadCommands("./commands/", client.commands);
  console.log("Commands Loading\n" + Array.from(client.commands.keys()).join(
      "\n"));
  require('./eventHandler.js').run(client);
});

client.login(data.token)
