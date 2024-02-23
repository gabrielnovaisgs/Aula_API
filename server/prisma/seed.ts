import { PrismaClient } from "@prisma/client";

async function main(){
    console.log("Inserindo dados no banco de dados")
    const prisma = new PrismaClient();
    await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'alice@email.com',
            password: 'senha'
        }
    });
    
    await prisma.user.create({
        data: {
            name: 'Bob',
            email: 'bob@email.com',
            password: 'senha'
        }
    });
    
    await prisma.user.create({
        data: {
            name: 'Charlie',
            email: 'charlie@email.com',
            password: 'senha'
        }
    });
    
    await prisma.user.create({
        data: {
            name: 'Dave',
            email: 'dave@email.com',
            password: 'senha'
        }
    });
    
    await prisma.user.create({
        data: {
            name: 'Eve',
            email: 'eve@email.com',
            password: 'senha'
        }
    });
    console.log("Dados inseridos no banco de dados com sucesso!")
}

main()