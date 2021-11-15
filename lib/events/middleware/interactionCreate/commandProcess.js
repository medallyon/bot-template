module.exports = function(interaction)
{
	if (interaction.isCommand())
	{
		for (const cmd in this.client.commands)
		{
			if (interaction.commandName !== cmd.toLowerCase())
				continue;

			this.client.commands[cmd].run(interaction);
		}
	}
}
