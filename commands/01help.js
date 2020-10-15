/* eslint-disable indent */
const fs = require('fs');
const { prefix } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List all the available commands',
	group: '2',
	execute(message) {
		const str = ['', '', ''];
		const commandFiles = fs
			.readdirSync('./commands')
			.filter((file) => file.endsWith('.js'));
		for (const file of commandFiles) {
			const command = require(`./${file}`);
			str[command.group] += `**❖ Command »** \`${command.name}\`**, Description »** \`${command.description}\`\n`;
		}
		let hh = false;
		const helpembed = new Discord.MessageEmbed()
			.setColor('#006B84')
			.setAuthor('Vagmemes Help Message')
			.setTitle(`**Bot Prefix »** \`${prefix}\``)
			.setDescription('List of all the commands in this bot :')
			.addField('**Administrtors :**', str[0])
			.addField('**Staff :**', str[1])
			.addField('**All Members :**', str[2])
			.setFooter('Developers » 1R3B & RimiSkiller');

		message.author.send(helpembed).catch(() => {
			message.channel.send('**❌ - I couldn\'t send help message to you, please check if your DM is open.**');
			message.react('❌');
			hh = true;
			return;
		});
		setTimeout(() => {
			if (hh == false) return message.react('✅');
		}, 700);


	},
};