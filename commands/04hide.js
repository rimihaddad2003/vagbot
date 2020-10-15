module.exports = {
	name: 'hide',
	description: 'Make the channel hidden',
	group: '0',
	execute(message) {
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**❌ - You do not have permissions to use this command.**');
		if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.channel.send('**:rolling_eyes: - I don\'t have enough permissions.**');
		message.channel.updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false });
		message.channel.send('**✨ - The channel was successfully hidded.**');
	},
};