import { Sequelize } from 'sequelize-typescript'

export const sequelize = new Sequelize({
  host: "ep-sparkling-waterfall-a4fnusw9.us-east-1.aws.neon.tech",
  dialect: "postgres",
  port: 5432,
  logging: false,
  dialectOptions: {
    project: "ep-sparkling-waterfall-a4fnusw9",
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

sequelize.addModels([]);