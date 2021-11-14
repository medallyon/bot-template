const CronJob = require("cron").CronJob;

class RandomStatus
{
	constructor(manager)
	{
		this.manager = manager;

		this.recent = [];
		this.stati = (process.env.DISCORD_STATI || "").split(",")
			.map(x => x.trim());

		this.cron = new CronJob({
			// run every 10 mins
			cronTime: "0 */10 * * * *",
			onTick: this.job,
			context: this,
			start: true,
			// don't run on init because client won't be ready yet
			runOnInit: false
		});
	}

	pickRandomStatus()
	{
		const notRecent = this.stati.filter(x => !this.recent.includes(x))
			, random = notRecent[Math.floor(Math.random() * notRecent.length)];

		this.recent.push(random);
		if (this.recent.length >= this.stati.length * .75)
			this.recent.shift();

		return random;
	}

	job()
	{
		if (!this.stati.length)
		{
			this.cron.stop();
			this.cron = null;

			const path = require("path");
			return this.manager.delete(path.basename(__filename)
				.replace(".js", ""));
		}

		this.manager.client.user.presence.set({
			activities: [
				{
					name: this.pickRandomStatus(),
					type: "PLAYING"
				}
			]
		});
	}
}

module.exports = RandomStatus;
