const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle(`${process.env.OS_NAME} | ERR!`)
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('RED');
const { Command } = require('discord.js-commando')
module.exports = class LockdownCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'lockdown',
      aliases: ['lock', "lockdown on", 'lock on'],
      group: 'extreme-moderation',
      memberName: 'lockdown_on',
      description: 'Locks the channel.',
      clientPermissions: ['ADMINISTRATOR'],
	    userPermissions: ['MANAGE_CHANNELS'],
      args: [
    {
      key: 'channel',
      prompt: 'What channel would you like me to lock?',
      type: 'channel',
    },
  ],
    });
  }
  async run(message, { channel }) {
    // const channel = <client>.channels.cache.get('<id>');
    const logsChannel = this.client.channels.cache.find(ch => ch.name === 'mochi-logs');
    if (!logsChannel) message.guild.channels.create('mochi-logs', { type: 'text' }).catch(console.error);
    channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: false });
const embed = new MessageEmbed()
    .setColor(`#${process.env.EMB_COLOR}`)
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .setTitle(`${process.env.OS_NAME} | Lockdown`)
    .setDescription(`${channel} has been locked.`);
message.embed(embed);
logsChannel.send(embed);
    }
}
