module.exports = client =>
{
	const events = global.index(__dirname, 0, client);
	for (const eventName in events)
	{
		const event = events[eventName];
		client[event.on](eventName, event.trigger.bind(event));
	}

	return events;
}
