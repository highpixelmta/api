import { Message, EmbedBuilder, TextChannel, NewsChannel, DMChannel, PartialDMChannel, MessageCollector } from "discord.js";

export default {
  name: "embed",
  execute: async (message: Message, args: string[]) => {
    // Verifica se o comando foi enviado de maneira correta (sem argumentos extras)
    if (args.length > 0) {
      return message.reply("Este comando não requer argumentos diretamente. Vamos começar o processo de criação do embed!");
    }

    try {
      // Verifica se o canal é um tipo de canal de texto válido
      if (
        !(message.channel instanceof TextChannel || message.channel instanceof NewsChannel || message.channel instanceof DMChannel)
      ) {
        return message.reply("Este comando só pode ser usado em canais de texto ou DM.");
      }

      // Envia uma mensagem pedindo o título
      const titleMessage = await message.reply("Por favor, forneça o título do embed.");
      
      // Espera pela resposta do usuário no canal de texto
      const titleResponse = await message.channel.awaitMessages({
        max: 1,
        time: 30000,
        errors: ["time"],
      });

      const title = titleResponse.first()?.content;
      if (!title) {
        return message.reply("Você não forneceu um título a tempo.");
      }

      // Deleta a mensagem do título
      await titleMessage.delete();

      // Envia uma mensagem pedindo o corpo
      const bodyMessage = await message.reply("Agora, forneça o corpo do embed.");
      const bodyResponse = await message.channel.awaitMessages({
        max: 1,
        time: 30000,
        errors: ["time"],
      });

      const body = bodyResponse.first()?.content;
      if (!body) {
        return message.reply("Você não forneceu o corpo a tempo.");
      }

      // Deleta a mensagem do corpo
      await bodyMessage.delete();

      // Envia uma mensagem pedindo o rodapé
      const footerMessage = await message.reply("Por fim, forneça o rodapé do embed.");
      const footerResponse = await message.channel.awaitMessages({
        max: 1,
        time: 30000,
        errors: ["time"],
      });

      const footer = footerResponse.first()?.content;
      if (!footer) {
        return message.reply("Você não forneceu o rodapé a tempo.");
      }

      // Deleta a mensagem do rodapé
      await footerMessage.delete();

      // Cria o embed com os valores fornecidos
      const embed = new EmbedBuilder()
        .setColor("#6959CD")
        .setTitle(title) // Título do embed
        .setDescription(body) // Corpo do embed
        .setFooter({ text: footer }); // Rodapé do embed

      // Envia o embed no canal de texto
      await message.channel.send({ embeds: [embed] });

      // Tenta deletar a mensagem do comando
      await message.delete().catch((err) =>
        console.error("Erro ao deletar a mensagem do comando:", err)
      );
    } catch (error) {
      console.error("Erro ao criar o embed:", error);
      message.reply("Houve um erro ao criar o embed.");
    }
  },
};
