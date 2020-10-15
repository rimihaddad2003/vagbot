const Discord = require('discord.js');

module.exports = {
	name: 'vote',
	description: 'Create a poll / vote with reaction',
	group: '0',
	async execute(message, args) {
		if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('**❌ - You do not have permissions to use this command.**');
		const votemsg = args.join(' ');
		if (!votemsg) return message.channel.send('**:thinking: - Incorrect usage, please use `v!vote [Vote Message]` **');
		const vote = new Discord.MessageEmbed()
			.setTitle('__**Vote**__')
			.setDescription(`**${votemsg}**`)
			.setTimestamp()
			.setThumbnail(message.guild.iconURL())
			.setFooter(`Vote By » ${message.author.username}`, message.author.avatarURL({ dynamic: true }))
			.setColor('#0f8eff');
		const msg = await message.channel.send(vote);
		message.delete();
		await msg.react('747523849297461449');
		await msg.react('747523849096003775');
	},
};