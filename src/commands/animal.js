// Subcommands demo: https://discordjs.guide/interactions/registering-slash-commands.html#subcommands

const { SlashCommandBuilder } = require('@discordjs/builders');
const DuckApiClient = require('../apiClients/DuckApiClient.js');
const RedditApiClient = require('../apiClients/RedditApiClient.js');
const { simpleEmbed } = require('../util/embedHelper');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('animal')
        .setDescription('Cute animals')
        .addSubcommand(subcommand =>
            subcommand
                .setName('ducc')
                .setDescription('Quack quack!'))
        .addSubcommand(subcommand =>
            subcommand
                .setName('snek')
                .setDescription('hiss hiss')),
    async execute(interaction) {
        const subcommand = interaction.options.getSubcommand();
        if (subcommand === 'ducc') {
            await doDucc(interaction);
        }
        else if (subcommand == 'snek') {
            await doSnek(interaction);
        }
    },
};

async function doSnek(interaction) {
    const reddit = new RedditApiClient();
    const posts = await reddit.getRisingSubreddit('snek');
    const embed = await reddit.getRandomEmbed(posts);

    interaction.reply({ embeds: [embed] });
}

async function doDucc(interaction) {
    const duck = new DuckApiClient();
    const image = await duck.randomDuck();

    interaction.reply({ embeds: [simpleEmbed('Ducc', 'QUACK!', image.url).setFooter({ text: image.message })] });
}