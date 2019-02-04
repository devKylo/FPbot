//made with <3 by logandev and kyle  
Discord = require("discord.js")
  const client = new Discord.Client()
  const data = require("./super-secret-data.json")
  const fs = require("fs");
  const Enmap = require('enmap');
  const EnmapLevel = require('enmap-level');
  const level = new EnmapLevel({ name: 'userData' });
  userData = new Enmap({ provider: level });

  require("./webServer.js")

  furryParadise = {
    getMemberCount: function() {
      return client.guilds.get("301615194520551426").members.size
    },
    getGuildData: function() {
      var gdata = client.guilds.get("301615194520551426")
      return {
        name: gdata.name,
        members: gdata.members.size,
        roles: gdata.roles.size,
        channels: gdata.channels.filter(ch => ch.type === "text" || ch.type === "voice").size//,
        //staffMembers: gdata.roles.filter(r => r.name = "Staff Team").first().members.size
      }
    }
  }

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

  presenceManager = {
    setPresence: function(presence, activityType) {
      client.user.setPresence({
            activity: {
              name: presence,
              type: activityType
            }
          })
    },
    deletePresence: function() {
      client.user.setPresence({
            status: "online",
            activity: undefined
          })
    }
  };

  client.on('ready', () => {
    console.log("BOT ONLINE");
    loadCommands("./commands/", client.commands);
    console.log("Commands Loading\n" + Array.from(client.commands.keys()).join(
        "\n"));
    require('./eventHandler.js').run(client);
    presenceManager.setPresence(furryParadise.getMemberCount() + " members!", "WATCHING")
    });

  client.login(data.token)
