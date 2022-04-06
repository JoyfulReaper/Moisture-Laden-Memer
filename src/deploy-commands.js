// Run this file to register slash commands
// Set registerGlobal to true to register for all guilds (can take and hour)

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('../config.json');
const fs = require('fs');

// Change this to true to make slash commands globally avaliable instead of only
// in guildId
const registerGlobal = false;

const commands = [];
const commandFiles = fs.readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(token);

// This ridculous looking code is called an IIFE
// Used as a shortcut for running some async code in a sync function
(async () => {
    try {
        console.log('Started refreshing application (/) commands.');
        console.log(`registerGlobal: ${registerGlobal}`);

        if (registerGlobal) {
            await rest.put(
                Routes.applicationCommands(clientId),
                { body: commands },
            );
        }
        else {
            await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
        }

        console.log('Successfully reloaded application (/) commands.');
    }
    catch (error) {
        console.error(error);
    }
})();

/*
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
*/