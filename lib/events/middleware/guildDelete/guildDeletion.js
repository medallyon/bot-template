module.exports = function(guild)
{
	this.client.data.guilds.delete(guild.id)
		.catch(console.error);
}
