const fetch = require('node-fetch');
const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');

module.exports = class InsultCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'insult',
      group: 'fun',
      memberName: 'insult',
      description: 'Generate an evil insult!',
      throttling: {
        usages: 1,
        duration: 6
      }
    });
  }

  run(message) {
    // thanks to https://evilinsult.com :)
    fetch('https://evilinsult.com/generate_insult.php?lang=en&type=json')
      .then(res => res.json())
      .then(json => {
        const embed = new MessageEmbed()
          .setColor(`#${process.env.EMB_COLOR}`)
          .setTitle('Evil Insult')
          .setDescription(json.insult)
          .setURL('https://evilinsult.com');
        return message.say(embed);
      })
      .catch(err => {
        message.say('Failed to deliver insult :sob:');
        return console.error(err);
      });
  }
};