const MongooseRepository = require('../data/MongooseRepository.js');
const UserModel = require('../models/UserModel.js');
const UserRepo = new MongooseRepository({ Model: UserModel });

module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		console.log(`${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`);

        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
        console.log(`--- ${interaction.commandName}`);

        if (!command) {
            return;
        }

        addUser(interaction.user);

        try {
            await command.execute(interaction);
        }
        catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
	},
};

async function addUser(discordUser) {
    const user = await UserRepo.find({ UserId: `${discordUser.id}` }, false);
    if (!user) {
       await UserRepo.create({ userName: discordUser.username, userId: discordUser.id });
    }
}