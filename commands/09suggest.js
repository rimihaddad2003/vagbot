const Discord = require('discord.js');

module.exports = {
	name: 'suggest',
	description: 'Send a suggestion to stuff',
	group: '2',
	async execute(message, args) {
		const sugg = args.join(' ');
		if (!sugg) return message.channel.send('**:thinking: - Incorrect usage, please use `v!suggest [suggestion]`**');
		const sugembed = new Discord.MessageEmbed()
			.setColor('#6281F0')
			.setAuthor('Vagmemes Suggestions', message.guild.iconURL())
			.setDescription(`**📑 \`Suggestion\` » \n ${sugg}**\n\n`)
			.setThumbnail(message.author.avatarURL({ dynamic: true }))
			.setFooter(`By » ${message.author.username}`)
			.setTimestamp();
		const sugchannel = message.guild.channels.cache.find(channel => channel.name === '✎・𝚂uggestions');
		const sug = await sugchannel.send(sugembed)
			.catch(() => message.channel.send('**:no_entry: - An error occurred while sending the suggestion, please try again later. **'));
		await sug.react('739581485635600405');
		await sug.react('739581496108515329');
		await message.delete();
		await message.channel.send('**:bookmark_tabs: - Your suggestion was successfully sent to <#738519680725287104>.**').then(bmessage => bmessage.delete({ timeout: 5000 }));
	},
};