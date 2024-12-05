import { CommandInteraction } from 'discord.js';

export default {
  name: 'ping',
  description: 'Responde com Pong!',
  execute: async (interaction: CommandInteraction) => {
    await interaction.reply('Pong!');
  },
};
