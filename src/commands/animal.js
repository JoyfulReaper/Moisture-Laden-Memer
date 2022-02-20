// Subcommands demo: https://discordjs.guide/interactions/registering-slash-commands.html#subcommands

const { SlashCommandBuilder } = require('@discordjs/builders');
const DuckApiClient = require('../apiClients/DuckApiClient.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('animal')
        .setDescription('Cute animals')
        .addSubcommand(subcommand =>
            subcommand
                .setName('ducc')
                .setDescription('Quack quack!')),
    async execute(interaction) {
        if (interaction.options.getSubcommand() === 'ducc') {
            doDucc(interaction);
        }
    },
};

async function doDucc(interaction) {
    const duck = new DuckApiClient();
    const image = await duck.randomDuck();
    console.log(image.url);
    interaction.reply(`QUACK\n${image.url}`);
}