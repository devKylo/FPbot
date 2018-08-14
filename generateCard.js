const { createCanvas, loadImage, Image, registerFont } = require('canvas');
const fs = require("fs")
var Request = require('pixl-request');
registerFont('./statCards/Product Sans Regular.ttf', {family: 'Product Sans'});

generateCard = function(xp, level, avatarURL, username, nickname, currentXP, maxXP, userID, squadpoints, rank) {
return new Promise(function(resolve, reject) {
//xp = 3180
//maxXP = 19200
//avatarURL = "https://cdn.discordapp.com/avatars/314576267884101634/bb69f3f13d1f231e3cb38a1c89cce7a7.png?size=1024"
//level = 57
//userID = 314576267884101634
//username = "Logandev_#9999"
//nickname = "Logan xd"
//squadpoints = 5
//rank = 2

  const canvas = createCanvas(624, 295);
  const ctx = canvas.getContext('2d')
  loadImage('./statCards/final/background.png').then((image) => {
    ctx.drawImage(image, 0, 0, 624, 295)
    var request = new Request();
    var url = avatarURL
    request.get(url, function(err, resp, data) {
      if (err) throw err;

      var avatar = new Image();
      avatar.src = data;
      ctx.drawImage(avatar, 43, 43, 211, 204);
      ctx.fillStyle = "#66B7FF";
      loadImage('./statCards/final/foreground.png').then((frontImage) => {
        ctx.fillRect(266,203, (313/maxXP)*currentXP,29);
        ctx.drawImage(frontImage, 0, 0, 624, 295)
        loadImage('./statCards/final/level/' + level + '.png').then((level) => {
          ctx.drawImage(level, 244, 120, 80, 80)
          ctx.fillStyle = "#ffffff";
          ctx.font = '17px "Product Sans"'
          ctx.fillText(username, 245, 111);
          ctx.font = '34px "Product Sans" bold'
          ctx.fillText(nickname, 237, 83);
          ctx.font = '30px "Product Sans" bold'
          ctx.fillText(squadpoints, 509, 172);
          ctx.fillText(rank, 402, 170);
          ctx.font = '15px "Product Sans" bold'
          ctx.textAlign="end";
          ctx.fillText(currentXP + " / " + maxXP + " XP", 570, 246);
          loadImage('./statCards/final/Highground.png').then((topImage) => {
            ctx.drawImage(topImage, 0, 0, 624, 295)
          const out = fs.createWriteStream(__dirname + '/userCards/' + userID + '.png')
          const stream = canvas.createPNGStream()
          stream.pipe(out)
          out.on('finish', () =>  {
            console.log("rendered stat card for " + userID)
            resolve(userID);
          })
        })
      })
      })
    })
  })
})
}
