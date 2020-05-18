const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle("Crystelian | ERR!")
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('RED');
const fetch = require('node-fetch')
const { stripIndents } = require('common-tags');
const leet = require('leet');


module.exports = class BanCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ban',
      aliases: ['banish'],
			group: 'extreme-moderation',
			memberName: 'ban',
      description: 'Bans the mentioned member.',
      clientPermissions: ['ADMINISTRATOR'],
	    userPermissions: ['BAN_MEMBERS'],
      args: [
		{
			key: 'member',
            prompt: 'Who do you want to ban?',
            type: "member",
        },
        {
            key: 'Reason',
            prompt: 'Why do you want to ban them?',
            type: 'string'
        },
	],
		});
	}

	async run(message, { member, Reason }) {
    const logsChannel = this.client.channels.cache.find(ch => ch.name === 'mochi-logs');
    if (!logsChannel) message.guild.channels.create('mochi-logs', { type: 'text' }).catch(console.error);
    await message.guild.members.ban(`${member}`, {reason: `${Reason}`})
            .catch(error => message.say(`Sorry ${message.author} I couldn't ban because of : ${error}`))
        const banlog = new MessageEmbed()
		.setTitle(`${process.env.OS_NAME} | Ban`)
		.setDescription("Banned")
		.setColor(`#${process.env.EMB_COLOR}`)
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .setThumbnail(this.client.user.displayAvatarURL())
		.addField("**> Moderator | Administrator:**", `${message.author}`)
		.addField("**> Member Banned:**", `${member}`)
		.addField("**> Reason:**", `${Reason}`);
    const banned = new MessageEmbed()
		.setTitle(`${process.env.OS_NAME} | Ban`)
		.setColor(`#${process.env.EMB_COLOR}`)
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .setThumbnail(this.client.user.displayAvatarURL())
    .setDescription(`**> ${message.author}**, You have banned ${member} from the server for ${Reason}!`)
    .addField("**> Banned Member ID:**", `${member.id}`)
    .addField("**> Moderator | Administrator:**", `${message.author.id}`)
    .addField("**> Reason for banishment:**", `${Reason}`);
          message.embed(banned)
    logsChannel.send(banlog)
  }
};
