module.exports = {
	name: 'slowmode',
	description: 'Change slowmode(cooldown) ammount in the channel',
	group: '1',
	execute(message, args) {
		if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('**❌ - You do not have permissions to use this command.**');
		if (!message.guild.me.hasPermission('MANAGE_CHANNELS')) return message.channel.send('**:rolling_eyes: - I don\'t have enough permissions**');
		if (!args[0]) {
			message.channel.setRateLimitPerUser(0);
			message.channel.send('**:turtle: - Channel\'s cooldown turned off.**');
			return;
		}
		if (isNaN(args[0])) return message.channel.send('**:thinking: - Please use a valid number.**');
		message.channel.setRateLimitPerUser(args[0]);
		message.channel.send(`**:turtle: - Channel's cooldown set to \`${args[0]}\`.**`);
	},
};