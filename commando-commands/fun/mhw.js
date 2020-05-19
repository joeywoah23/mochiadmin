const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle("Crystelian | ERR!")
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('RED');
const fetch = require('node-fetch')
const { stripIndents } = require('common-tags');
const leet = require('leet');

module.exports = class MHWCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'mhwid',
      aliases: ['aids'],
			group: 'fun',
			memberName: 'mhw',
			description: 'Searches for the ID in the Monster Hunter World API.',
      args: [
		{
			key: 'id',
            prompt: 'What do you want me to search for?',
            type: "string",
		},
	],
		});
	}

	async run(message, { id }) {
    const url = `https://mhw-db.com/ailments/${id}`;
    
    const res =  await fetch(url).then(url => url.json())
        
    message.say(`${res.name}\n${res.description}`)
    }
};
