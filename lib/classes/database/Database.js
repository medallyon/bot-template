// All DataManagers are accessible through this class through dot-notation
class Database
{
	constructor(config = { path: __datadir })
	{
		for (const [ name, Manager ] of Object.entries(global.index(join(__dirname, "managers"))))
		{
			const man = new Manager(config);
			this[man.config.name || name] = man;
		}
	}
}

module.exports = Database;
