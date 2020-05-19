const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle(`${process.env.OS_NAME} | ERR!`)
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('RED');
module.exports = class EchoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'echo',
      group: 'moderation',
      memberName: 'echo',
      description: 'Sends the message to the specified channel.',
      clientPermissions: ['ADMINISTRATOR'],
	    userPermissions: ['MANAGE_MESSAGES'],
      args: [
		{
			key: 'say',
            prompt: 'What do you want the bot/client to say?',
            type: 'string'
        },
        {
            key: 'channel',
            prompt: 'Where should I send that to?',
            type: 'channel'
        }
	],
    });
  }
  async run(message, { say, channel }) {
    message.delete()
    channel.send(say);
}
}
