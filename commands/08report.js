const Discord = require('discord.js');

module.exports = {
	name: 'report',
	description: 'Send a report to staff',
	group: '2',
	execute(message, args) {
		if (!args[2] || !args[1] || !args[0]) return message.channel.send('**:thinking: - Invalid  report, please use `v!report [name] [prove-link] [reason]`,\n\nExample »** \nv!report Report-System Spamming http://prntscr.com/tsqmrp');
		let sec = false;
		const reason = args.slice(2).join(' ');
		const reportchannel = message.guild.channels.cache.find(channel => channel.name === '✎・𝚁eports');
		const reportembed = new Discord.MessageEmbed()
			.setColor('#0f8eff')
			.setTitle('**__Discord Reports__**')
			.setDescription(`\n**:sparkles: - (${args[0]}) Was Reported By <@${message.author.id}> For \`${reason}\`,\nProve » ${args[1]}.\n\nReport Message » ${message.url}**`);
		reportchannel.send(reportembed).catch(() => {
			message.channel.send('**:no_entry: - An error occurred while sending the report, please try again later. **');
			message.react('❌');
			sec = true;
			console.error();
		});
		setTimeout(() => {
			if (sec == false) return message.react('✅');
		}, 700);
	},
};