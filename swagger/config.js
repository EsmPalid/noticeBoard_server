import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

const option = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            version: "1.0.0",
            title: "API 문서",
            description: "설명 부분",
        },
        server: [
            {
                url: "http//localhost:3000",
            },
        ],
    },

    apis: ["./routes/*.js", "./swagger/schemas/*.yaml"],
};

const specs = swaggerJsdoc(option);

export { swaggerUi, specs };
