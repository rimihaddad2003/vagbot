const { MessageEmbed } = require('discord.js');
module.exports = {
	name: 'message',
	description: 'Send Messages in Tickets',
	group: 1,
	execute(message, args) {
		if (!message.member.roles.cache.has('714938663988887613') || message.channel.parentID !== '738712818013962322') return;
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
			msgembed.setDescription('> **<#774005111173152848> :لفتح تيكيت ماين يرجى التوجه إلى روم**\n> **ثم الضغط على تيكيت المخصص للدعم الفني الخاص بماين كرافت**\n**( Minecraft Support )**\n**كما في الصورة :**')
				.setImage('https://i.imgur.com/LlI1Wef.png');
			break;

		case 'ask':
			msgembed.setDescription('> **🤔 أقدر أساعدك بشي ثاني ؟**');
			break;

		case 'room':
			msgembed.setDescription('> **`Private Room .`**\n**Private Room Name :**\n**Voice Room or Text Room :**\n**Visable or Hidden :**\n**Lock or Unlock :**\n**Whitelisted Members :**\n**Blacklisted Members :**');
			break;

		case 'role':
			msgembed.setDescription('> **`Private Role .`**\n**Private Role Name :**\n**Role Color :**\n**Members :**');
			break;

		default:
			break;
		}
		message.delete();
		if (msgembed.description) message.channel.send(msgembed);
	},
};