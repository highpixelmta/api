import { Message, TextChannel } from "discord.js";

async function safeDeleteMessage(message: Message) {
  try {
    if (message && message.deletable) {
      await message.delete();
    }
  } catch (error: unknown) {
    // Verificar se o erro possui a propriedade 'code' antes de tentar acessá-la
    if (error instanceof Error && (error as any).code === 10008) {
      return; // Mensagem já foi deletada ou não existe
    }
    // Loga outros tipos de erro que possam ocorrer
    console.error('Erro ao deletar mensagem:', error);
  }
}

export default {
  name: "clear",
  execute: async (message: Message, args: string[]) => {
    const amount = parseInt(args[0], 10);
    if (isNaN(amount) || amount <= 0) {
      return message.reply("Por favor, forneça um número válido de mensagens para deletar!");
    }

    if (message.channel instanceof TextChannel) {
      try {
        // Buscar as mensagens para excluir
        const fetched = await message.channel.messages.fetch({
          limit: Math.min(amount, 100),
        });

        // Deletar as mensagens com segurança
        const deletions = await message.channel.bulkDelete(fetched, true).catch((err) => {
          console.error("Erro ao deletar mensagens:", err);
          message.reply("Houve um erro ao tentar deletar as mensagens.");
        });

        // Verificar se há mensagens deletadas (mensagens que o bot não pôde deletar)
        if (deletions && deletions.size < fetched.size) {
          const notDeletedMessages = fetched.filter(
            (msg) => !deletions.has(msg.id)
          );
          console.warn(`Não foi possível deletar as seguintes mensagens: ${notDeletedMessages.size}`);
          
          // Deletar as mensagens restantes de forma individual
          for (const msg of notDeletedMessages.values()) {
            await safeDeleteMessage(msg);
          }
        }

        // Deletar a mensagem do comando
        await safeDeleteMessage(message);

      } catch (err: unknown) {
        console.error("Erro ao buscar ou deletar mensagens:", err);
        message.reply("Houve um erro ao tentar deletar as mensagens.");
      }
    } else {
      message.reply("Este comando só pode ser usado em canais de texto.");
    }
  },
};
