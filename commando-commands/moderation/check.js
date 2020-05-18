const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')

module.exports = class WarningCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'check',
      aliases: ['infractions'],
      group: 'moderation',
      memberName: 'check',
      description: 'Checks the mentioned member for warnings.',
      clientPermissions: ['ADMINISTRATOR'],
	    userPermissions: ['MANAGE_MESSAGES'],
      args: [
		{
			key: 'member',
            prompt: 'Who do you want to check?',
            type: 'member'
        },
	],
    });
  }
  async run(message, { member }) {
    let warnAmount = db.fetch(`warnAmount_${member.id}`);
    
    if (warnAmount === null) warnAmount = 0;
    
    const embed = new MessageEmbed()
    .setColor(`#${process.env.EMB_COLOR}`)
    .setTitle(`${process.env.OS_NAME} | Check/Infractions`)
    .setDescription(`This is a warning!`)
    .setThumbnail(this.client.user.displayAvatarURL())
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .addField("Checked Member", `${member}`)
    .addField("Warning Amount", `${warnAmount}`)
    .setTimestamp();
    message.embed(embed)
}
}
