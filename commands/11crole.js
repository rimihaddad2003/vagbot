const Discord = require('discord.js');

// message.guild.roles.cache.get('711467312196354048').members.map(m => m.user).join('\n')
module.exports = {
	name: 'crole',
	description: 'List all members with custom roles',
	group: '0',
	async execute(message) {
		const donator = message.guild.roles.cache.get('711467312196354048');
		const vip = message.guild.roles.cache.get('714886315438768169');
		const pr = message.guild.roles.cache.get('714831424796098560');
		const bl = message.guild.roles.cache.get('712676825699975239');
		const muted = message.guild.roles.cache.get('712843733716041778');
		async function sendEmbeds(des, role, count, color) {
			const arr = des.match(/.{1,2046}/g);

			for (const chunk of arr) {
				const embed = new Discord.MessageEmbed()
					.setColor(color)
					.setTitle(`Members with \`${role}\` role :`)
					.setDescription(chunk)
					.setFooter(`Members » ${count}`, message.guild.iconURL());
				await message.channel.send({ embed });
			}
		}
		if (!message.member.hasPermission('ADMINISTRATOR') && !message.member.roles.cache.has('708082413141622854')) return message.channel.send('**❌ - You do not have permissions to use this command.**');
		await sendEmbeds(donator.members.map(m => m.user).join(' '), donator.name, donator.members.size, donator.color);
		await sendEmbeds(vip.members.map(m => m.user).join(' '), vip.name, vip.members.size, vip.color);
		await sendEmbeds(pr.members.map(m => m.user).join(' '), pr.name, pr.members.size, pr.color);
		await sendEmbeds(bl.members.map(m => m.user).join(' '), bl.name, bl.members.size, bl.color);
		await sendEmbeds(muted.members.map(m => m.user).join(' '), muted.name, muted.members.size, muted.color);
	},
};