const { MessageEmbed } = require('discord.js');

module.exports = {
    getMember(message, toFind) {
        toFind = toFind.toLowerCase();

        let target = message.guild.members.cache.get(toFind);

        if(!target && message.mentions.members)
        target = message.mentions.members.first();

        if(!target && toFind) {
            target = message.guild.members.cache.get(member => {
                return member.displayName.toLowerCase().includes(toFind) ||
                member.user.tag.toLowerCase().includes(toFind)
            });
        }

        if (!target)
            target = message.member;

            return target;
    },

    formatDate: function(date) {
    
        return new Intl.DateTimeFormat('en-US').format(date);
    },
  
  emoji: function emoji(id) {
return this.client.emojis.cache.get(id).toString();
}
  
  
}