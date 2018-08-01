const {
  promisify, inspect
} = require('util');
const randomstring = require("randomstring");

exports.run = (client, message, args) => {
  if (message.author.id == "314576267884101634" || message.author.id == "270582757032198164") {
    const code = message.content.slice(message.content.search(' ') + 1);
    try {
      message.channel.send("", {
        "embed": {
          "color": 0xD40000,
          "description": (
            `\`INPUT:\`\n\`\`\`\n${code}\n\`\`\`\n\`OUTPUT:\`\n\`\`\`\n${clean(eval(code))}\n\`\`\``
          )
        }
      })
    } catch (err) {
      message.channel.send("", {
        "embed": {
          "color": 0xD40000,
          "description": (
            `\`INPUT:\`\n\`\`\`\n${code}\n\`\`\`\n\`ERROR:\`\n\`\`\`\n${clean(err)}\n\`\`\``
          )
        }
      })
    }
  }

  function clean(text) {
    if (typeof text !== 'string')
      text = inspect(text, {
        depth: 0
      })
    text = text
      .replace(/`/g, "`" + String.fromCharCode(8203))
      .replace(/@/g, "@" + String.fromCharCode(8203))
      .replace(client.token, randomstring.generate(24) + "." + randomstring.generate(
        6) + "." + randomstring.generate(23));
    return text;
  }

}
exports.info = {
  name: "Eval",
  description: "Evaluation command",
  aliases: [],
  guildOnly: false,
  category: "Tools",
  hidden: false
}
