const { MessageEmbed } = require('discord.js');
const { defaultColor } = require('../../config.json');

const simpleEmbed = (title, description, image = undefined, url = undefined) => {
    const embed = new MessageEmbed()
        .setTitle(title)
        .setDescription(description)
        .setColor(defaultColor);

        if (image) {
            embed.setImage(image);
        }

        if (url) {
            embed.setURL(url);
        }

        return embed;
};

exports.simpleEmbed = simpleEmbed;