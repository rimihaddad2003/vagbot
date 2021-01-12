const rooms = ['796792573459955712','796792614061211694','796792640074809374','796792661067431948','796792948267810848','796793118430724137','796793297766842439','796793227276845147'];
module.exports = {
	name: 'protection',
	description: 'Turn Server Protection On/Off .',
	group: '1',
	execute(message, args, client) {
		if (!message.member.roles.cache.has('774366958107754517')) return;
		if (args[0] !== 'on' && args[0] !== 'off') return message.channel.send('**Enter An Option !**');
		message.author.send('**:sparkles: - Please enter the password.**').then(() => {
			message.channel.send('**:sparkles: - Please enter the password in your dm.**');
			const filter = m => message.author.id === m.author.id;
			message.author.dmChannel.awaitMessages(filter, { time: 60000, max: 1, errors: ['time'] })
				.then(async messages => {
					if (messages.first().content !== 'us62d9') return message.author.send('**:x: - Wrong Password.**');
					if (args[0] == 'on') {
						message.guild.channels.cache.get('737732911431811222').updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false });
						message.guild.channels.cache.get('737732693231665223').updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: false });
						message.guild.channels.create('𝚅erify', {
							topic: 'السيرفر في وضع الحماية..يرجى الانتظار',
							parent: message.guild.channels.cache.find(c => c.type == 'category' && c.name == '• 𝙿𝚛𝚘𝚝𝚎𝚌𝚝𝚒𝚘𝚗'),
							permissionOverwrites: [
								{
									id: message.guild.roles.everyone,
									allow: ['SEND_MESSAGES', 'VIEW_CHANNEL'],
								},
								{
									id: '708082422733996142',
									deny: ['VIEW_CHANNEL'],
								},
							],
							position: '1',
							rateLimitPerUser: '15',
							reason: `Protection On By : ${message.author.username}`,
						});
						rooms.forEach(room => {
							message.guild.channels.cache.get(room).setRateLimitPerUser(10);
						});
						(await message.guild.members.fetch()).get('512333785338216465').roles.remove('708082414684995586');
						client.user.setPresence({ activity: { name: '🔴 Protecting Vagmemes !', type: 'WATCHING' }, status: 'dnd' });
						message.channel.send('**Protection : On**');
						message.author.send('**Protection : On**');
					}
					if (args[0] == 'off') {
						message.guild.channels.cache.get('737732911431811222').updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: true });
						message.guild.channels.cache.get('737732693231665223').updateOverwrite(message.guild.roles.everyone, { VIEW_CHANNEL: true });
						message.guild.channels.cache.find(c => c.name == '𝚅erify').delete();
						rooms.forEach(room => {
							message.guild.channels.cache.get(room).setRateLimitPerUser(1);
						});
						(await message.guild.members.fetch()).get('512333785338216465').roles.add('708082414684995586');
						client.user.setPresence({ activity: { name: 'Vagmemes Server | Type v!help', type: 'WATCHING' }, status: 'online' });
						message.channel.send('**Protection : Off**');
						message.author.send('**Protection : Off**');
					}
				})
				.catch(err => {
					console.log(err);
					message.author.send('**:thinking: - Time out, you did not enter any input!**');
				});
		}).catch(() => {
			message.channel.send('**❌ - I couldn\'t send help message to you, please check if your DM is open.**');
			message.react('❌');
		});
	},
};