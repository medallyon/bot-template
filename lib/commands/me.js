const moment = require("moment")
    , Command = require("../classes/Command.js");

class Me extends Command
{
    constructor(client)
    {
        super(client, {
            name: "me",
            alias: [ "me", "user", "info" ],
            description: "Displays info about you or a mentioned user.",
            permission: 100,
        });
    }

    buildEmbed(member)
    {
        const embed = new this.client.utils.DefaultEmbed()
            .setColor(member.displayColor || this.client.utils.generateRandomColor())
            .setAuthor(member.tag || member.user.tag)
            .setImage(member.displayAvatarURL || member.user.displayAvatarURL);

        if (member.nickname)
            embed.addField("Nickname", member.nickname, true);

        if (member.guild)
            embed.setDescription(`**${member.user.username}** has been part of this server since ${moment(member.joinedAt).format("MMMM YYYY")}.`)
                .addField("Roles", member.roles.size, true)
                .addField("Highest Role", member.highestRole.toString(), true)
                .addField("Joined Date", member.joinedAt.toUTCString());

        embed.addField("Creation Date", (member.createdAt || member.user.createdAt).toUTCString());

        return embed;
    }

    run(msg)
    {
        let user = msg.guild ? msg.member : (msg.mentions.users.size ? msg.guild.member(msg.mentions.users.first()) : msg.author);
        return Promise.resolve(this.buildEmbed(user));
    }
}

module.exports = Me;
