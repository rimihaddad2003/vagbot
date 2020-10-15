const Timestamps = require('../index');
const ms = require('ms');
module.exports = {
	name: 'mention',
	description: 'Mention The N.Privte Rank',
	group: '1',
	execute(message) {
		if (!message.member.roles.cache.has('714831424796098560')) return;
		if (message.channel.parentID !== '739539029900525609') return;

		const now = Date.now();
		const cooldownAmount = 60 * 60 * 1000;
		if (Timestamps.has(message.author.id)) {
			const expirationTime = Timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now);
				return message.channel.send(`**:timer: - Please Wait __${ms(timeLeft, { long: true })}__ Before The Next Mention .**`);
			}
		}
		Timestamps.set(message.author.id, now);
		setTimeout(() => Timestamps.delete(message.author.id), cooldownAmount);

		message.channel.send('<@&744315697580081152>').then(() => {
			message.delete();
		});

	},
};