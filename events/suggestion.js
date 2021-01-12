module.export = {
  name: 'suggestion',
  async execute(message, client){
		const sugembed = new Discord.MessageEmbed()
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
		}).catch(() => message.channel.send('**:no_entry: - An error occurred while sending the suggestion, please try again later')
  }
}
