const { SlashCommandBuilder } = require('@discordjs/builders');
const RedditApiClient = require('../apiClients/RedditApiClient.js');
// const { simpleEmbed } = require('../util/embedHelper');
// const { execute } = require('./animal.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('meme')
        .setDescription('Retrieves random memes from Reddit on r/memes'),
    async execute(interaction) {
            const reddit = new RedditApiClient();
            const posts = await reddit.getRisingSubreddit('meme');
            const embed = await reddit.getRandomEmbed(posts);

            interaction.reply({ embeds: [embed] });
    },
};