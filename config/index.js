const config =
  process.env.mode == "dev" || process.env.mode == "stage"
    ? require("./dev")
    : require("./prod");

module.exports = config;
