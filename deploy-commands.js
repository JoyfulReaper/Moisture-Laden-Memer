// Run this file to register slash commands
// Set registerGlobal to true to register for all guilds (can take and hour)

const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

// Change this to true to make slash commands globally avaliable instead of only
// in guildId
const registerGlobal = false;

// The slash commands to register
const commands = [
    new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
    new SlashCommandBuilder().setName('server').setDescription('Replies server info!'),
    new SlashCommandBuilder().setName('user').setDescription('Replies user info!'),
]
    .map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

if (registerGlobal) {
     rest.put(Routes.applicationCommands(clientId), { body: commands })
     .then(() => console.log('Successfully registered application commands. Please wait one hour to take effect.'))
     .catch(console.error);
}
else {
    rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log('Successfully registered application commands.'))
    .catch(console.error);
}