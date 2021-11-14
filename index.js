require("./globals.js");

require("dotenv").config();

const DiscordClient = require(join(__libdir, "classes", "DiscordClient.js"));
const client = new DiscordClient();

client.login(process.env.BOT_TOKEN)
	.catch(console.error);

module.exports = { client };
