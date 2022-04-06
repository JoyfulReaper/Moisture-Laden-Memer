const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const database = require('./data/database.js');
const { token } = require('../config.json');

// Runs deploy-commands.js before starting the bot to redeploy commands
require('child_process').fork('./deploy-commands.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

database.connect();

const eventFiles = fs.readdirSync('./events')
    .filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
    const event = require(`./events/${file}`);
    if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
    }
    else {
        client.on(event.name, (...args) => event.execute(...args));
    }
}

client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands')
    .filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}

client.login(token);