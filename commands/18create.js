module.exports = {
	name: 'create',
	description: 'A Staff Made Command To Create Custom Rooms',
	group: 1,
	execute(message, args) {
		if (!message.member.roles.cache.has('732342450420580414') && !message.member.roles.cache.has('742764953349390356')) return;
		if (!args[1]) return message.channel.send('**Enter Channel\'s Name')
		const name = args.slice(1).join(' ');
		if (args[0] == 'v') {
			message.guild.channels.create(`・︱${name}`, {
				type: 'voice',
				userLimit: 4,
				parent: message.guild.channels.cache.get('739539029900525609'),
				permissionOverwrites: [
					{
						id: message.guild.roles.cache.get('732342450420580414'),
						allow: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
					},
					{
						id: message.guild.roles.cache.get('742764953349390356'),
						allow: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
					},
				],
			}).then(() => {
				message.channel.send('**:thumbsup: - The Channel Was Created Successfully.**');
			});
		}
		else if (args[0] == 't') {
			message.guild.channels.create(`・︱${name}`, {
				type: 'text',
				topic: 'Change Topic To Room Owner\'s Name + Time Of Purchase',
				parent: message.guild.channels.cache.get('739539029900525609'),
				permissionOverwrites: [
					{
						id: message.guild.roles.cache.get('732342450420580414'),
						allow: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
					},
					{
						id: message.guild.roles.cache.get('742764953349390356'),
						allow: ['MANAGE_CHANNELS', 'MANAGE_ROLES'],
					},
				],
				rateLimitPerUser: '3',
			}).then(() => {
				message.channel.send('**:thumbsup: - The Channel Was Created Successfully.**');
			});
		}
		else {
			return message.channel.send('**Select a Channel Type .**');
		}
	},
};