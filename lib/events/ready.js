module.exports = function()
{
    console.log(`Logged in as ${this.user.username} and serving approx. ${this.users.cache.size} users.`);

    // run randomStatus cronJob manually once client has loaded
    this.crons.get("randomStatus").job();
};
