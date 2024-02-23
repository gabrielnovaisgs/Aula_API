import swaggerAutogen from "swagger-autogen";

const options = {
    openapi: "3.1.0",
    info: {
        title: 'API Odin',
        description: 'API para controle do laboratório'
      },
      servers:[
        {
            url:"http://localhost:3000",
            description: "Development server"
        },
        {
            url:"https://api-admin-teste.bymycell.com",
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