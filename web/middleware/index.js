const fs = require("fs");

/*
 * This will pick up scripts in this folder and any sub-folders.
 * Assuming this folder has this structure:
 * 
 * middleware/
 *  - script1.js
 *  - script2.js
 *  - folder1/
 *    - script3.js
 * 
 * The resulting object will look like this:
 * 
 * {
 *   script1: [Function],
 *   script2: [Function],
 *   folder1: {
 *     script3: [Function]
 *   }
 * }
 */

module.exports = (function pickUpScripts(dir)
{
	const scripts = {}
		, files = fs.readdirSync(dir)
		, scriptFiles = files.filter(f => f !== "index.js" && f.toLowerCase().endsWith(".js"))
		, folders = files.filter(x => fs.statSync(join(dir, x)).isDirectory());

	for (const script of scriptFiles)
		scripts[script.replace(/\.js/gi, "")] = require(join(dir, script));

	for (const folder of folders)
		scripts[folder] = pickUpScripts(join(dir, folder));

	return scripts;
})(__dirname);
