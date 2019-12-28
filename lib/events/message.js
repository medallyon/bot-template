const Discord = require("discord.js");

function siphonCommand(msg, client)
{
    const split = msg.content.split(" ");
    if (!split.length)
        return null;

    let commandName = split[0].slice(client.prefix.length).toLowerCase();
    if (msg.mentions.users.size
        && msg.mentions.users.has(client.user.id)
        && split[0].includes(client.user.id)
        && split.length > 1)
        commandName = split[1].toLowerCase();

    for (const c in client.commands)
    {
        const command = client.commands[c];
        if (command.alias.includes(commandName))
        {
            msg.command = command;
            return command;
        }
    }

    return null;
}

function hasPermissionForCommand(member, command, client)
{
    const userPerm = client.utils.determinePermissions(member);
    return (userPerm >= command.permission);
}

module.exports = function(msg)
{
    const time = msg.createdAt.toUTCString()
        , content = `${msg.bot ? "[BOT] " : ""}${msg.author.tag}: "${msg.content.length ? msg.cleanContent : (msg.attachments.size ? "[IMAGE]" : "[EMBED]")}"`
        , location = `${"#" + msg.channel.name || msg.channel.recipient.tag}${msg.guild ? (` - {${msg.guild.name}}`) : ""}`;

    console.log(`\n${time}\n${content}\n${location}`);

    siphonCommand(msg, this);
    if (!msg.command)
        return;

    if (!hasPermissionForCommand(msg.member || msg.author, msg.command, this))
        return;

    let result = msg.command.run(msg);
    if (result instanceof Promise)
    {
        result
            .then(function(data)
            {
                if (data instanceof Discord.RichEmbed || typeof data === "string")
                    msg.channel.send(data)
                        .catch(console.error);
            })
            .catch(function(error)
            {
                console.error(error);
                msg.channel.send(error)
                    .catch(console.error);
            });
    }

    else if (result instanceof Discord.RichEmbed || typeof result === "string")
        msg.channel.send(result)
            .catch(console.error);
};
