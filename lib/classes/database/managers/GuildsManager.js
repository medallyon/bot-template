const LocalFileDataManager = require(join(__libdir, "classes", "database", "LocalFileDataManager.js"))
	, Guild = require(join(__libdir, "classes", "database", "models", "Guild.js"));

class GuildsManager extends LocalFileDataManager
{
	/**
	 * @param {LocalFileDataManagerConfig} config
	 */
	constructor(config = {})
	{
		super(Object.assign({
			name: "guilds",
			dir: "guilds",
			Model: Guild
		}, config));
	}
}

module.exports = GuildsManager;
