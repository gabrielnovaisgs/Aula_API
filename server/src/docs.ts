import swaggerAutogen from "swagger-autogen";

const options = {
    openapi: "3.1.0",
    info: {
        title: 'Aula de API',
        description: 'Aula de conceitos básicos de API',
      },
      servers:[
        {
            url:"http://localhost:3000",
            description: "Development server"
        },
        {
            url:"https://site.oficial.com",
            description: "Production server"
        }
    ],
    components: {
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        
        }
    },
    

    
}

const outputFile = "./docs/swagger.output.json";


swaggerAutogen({openapi: '3.0.0'})(outputFile, ['./route.ts'], options);