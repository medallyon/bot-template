const { Client, Intents } = require("discord.js")
	, CronManager = require(join("..", "cron", "Manager.js"))
	, InteractionManager = require(join(__dirname, "InteractionManager.js"));

/**
 * @class DiscordClient
 * @extends Client
 */
class DiscordClient extends Client
{
	/**
	 * @param {ClientOptions} options
	 */
	constructor(options)
	{
		super(Object.assign({
			intents: new Intents()
				.add(Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS)
		}, options));

		this.utils = require("../utils");
		this.commands = require("../commands")(this);
		this.events = require("../events")(this);

		this.crons = new CronManager(this);
		this.interactions = new InteractionManager(this);
	}
}

module.exports = DiscordClient;
