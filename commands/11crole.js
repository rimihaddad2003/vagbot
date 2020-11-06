const Discord = require('discord.js');

// message.guild.roles.cache.get('711467312196354048').members.map(m => m.user).join('\n')
module.exports = {
	name: 'crole',
	description: 'List all members with custom roles',
	group: '0',
	async execute(message) {
		const vip = message.guild.roles.cache.get('708082421610053662');
		const prole = message.guild.roles.cache.get('743944566591324211');
		const proom = message.guild.roles.cache.get('714831424796098560');
		async function sendEmbeds(role) {
			const arr = role.members.map(m => m.user).join(' ');

			const embed = new Discord.MessageEmbed()
				.setColor(role.color)
				.setTitle(`Members with \`${role.name}\` role :`)
				.setDescription(arr)
				.setFooter(`Members » ${role.members.size}`, message.guild.iconURL());
			await message.channel.send({ embed });
		}
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**❌ - You do not have permissions to use this command.**');
		await sendEmbeds(vip);
		await sendEmbeds(prole);
		await sendEmbeds(proom);
	},
};