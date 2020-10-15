module.exports = {
	name: 'event',
	description: 'Create / delete event channel',
	group: '0',
	execute(message) {
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**❌ - You do not have permissions to use this command.**');
		let check = false;
		if (message.guild.channels.cache.find(c => c.name == '✎・𝙴vents')) {
			return message.author.send('**:x: - The channel has been created already.**');
		}
		message.author.send('**:sparkles: - Please enter the password.**').then(() => {
			const filter = m => message.author.id === m.author.id;
			message.author.dmChannel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
				.then(messages => {
					if (messages.first().content !== 'va97-efv') return message.author.send('**:x: - Wrong Password.**');

					message.guild.channels.create('✎・𝙴vents', {
						topic: 'Many Differents Events Hosted By Vagmemes Staff Team.',
						parent: message.guild.channels.cache.find(c => c.type == 'category' && c.name == '• 𝙿𝚞𝚋𝚕𝚒𝚌'),
						permissionOverwrites: [
							{
								id: message.guild.roles.everyone,
								deny: ['SEND_MESSAGES', 'ADD_REACTIONS'],
								allow: ['ATTACH_FILES'],
							},
						],
						position: '1',
						rateLimitPerUser: '3',
						reason: 'Starting an event',
					});
					message.author.send('**:white_check_mark: - The channel was successfully created.**');

				})
				.catch(() => {
					message.author.send('**:thinking: - Time out, you did not enter any input!**');
				});
		}).catch(() => {
			message.channel.send('**❌ - I couldn\'t send help message to you, please check if your DM is open.**');
			message.react('❌');
			check = true;
			return;
		});
		setTimeout(() => {
			if (check == false) return message.channel.send('**:sparkles: - Please enter the password in your dm.**');
		}, 700);
	},
};