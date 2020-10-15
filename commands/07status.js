const request = require('request');
const Discord = require('discord.js');
const fs = require('fs');


module.exports = {
	name: 'status',
	description: 'Show Vagmemes Server\'s status',
	group: '2',
	execute(message) {
		const statusembed = new Discord.MessageEmbed()
			.setTitle('__Vagmemes Stats__')
			.setTimestamp()
			.setFooter(`Requested By » ${message.author.username}`);
		const url = 'https://api.mcsrvstat.us/2/vagmemes.com';
		request(url, function(err, response, body) {
			if (err) {
				console.log(err);
				return message.channel.send('Error');
			}
			body = JSON.parse(body);
			if (!body.online) {
				statusembed
					.setDescription('**Status » `Offline`**')
					.setColor('#ff0000');
			}
			else {
				statusembed
					.setColor('#0f8eff')
					.setDescription(`**Status » \`Online\`** \n**Server IP » \`${body.hostname}\`** \n**MOTD » \`${body.motd.clean}\`** \n**Version » \`${body.version}\`** \n**Online Players » \`${body.players.online}\`** \n**Max Players » \`${body.players.max}\`**`);
			}
			if (body.icon) {
				const imagebase = body.icon.split('base64,');
				fs.writeFile('VagIcon.png', imagebase[1], { encoding: 'base64' }, function() {
					console.log('VagIcon.png Created');
				});
				statusembed
					.attachFiles(['./VagIcon.png'])
					.setThumbnail('attachment://VagIcon.png');
			}

			message.channel.send(statusembed);
		});
	},
};