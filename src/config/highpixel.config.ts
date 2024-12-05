import { config } from 'dotenv';
config();

export default {
  level: 'alpha',
  product: 'HighPixel API',

  Auth: {
    secretKey: process.env.SECRET_KEY,
    expiresIn: '7d',
  },

  Discord: {
    prefixBot: ".",
    token: process.env.BOT_DISCORD_TOKEN,
    clientId: process.env.OAUTH2_DISCORD_CLIENT_ID,

    webhook: process.env.WEBHOOK_DISCORD,
    guildID: process.env.BOT_DISCORD_GUILD,
    channelLogs: process.env.BOT_DISCORD_LOGS_CHANNEL,
    roleMember: process.env.BOT_DISCORD_ROLE_MEMBER,
    roleManager: process.env.BOT_DISCORD_ROLE_MANAGER,
  },
};