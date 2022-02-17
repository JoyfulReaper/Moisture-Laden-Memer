// Subcommand demo
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('user')
        .setDescription('Replies with user info!')
        .addUserOption(option => option.setName('target').setDescription('targeted user')),
    async execute(interaction) {

        const user = interaction.options.getUser('target');

        if (user) {
            await interaction.reply(`Username: ${user.username}\nID: ${user.id}`);
        }
        else {
            await interaction.reply(`Your username: ${interaction.user.username}\nYour ID: ${interaction.user.id}`);
        }
    },
};