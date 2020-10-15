const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'message',
	description: 'Send Messages in Tickets',
	group: 1,
	execute(message, args) {
		if (!message.member.roles.cache.has('714938663988887613') || !message.channel.name.startsWith('ticket-')) return;
		const msgembed = new MessageEmbed()
			.setAuthor('Vagmemes Ticket System .')
			.setColor('#006B84')
			.setFooter(`Vagmemes Staff Team .\nStaff: [${message.member.displayName}]`, message.guild.iconURL());
		switch (args[0]) {
			case 'open':
				msgembed.setDescription('> **🌹 تفضل**\n> **كيف ممكن أخدمك ؟**');
				break;

			case 'end':
				msgembed.setDescription('> **👍 الإدارة جاهزة للمساعدة**\n> **❤️ حياك بأي وقت**');
				break;

			case 'wrong':
				msgembed.setDescription('> **<#738710828366168145> :لفتح تيكيت ماين يرجى التوجه إلى روم**\n> **ثم الضغط على تيكيت المخصص للدعم الفني الخاص بماين كرافت**\n**( Minecraft Support )**\n**كما في الصورة :**')
					.setImage('https://i.imgur.com/HzJnVcd.png');
				break;

			case 'ask':
				msgembed.setDescription('> **🤔 أقدر أساعدك بشي ثاني ؟**');
				break;

			default:
				break;
		}
		message.delete();
		if (msgembed.description) message.channel.send(msgembed);
	},
};