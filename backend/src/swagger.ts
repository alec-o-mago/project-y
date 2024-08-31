import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'Project Y - Express Backend API',
        version: '1.0.0',
    },
    servers: [
        {
            url: 'http://localhost:3000',
        },
    ],
    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT',
            },
        },
    },
    security: [
        {
            bearerAuth: [],
        },
    ],
};

const options = {
    swaggerDefinition,
    apis: ['src/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default (app: Express) => {
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
