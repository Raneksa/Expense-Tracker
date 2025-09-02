import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Expense Tracker API',
      version: '1.0.0',
    },
  },
  apis: ['./src/server/routes/*.js'],
};

export const specs = swaggerJsdoc(options);