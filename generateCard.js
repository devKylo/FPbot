const { createCanvas, loadImage, Image, registerFont } = require('canvas');
const fs = require("fs")
var Request = require('pixl-request');
registerFont('./statCards/Product Sans Regular.ttf', {family: 'Product Sans'});

//generateCard = function(xp, points, level, avatarURL, username, nickname, maxXP, userID) {

xp = 40
maxXP = 50
avatarURL = "https://cdn.discordapp.com/avatars/275345779823214592/83e3e6a2a5812eec5e5f6f69ca489ab4.png?size=1024"
level = 10
userID = 50
username = "Logandev_#9999"
nickname = "Logie uwu"

  const canvas = createCanvas(624, 295);
  const ctx = canvas.getContext('2d')
  loadImage('./statCards/final/background.png').then((image) => {
    ctx.drawImage(image, 0, 0, 624, 295)
    var request = new Request();
    var url = avatarURL
    request.get( url, function(err, resp, data) {
      if (err) throw err;

      var avatar = new Image();
      avatar.src = data;
      ctx.drawImage(avatar, 43, 43, 211, 204);
      ctx.fillStyle = "#66B7FF";
      loadImage('./statCards/final/foreground.png').then((frontImage) => {
        ctx.fillRect(266,203, (313/maxXP)*xp,29);
        ctx.drawImage(frontImage, 0, 0, 624, 295)
        loadImage('./statCards/final/level/' + level + '.png').then((level) => {
          ctx.drawImage(level, 251, 120, 80, 80)
          ctx.fillStyle = "#ffffff";
          ctx.font = '17px "Product Sans"'
          ctx.fillText(username, 245, 111);
          ctx.font = '34px "Product Sans" bold'
          ctx.fillText(nickname, 237, 83);
          const out = fs.createWriteStream(__dirname + '/userCards/' + userID + '.png')
          const stream = canvas.createPNGStream()
          stream.pipe(out)
          out.on('finish', () =>  {
            console.log("rendered stat card for " + userID)
          })
        })
      })
    })
  })
//}
