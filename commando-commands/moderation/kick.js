const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle(`${process.env.OS_NAME} | ERR!`)
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('RED');
module.exports = class KickCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'kick',
      aliases: ['getrid'],
      group: 'moderation',
      memberName: 'kick',
      description: 'Kicks the mentioned member.',
      clientPermissions: ['ADMINISTRATOR'],
	    userPermissions: ['KICK_MEMBERS'],
      args: [
		{
			key: 'member',
            prompt: 'Who do you want to kick?',
            type: "member",
        },
        {
            key: 'Reason',
            prompt: 'Why do you want to kick them?',
            type: 'string'
        },
	],
    });
  }
  async run(message, { member, Reason }) {
    const logsChannel = this.client.channels.cache.find(ch => ch.name === 'mochi-logs');
    if (!logsChannel) message.guild.channels.create('mochi-logs', { type: 'text' }).catch(console.error);
    await member.kick({ reason: `${Reason}`})
    .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
const kicklog = new MessageEmbed()
.setTitle(`${process.env.OS_NAME} | Kick`)
.setDescription("Kicked")
.setColor(`#${process.env.EMB_COLOR}`)
.setFooter(this.client.user.username, this.client.user.displayAvatarURL())
.setThumbnail(this.client.user.displayAvatarURL())
.addField("**> Moderator | Administrator:**", `${message.author}`)
.addField("**> Member Kicked:**", `${member}`)
.addField("**> Reason:**", `${Reason}`);
const kicked = new MessageEmbed()
.setFooter(this.client.user.username, this.client.user.displayAvatarURL())
.setTitle(`${process.env.OS_NAME} | Kick`)
.setColor("#77dd77")
.setThumbnail(this.client.user.displayAvatarURL())
.setDescription(`**${message.author.tag}**, You have kicked ${member} from the server for ${Reason}`)
.addField("**> Kicked Member Id:**", `${member.id}`)
.addField("**> Moderator | Administrator:**", `${message.author.id}`)
.addField("**> Reason for kick:**", `${Reason}`);
  message.embed(kicked)
    }
}
