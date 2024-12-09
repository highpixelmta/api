import { Client, Events, GatewayIntentBits, Collection, REST, Routes } from "discord.js";
import { readdirSync } from "fs";
import { join } from "path";
import highpixelConfig from "../../../config/highpixel.config";

interface Command {
  name: string;
  execute: (message: any, args: string[]) => Promise<void>;
}

interface SlashCommand {
  name: string;
  description: string;
  execute: (interaction: any) => Promise<void>;
}

class StartBOT {
  public bot: Client;
  public commands: Collection<string, Command>;
  public slashCommands: SlashCommand[];

  constructor() {
    this.bot = new Client({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
      ],
    });

    this.commands = new Collection();
    this.slashCommands = [];
    this.loadCommands();
    this.loadSlashCommands();
    this.registerSlashCommands();

    this.bot.on(Events.ClientReady, () => {
      console.log(`Bot online como ${this.bot.user?.tag}`);
      this.bot.user?.setPresence({
        activities: [{ name: "Em Breve..", type: 0 }],
        status: "online",
      });
    });

    this.bot.on(Events.GuildMemberAdd, async (member) => {
        const role = await member.guild.roles.fetch(String(highpixelConfig.Discord.roleMember));
        if (role) {
          await member.roles.add(role);
        }
    });

    this.bot.on(Events.MessageCreate, async (message) => {
      if (message.author.bot || !message.content.startsWith(highpixelConfig.Discord.prefixBot)) return;

      const args = message.content.slice(highpixelConfig.Discord.prefixBot.length).trim().split(/\s+/);
      const commandName = args.shift()?.toLowerCase();

      const command = this.commands.get(commandName || "");
      if (command) {
        try {
          await command.execute(message, args);
        } catch (error) {
          console.error(`Erro ao executar o comando ${commandName}:`, error);
          message.reply("Houve um erro ao executar este comando.");
        }
      }
    });

    this.bot.on(Events.InteractionCreate, async (interaction) => {
      if (!interaction.isCommand()) return;

      const slashCommand = this.slashCommands.find(cmd => cmd.name === interaction.commandName);
      if (slashCommand) {
        try {
          await slashCommand.execute(interaction);
        } catch (error) {
          console.error(`Erro ao executar o comando de slash ${interaction.commandName}:`, error);
          await interaction.reply("Houve um erro ao executar este comando.");
        }
      }
    });

    this.bot.login(highpixelConfig.Discord.token);
  }

  private loadCommands() {
    const commandsPath = join(__dirname, "./commands");
    const commandFiles = readdirSync(commandsPath).filter((file) =>
      file.endsWith(".ts")
    );

    for (const file of commandFiles) {
      const filePath = join(commandsPath, file);
      const command: Command = require(filePath).default;
      if (command && command.name && typeof command.execute === "function") {
        this.commands.set(command.name, command);
      } else {
        console.warn(`Comando inválido em ${filePath}`);
      }
    }
  }

  private loadSlashCommands() {
    const slashCommandsPath = join(__dirname, "./slashCommands");
    const slashCommandFiles = readdirSync(slashCommandsPath).filter((file) =>
      file.endsWith(".ts")
    );

    for (const file of slashCommandFiles) {
      const filePath = join(slashCommandsPath, file);
      const slashCommand: SlashCommand = require(filePath).default;
      if (slashCommand && slashCommand.name && typeof slashCommand.execute === "function") {
        this.slashCommands.push(slashCommand);
      } else {
        console.warn(`Comando de slash inválido em ${filePath}`);
      }
    }
  }

  private async registerSlashCommands() {
    const commands = this.slashCommands.map(cmd => ({
      name: cmd.name,
      description: cmd.description,
    }));

    const rest = new REST({ version: "10" }).setToken(String(highpixelConfig.Discord.token));

    try {
      console.log("Iniciando o registro de comandos de slash...");
      await rest.put(
        Routes.applicationCommands(String(highpixelConfig.Discord.clientId)),
        { body: commands }
      );
      console.log("Comandos de slash registrados com sucesso!");
    } catch (error) {
      console.error("Erro ao registrar comandos de slash:", error);
    }
  }
}

export default new StartBOT();