module.exports = function()
{
    console.log(`Logged in as ${this.user.username} and serving approx. ${this.users.cache.size} users.`);
};
