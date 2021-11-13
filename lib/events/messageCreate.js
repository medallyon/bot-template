const DiscordEvent = require(join(__libdir, "classes", "DiscordEvent.js"));

class MessageCreate extends DiscordEvent
{
	constructor(client)
	{
		super(client, "messageCreate");
		this.ignoreServerIDs = [];
	}

	trigger(msg)
	{
		super.trigger(msg);

		if (this.ignoreServerIDs.some(id => msg.guild?.id === id))
			return;

		const time = msg.createdAt.toUTCString()
			, content = `${(msg.author.bot && "[BOT] ") || (msg.author.system && "[SYS] ") || ""}${msg.author.tag}: "${msg.content.length ? msg.cleanContent : (msg.attachments.size ? "[IMAGE]" : "[EMBED]")}"`
			, location = `${"#" + (msg.channel.name || msg.channel.recipient.id)}${msg.guild ? (` - {${msg.guild.name}|${msg.guild.id}}`) : ""}`;

		console.log(`\n${time}\n${content}\n${location}`);
	}
}

module.exports = MessageCreate;
