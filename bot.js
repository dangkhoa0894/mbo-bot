require("dotenv").config();
var express = require("express");
const request = require("request-promise");
var app = express();
var fetch_data = require("./data");

const getRandomInt = max => {
  return Math.floor(Math.random() * Math.floor(max));
};
var post_timeline = [];

const getRandom = () => {
  // console.log(getRandomInt(fetch_data.length));
  for (var i = 0; i < fetch_data.length; i++) {
    post_timeline.push({
      message: fetch_data[i].message,
      picture: fetch_data[i].picture,
      link: fetch_data[i].link,
      name: fetch_data[i].name
    });
  }
};

app.get("/facebook-search/:id", (req, res) => {
  const options = {
    method: "GET",
    uri: `https://graph.facebook.com/v2.2/${req.params.id}`,
    accept:
      "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
    qs: {
      access_token: process.env["FACEBOOK_TOKEN"],
      fields: "posts"
    }
  };
  getRandom();
  request(options).then(fbRes => {
    res.json(JSON.parse(JSON.stringify(JSON.parse(fbRes))));
  });
});

const post_now = _post => {
  const postTextOptions = {
    method: "POST",
    uri: `https://graph.facebook.com/v2.2/267678777227239/feed?`,
    qs: {
      access_token: process.env["FACEBOOK_TOKEN"],
      name: _post.name,
      message: _post.message,
      link: _post.link
    }
  };
  request(postTextOptions)
    .then(() => {
      console.log("\n=====================");
      console.log("Đăng bài thành công");
    })
    .catch(err => {
      console.log("\n=====================");
      console.log("Lỗi cmnr, đéo đăng được đâu");
      console.log("\n=====================");
      console.log("Để bố tự chạy lại, đm");
      console.log("Send to Mẹ bầu Online, at: " + getDateTime());
      post_now(post_timeline[getRandomInt(fetch_data.length)]);
      console.log("Detail post: ");
      console.log(post_timeline[getRandomInt(fetch_data.length)]);
    });
};
getRandom();

function getDateTime() {
  var date = new Date();

  var hour = date.getHours();
  hour = (hour < 10 ? "0" : "") + hour;

  var min = date.getMinutes();
  min = (min < 10 ? "0" : "") + min;

  var sec = date.getSeconds();
  sec = (sec < 10 ? "0" : "") + sec;

  var year = date.getFullYear();

  var month = date.getMonth() + 1;
  month = (month < 10 ? "0" : "") + month;

  var day = date.getDate();
  day = (day < 10 ? "0" : "") + day;

  return (
    hour +
    ":" +
    min +
    ":" +
    sec +
    " " +
    "|" +
    " " +
    year +
    "/" +
    month +
    "/" +
    day
  );
}
const doSomething = () => {
  console.log("Send to Mẹ bầu Online, at: " + getDateTime());
  post_now(post_timeline[getRandomInt(fetch_data.length)]);
  console.log("Detail post: ");
  console.log(post_timeline[getRandomInt(fetch_data.length)]);
};

const pingdom = () => {
  console.log("\n=====================");
  console.log("Tao vẫn còn sống, đmm");
};
doSomething();
pingdom();
setInterval(pingdom, 600000);
setInterval(doSomething, 10800000);
console.log("version: 0.0.5");
app.listen(process.env["PORT"] || 8888, () => console.log('Tao là bot, đang chạy đây. Queo com tu đờ heo'));
