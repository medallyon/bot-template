class Command
{
	get embed()
	{
		const embed = new this.client.utils.DefaultEmbed()
			.setAuthor(this.name)
			.setDescription(`${this.description}\n*Also known as: \`${this.alias.join("`, `")}\`*.`)
			.addField("Permission Value", this.permission);

		if (this.example)
			embed.addField("Example Usage", `\`${this.client.prefix}${this.name} ${this.example}\``);

		return embed;
	}

	constructor(client, meta)
	{
		this.client = client;

		// Bool : whether this is a system module (only executed by crons, etc.)
		this.system = meta.system;
		// String
		this.name = meta.name;
		// Integer : this module's permission value
		this.permission = meta.permission;
		// Array<String> : alias names that are looked at when siphoning commands from a message
		this.alias = meta.alias;
		// String
		this.description = meta.description;
	}
}

module.exports = Command;
