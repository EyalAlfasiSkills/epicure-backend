var urlConfig;

if (process.env.NODE_ENV === "production") {
  urlConfig = require("./prod");
} else {
  urlConfig = require("./dev");
}

module.exports = urlConfig;
