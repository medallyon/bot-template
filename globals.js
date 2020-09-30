global.join = require("path").join;

global.__rootdir = __dirname;
global.__libdir = join(__dirname, "lib");
global.__webdir = join(__dirname, "web");
global.__datadir = join(__dirname, "data");

global.index = function(dir)
{
	const fs = require("fs");

	let modules = {}
		, files = fs.readdirSync(dir);

	for (const file of files)
	{
		if (file === "index.js")
			continue;

		const filePath = join(dir, file);
		modules[file.replace(".js", "")] = require(filePath);
	}

	return modules;
};
