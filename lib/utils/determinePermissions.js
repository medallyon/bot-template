const Discord = require("discord.js");

module.exports = function(member)
{
    // a regular discord User
    if (!(member instanceof Discord.GuildMember))
        return 100;

    // owner or admin
    if (member.hasPermission("ADMINISTRATOR"))
        return 300;
    // moderator??
    if (member.hasPermission("BAN_MEMBERS"))
        return 200;

    // regular Member
    return 100;
};
