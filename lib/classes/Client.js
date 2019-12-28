const Discord = require("discord.js");

const DEFAULT_PREFIX = "/";

class Client extends Discord.Client
{
    get prefix()
    {
        return process.env.PREFIX || DEFAULT_PREFIX;
    }

    constructor(options)
    {
        super(options);

        this.developerID = "129036763367735297";

        this.utils = require("../utils");
        this.commands = new (require("../commands"))(this);
        this.events = new (require("../events"))(this);
    }
}

module.exports = Client;
