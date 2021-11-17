const fs = require("fs-extra")
	, path = require("path")
	, Cache = require("node-cache")
	, assign = require("assign-deep");

class LocalFileDataManager
{
	_internallySave(key, value)
	{
		const filePath = join(this.path, `${key}.json`);
		return new Promise((resolve, reject) =>
		{
			fs.readJSON(filePath)
				.then(data =>
				{
					assign(data, value);
					fs.outputJSON(filePath, data)
						.then(resolve)
						.catch(reject);
				})
				.catch(error =>
				{
					if (error.code === "ENOENT")
						fs.outputJSON(filePath, value)
							.then(resolve)
							.catch(reject);
					else
						reject(error);
				});
		});
	}

	get path()
	{
		return path.resolve(this.config.path, this.config.dir);
	}

	constructor(config)
	{
		this.config = config;

		this.cache = new Cache({
			config: Object.assign({
				sdtTTL: 60 * 10, // 10 mins
				checkPeriod: 60 * 10, // 10 mins
				useClones: false,
				deleteOnExpire: true
			}, config.cache)
		});

		this.cache.on("expired", this._internallySave.bind(this));
	}

	get(key)
	{
		let value = this.cache.get(key);
		if (value != null)
			return Promise.resolve(value);
		return fs.readJSON(join(this.path, `${key}.json`));
	}

	add(key, value) { return this.update(key, value); }
	update(key, value)
	{
		if ((typeof key) === "object")
		{
			value = key;
			key = value.id || value.key;
		}

		return new Promise((resolve, reject) =>
		{
			this.cache.set(key, value);
			return this._internallySave(key, value);
		});
	}

	delete(key)
	{
		this.cache.del(key);
		return fs.remove(join(this.path, `${key}.json`));
	}
}

module.exports = LocalFileDataManager;
