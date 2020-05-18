const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle(`${process.env.OS_NAME} | ERR!`)
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('RED');
const { Command } = require('discord.js-commando')
module.exports = class UnlockdownCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'enablechat',
      aliases: ['unlock', "lockdown off", 'lock off'],
      group: 'extreme-moderation',
      memberName: 'lockdown_off',
      description: 'Unlocks the channel.',
      clientPermissions: ['ADMINISTRATOR'],
	    userPermissions: ['MANAGE_CHANNELS'],
      args: [
    {
      key: 'channel',
      prompt: 'What channel would you like me to unlock?',
      type: 'channel',
    },
  ],
    });
  }
  async run(message, { channel }) {
    const logsChannel = this.client.channels.cache.find(ch => ch.name === 'mochi-logs');
    if (!logsChannel) message.guild.channels.create('mochi-logs', { type: 'text' }).catch(console.error);
    channel.updateOverwrite(channel.guild.roles.everyone, { SEND_MESSAGES: true });
const embed = new MessageEmbed()
    .setColor(`#${process.env.EMB_COLOR}`)
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .setTitle(`${process.env.OS_NAME} | Lockdown`)
    .setDescription(`${channel} has been unlocked.`);
message.embed(embed);
logsChannel.send(embed);
    }
}
