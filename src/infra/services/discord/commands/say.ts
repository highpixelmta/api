import { Message, TextChannel, NewsChannel, DMChannel } from "discord.js";

export default {
  name: "say",
  execute: async (message: Message, args: string[]) => {
    const text = args.join(" ");
    if (!text) {
      return message.reply("Por favor, forneça uma mensagem para repetir!");
    }

    if (
      message.channel instanceof TextChannel ||
      message.channel instanceof NewsChannel ||
      message.channel instanceof DMChannel
    ) {
      await message.channel.send(text);
      await message.delete().catch((err) =>
        console.error("Erro ao deletar a mensagem do comando:", err)
      );
    } else {
      message.reply("Este comando não pode ser usado neste tipo de canal.");
    }
  },
};
