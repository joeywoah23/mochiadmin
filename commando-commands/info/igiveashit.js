const { Command } = require('discord.js-commando');
const { MessageEmbed } = require('discord.js');
const errembed = new MessageEmbed()
.setTitle("Crystelian | ERR!")
.setDescription("An error has been located!\nThis could have happened due to `missing argument, you are missing permissions, or I am lacking permissions.`\nIf this error persists and you have all then necessary arguments, permissions, etc.\nPlease contact joeywoah_#5364.")
.setColor('RED');
const fetch = require('node-fetch')
const { stripIndents } = require('common-tags');
const leet = require('leet');

module.exports = class IGASCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'igiveashit',
      aliases: ['igas'],
			group: 'info',
			memberName: 'igiveashit',
			description: 'Use this command if you give a shit about what Joey says.',
      guildOnly: true
    });
	}

	async run(message) {
        const myRole = message.guild.roless.cache.find(role => role.name === "StaticSquad");
       if(!message.member.roles.cache.find(r => r.name === "StaticSquad")) {
    message.member.roles.add(myRole);
    message.say(`Thank you for giving a shit. You have been given the StaticSquad role for giving a shit.`)
       }

   if(message.member.roles.cache.find(r => r.name === "StaticSquad")) {
          message.member.roles.remove(myRole);
     message.say(`Sad to see you go 😭. StaticSquad role has been taken away. Goodbye 😔.`)
      }
	}
};
