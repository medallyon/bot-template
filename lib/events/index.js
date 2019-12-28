const join = require("path").join
    , fs = require("fs");

class Events
{
    constructor(client)
    {
        const files = fs.readdirSync(__dirname);

        for (const file of files)
        {
            if (file === "index.js")
                continue;

            const filePath = join(__dirname, file);
            this[file.replace(".js", "")] = require(filePath);
        }

        for (const event in this)
            client.on(event, this[event]);
    }
}

module.exports = Events;
