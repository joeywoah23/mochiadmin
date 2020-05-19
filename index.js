const {
  CommandoClient,
  SQLiteProvider,
  Commando
} = require("discord.js-commando");
const path = require("path");
const sqlite = require("sqlite");
const { stripIndents } = require("common-tags");
const { getMember, formatDate } = require("./functions.js");
const { MessageEmbed, Structures, Collection } = require("discord.js");
const { Op } = require("sequelize");
const currency = new Collection();
const chalk = require("chalk");
const Keyv = require('keyv');
const keyv = new Keyv('sqlite://warnings.sqlite');

Structures.extend("Guild", Guild => {
  class MusicGuild extends Guild {
    constructor(client, data) {
      super(client, data);
      this.musicData = {
        queue: [],
        isPlaying: false,
        volume: 1,
        songDispatcher: null
      };
      this.triviaData = {
        isTriviaRunning: false,
        wasTriviaEndCalled: false,
        triviaQueue: [],
        triviaScore: new Map()
      };
    }
  }
  return MusicGuild;
});

const client = new CommandoClient({
  commandPrefix: "?",
  owner: "630817206145646602",
  invite: "https://invite.gg/apolloisland",
  disableMentions: "roles",
  unknownCommandResponse: false,
});

client.registry
  .registerDefaultTypes()
  .registerGroups([
    ["economy", "Your Economy Command Group"],
    ["extreme-moderation", "The Administraton Command Group"],
    ["role-series", "The Role Series Command Group."],
    ["fun", "The Fun Command Group"],
    ["info", "The Info Command Group"],
    ["moderation", "The Normal Moderation Command Group"],
    ["music", "The Music Command Group"]
  ])
  .registerDefaultGroups()
  .registerDefaultCommands()
  .registerCommandsIn(path.join(__dirname, "commando-commands"));

client.once("ready", () => {
  console.log(
    chalk.magenta("MOCHI ADMIN"),
    `I have logged in as ${client.user.tag} (${client.user.id})`
  );
  client.user.setActivity(
    `${client.commandPrefix}help | ${process.env.OS_NAME}`
  );
});

keyv.on('error', err => console.log('Connection Error', err));

client.on("guildMemberAdd", member => {
  // Send the message to a designated channel on a server:
  const channel = member.guild.channels.cache.find(
    ch => ch.name === "mochi-logs"
  );
  // Do nothing if the channel wasn't found on this server
  if (!channel) return;
  // Send the message, mentioning the member
  const created = formatDate(member.user.createdAt);

  const embed = new MessageEmbed()
    .setTitle(`${process.env.OS_NAME} | Audit Logs`)
    .setColor(`#${process.env.EMB_COLOR}`)
    .setDescription(`${member} has joined the server. More Information Below.`)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter(client.user.username, client.user.displayAvatarURL())
    .addField(
      "Information",
      stripIndents`**> Member:** ${member}
	**> Member ID:** ${member.id}
	**> Member Tag:** ${member.user.tag}
	**> Account Created At:** ${created}`,
      true
    );
  channel.send(embed);
});

client.on("guildCreate", guild => {
  const embed = new MessageEmbed()
    .setAuthor(`${guild.name} | ${guild.id}`, guild.iconURL())
    .setTitle("🎉✨ | Thanks for inviting me!")
    .setColor(`${process.env.EMB_COLOR}`)
    .setThumbnail(client.user.displayAvatarURL())
    .setDescription(
      `Thanks for inviting me! My prefix is \`?\` or \`@${client.user.tag}\`.`
    )
    .addField("Discord.js Version", "12.2.0", true)
    .addField("Node Version", "12", true)
    .addField(
      `Developer of ${client.user.username}`,
      `Proudly developed by <@630817206145646602>!`
    )
    .setFooter(client.user.username, client.user.displayAvatarURL());

  guild.channels.cache
    .sort(function(chan1, chan2) {
      if (chan1.type !== `text`) return 1;
      if (!chan1.permissionsFor(guild.me).has(`SEND_MESSAGES`)) return -1;
      return chan1.position < chan2.position ? -1 : 1;
    })
    .first()
    .send(embed);
});

sqlite.open(path.join(__dirname, "settings.sqlite")).then(db => {
  client.setProvider(new SQLiteProvider(db));
});

client.on("error", console.error);

client.login(process.env.TOKEN);
