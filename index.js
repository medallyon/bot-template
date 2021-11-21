require("./globals.js");

require("dotenv").config();

const DiscordClient = require(join(__libdir, "classes", "DiscordClient.js"));
const client = new DiscordClient();

client.login(process.env.BOT_TOKEN)
	.catch(console.error);

const cleanup = require("node-cleanup");
cleanup(function(exitCode, signal)
{
	if (client?.data == null)
		return;

	console.log(`\nReceived ${signal} (${exitCode}). Attempting to gracefully save all data...`);

	const { outputJSONSync } = require("fs-extra")
		, { resolve } = require("path");

	let saved = 0
		, errors = {};
	for (const man in client.data)
	{
		const manager = client.data[man];
		if ((typeof manager._internallySave) === "function")
		{
			try
			{
				for (const key of manager.cache.keys())
					outputJSONSync(resolve(manager.path, `${key}.json`), manager.cache.get(key));

				saved++;
			}

			catch (err)
			{
				errors[man] = { code: err.code, message: err.message, stack: err.stack };
			}
		}
	}

	if (saved)
		console.log(`Successfully saved ${saved} DataManagers.`);

	if (Object.keys(errors).length)
	{
		try
		{
			const filename = `${(new Date()).toISOString().replace(/:/g, ".")}.json`;
			outputJSONSync(resolve(__dirname, "logs", filename), errors, { spaces: 2 });

			const keys = Object.keys(errors);
			console.log(`Encountered errors while saving '${keys.slice(0, 3).join("', '")}'${keys.length > 3 ? (` and ${keys.length - 3} other managers`) : ""}. See ./logs/${filename}.`);
		}

		catch (err)
		{
			console.error(errors);
		}
	}
});

module.exports = { client };
