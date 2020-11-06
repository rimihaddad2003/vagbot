const Discord = require('discord.js');

module.exports = {
	name: 'family',
	description: 'List the stats of VAG tag / Family role',
	group: '0',
	async execute(message) {
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**❌ - You do not have permissions to use this command.**');
		const list = ['', '', ''];
		const count = [0, 0, 0];
		(await message.guild.members.fetch()).forEach(m => {
			if (m.user.username.includes('VAG') && !m.roles.cache.has('708082424252334169')) {
				list[0] += `${m.user} `;
				count[0]++;
			}
			if (!m.user.username.includes('VAG') && m.roles.cache.has('708082424252334169')) {
				list[1] += `${m.user} `;
				count[1]++;
			}
			if (m.nickname) {
				list[2] += `${m.user} `;
				count[2]++;
			}
		});


		async function sendEmbeds(l, title, c) {

			const embed = new Discord.MessageEmbed()
				.setColor('006B84')
				.setTitle(title)
				.setDescription(l)
				.setFooter(`Members » ${c}`);
			await message.channel.send({ embed });
		}
		if (message.member.hasPermission('ADMINISTRATOR')) {
			await sendEmbeds(list[0], 'Members with `VAG` tag in their name but **without the role** :', count[0]);
			await sendEmbeds(list[1], 'Members with `Family` Role but **without the tag** :', count[1]);
			await sendEmbeds(list[2], 'Members with `Nickname`:', count[2]);
		}
	},
};