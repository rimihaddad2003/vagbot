const Discord = require('discord.js');

module.exports = {
	name: 'family',
	description: 'List the stats of VAG tag / Family role',
	group: '0',
	async execute(message) {
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**❌ - You do not have permissions to use this command.**');
		let list1 = '';
		let list2 = '';
		let count1 = '0';
		let count2 = '0';
		(await message.guild.members.fetch()).forEach(m => {
			if (m.user.username.includes('VAG') && !m.roles.cache.has('708082424252334169')) {
				list1 += `${m.user} `;
				count1++;
			}
			if (!m.user.username.includes('VAG') && m.roles.cache.has('708082424252334169')) {
				list2 += `${m.user} `;
				count2++;
			}
		});


		async function sendEmbeds(list, title, count) {
			const arr = list.match(/.{1,2046}/g);

			for (const chunk of arr) {
				const embed = new Discord.MessageEmbed()
					.setColor('006B84')
					.setTitle(title)
					.setDescription(chunk)
					.setFooter(`Members » ${count}`);
				await message.channel.send({ embed });
			}
		}
		if (message.member.hasPermission('ADMINISTRATOR')) {
			await sendEmbeds(list1, 'Members with `VAG` tag in their name but **without the role** :', count1);
			await sendEmbeds(list2, 'Members with `Family` Role but **without the tag** :', count2);
		}
	},
};