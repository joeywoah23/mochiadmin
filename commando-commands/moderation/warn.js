const { Command } = require('discord.js-commando')
const { MessageEmbed } = require('discord.js');
const db = require('quick.db')
const errembed = new MessageEmbed()
.setTitle(`${process.env.OS_NAME} | ERR!`)
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('RED');
module.exports = class WarningCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'warn',
      aliases: ['warning'],
      group: 'moderation',
      memberName: 'warn',
      description: 'Warns the mentioned member.',
      clientPermissions: ['ADMINISTRATOR'],
	    userPermissions: ['MANAGE_MESSAGES'],
      args: [
		{
			key: 'member',
            prompt: 'Who do you want to warn?',
            type: 'member'
        },
        {
            key: 'reason',
            prompt: 'Reasons aren\'t currently supported yet. Still why do you want to warn them?',
            type: 'string'
        }
	],
    });
  }
  async run(message, { member, reason }) {
    let warnAmount = db.fetch(`warnAmount_${member.id}`);
    
    if (warnAmount === null) warnAmount = 0;
    if (warnAmount === 3) member.kick({reason: "4 Infractions."});
    if (!member.kickable) message.say(`${member} has reached 4 infractions but I couldn't kick them!`)
    if (warnAmount === 6) member.ban({reason: "6 Infractions."});
    if (!member.bannable) message.say(`${member} has reached 6 infractions but I couldn't ban them!`)
    
    db.add(`warnAmount_${member.id}`, 1);
    
    const embed = new MessageEmbed()
    .setColor(`#${process.env.EMB_COLOR}`)
    .setTitle(`${process.env.OS_NAME} | Warning`)
    .setAuthor(`${member.user.username} | ${member.id}`, member.user.displayAvatarURL())
    .setDescription(`${member} has recieved a warning!`)
    .setThumbnail(this.client.user.displayAvatarURL())
    .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
    .addField("Moderator | Administrator", `${message.author}`, true)
    .addField("Warned User", `${member}`, true)
    .addField("Reason", `${reason}`)
    .setTimestamp();
    message.embed(embed)
}
}
