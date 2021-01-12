const fs = require('fs');
const Discord = require('discord.js');
const Client = require('./client/Client');
const { prefix, token } = require('./config.json');

const client = new Client();
client.commands = new Discord.Collection();

const Timestamps = new Discord.Collection();
module.exports = Timestamps;

const commandFiles = fs
	.readdirSync('./commands')
	.filter((file) => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
	console.log(`${command.name}: ${command.description}`);
}

client.once('ready', () => {
	console.log('Ready!');
	client.user.setPresence({ activity: { name: 'Vagmemes Server | Type v!help', type: 'WATCHING' }, status: 'online' });
});

const invites = {};

const wait = require('util').promisify(setTimeout);

client.on('ready', () => {
	wait(1000);

	client.guilds.cache.forEach(g => {
		g.fetchInvites().then(guildInvites => {
			invites[g.id] = guildInvites;
		});
	});
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});
client.on('message', async (message) => {
                if (message.author.bot) return;
                if (message.channel.name !== '・𝚂uggestions') return;
		const sugembed = new MessageEmbed()
			.setColor('#6281F0')
			.setAuthor('Vagmemes Suggestions', message.guild.iconURL())
			.setDescription(`**📑 \`Suggestion\` » \n ${message.content}**\n\n`)
			.setThumbnail(message.author.avatarURL({ dynamic: true }))
			.setFooter(`By » ${message.author.username}`)
			.setTimestamp();
		message.channel.send(sugembed).then(async sug => {
		await message.delete();
		await sug.react('796800628927234078');
		await sug.react('796800690428182558');
		}).catch(() => message.channel.send('**:no_entry: - An error occurred while sending the suggestion, please try again later'));
});
client.on('message', async (message) => {
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;
	if (message.channel.type == 'dm') return message.channel.send('**❌ - This command can only be used in Vagmemes server.**');

	try {
		command.execute(message, args, client);
	}
	catch (error) {
		console.error(error);
	}
	if (message.content.startsWith(`${prefix}m `)) {
		client.commands.get('message').execute(message, args);
	}
});

client.on('guildMemberAdd', member => {
	member.guild.fetchInvites().then(guildInvites => {
		const ei = invites[member.guild.id];
		invites[member.guild.id] = guildInvites;
		const invite = guildInvites.find(i => ei.get(i.code).uses < i.uses);
		const inviter = client.users.cache.get(invite.inviter.id);
		const logChannel = member.guild.channels.cache.find(channel => channel.name === '❖・𝚆elcome');
		const inviteembed = new Discord.MessageEmbed()
			.setTitle('**__New Member__**')
			.setDescription(`**User » ${member} ,\nInvited By »** ${inviter}`)
			.setThumbnail(member.user.avatarURL())
			.setTimestamp()
			.setFooter('Joined At » ')
			.setColor('#0f8eff');
		if (inviter) {
			inviteembed
				.setDescription(`**User » ${member} ,\nInvited By »** ${inviter}`);
			logChannel.send(inviteembed);
		}
		if (!inviter) {
			inviteembed
				.setDescription(`**User » ${member} .**`);
			logChannel.send(inviteembed);
		}
	});
});

client.login(token);
