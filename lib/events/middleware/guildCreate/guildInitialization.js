module.exports = function(guild)
{
	const defaultConfig = {
		id: guild.id
	};

	this.client.data.guilds.add(defaultConfig)
		.catch(console.error);
}
