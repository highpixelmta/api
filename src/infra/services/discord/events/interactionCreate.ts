import { Client, GatewayIntentBits, Events, Interaction } from "discord.js";
import highpixelConfig from "../../../../config/highpixel.config";

export default class StartBOT {
  public bot: Client;

  constructor() {
    this.bot = new Client({
      intents: [GatewayIntentBits.Guilds],
    });

    this.bot.on(Events.ClientReady, () => {
      console.log(`Bot online como ${this.bot.user?.tag}`);
    });

    this.bot.on(Events.InteractionCreate, async (interaction: Interaction) => {
      if (!interaction.isChatInputCommand()) return;

      if (interaction.commandName === "ping") {
        await interaction.reply("Pong!");
      }
    });

    this.bot.login(highpixelConfig.Discord.token);
  }
}
