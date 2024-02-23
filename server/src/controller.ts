import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
const secret = "secret"
const prisma =  new PrismaClient()
export class UserController {

    
    static async getAllUsers(req: Request, res: Response) {
        const {offset, limit} = req.query;
        try{

            const users  = await prisma.user.findMany({
                skip: Number(offset) || 0,
                take: Number(limit) || 100
            });
            return res.json(users);
        }catch(err){
            return res.status(501).json({ error: "Erro inesperado" });
        }
    }   

    static async getUserById(req: Request, res: Response) {
        const { id } = req.params;
        try{

            const user = await prisma.user.findUnique({
                where: {
                    id: Number(id)
                }
            });
            if(!user){
                return res.status(404).json({ error: "Usuario não encontrado" });
            }

            return res.status(200).json(user);
        }catch(err){
            return res.status(501).json({ error: "Erro inesperado" });
        }
    }

    static async updateUser(req: Request, res: Response) {
        const { id } = req.params;
        const { name, email, password } = req.body;
       const data: any = {}
        if(email) data.email = email
        if(password) data.password = password
        if(name) data.name = name
        try{
            await prisma.user.update({
                where: {
                    id: Number(id)
                },
                data: data
            });
            return res.status(203).json({ message: "Usuario atualizado com sucesso" });
        }catch(err){
            return res.status(501).json({ error: "Erro inesperado" });
        }
    }

    static async cadatrarUser(req: Request, res: Response) {
        const { name, email, password } = req.body;

        try{
            const user = await prisma.user.findUnique({
                where:{
                    email: email
                }
            });

            if(user){
                return res.status(400).json({ error: "Email já cadastrado" });
            }

            await prisma.user.create({
                data: {
                    name,
                    email,
                    password
                }
            
            })
            return res.status(201).json({ message: `Usuario ${name} cadastrado com sucesso` });

        }catch(err){
            return res.status(501).json({ error: "Erro inesperado" }); 
        }
    }

    static async countUsers(req: Request, res: Response) {
        try{

            const totalUsers = await prisma.user.count();
            return res.json({ totalUsers });
        }catch(err){
            return res.status(501).json({ error: "Erro inesperado" });
        }
    }

    static async deleteUser(req: Request, res: Response) {
        const { id } = req.params;
        try{
            await prisma.user.delete({
                where: {
                    id: Number(id)
                }
            });
            return res.status(202).json({message: "Deletado com sucesso"});
        }catch(err){
            return res.status(501).json({ error: "Erro inesperado" });
        }
    }

    static async login(req: Request, res: Response) {
        const { email, password } = req.body;
        if(email == "admin@email.com" && password == "admin"){
            const token = jwt.sign({ email, role: 'admin' }, secret, {
                expiresIn: 300
            });
            return res.json({ token });
        }

        if(email == "amigo@email.com" && password == "amigo"){
            const token = jwt.sign({ email, role: 'amigo' }, secret, {
                expiresIn: 300
            });
            return res.json({ token });
        }

        return res.status(401).json({ error: "Usuario ou senha invalidos" });
    }

    static async html(req: Request, res: Response){
        console.log("Entoru")
        try{
            const users = await prisma.user.findMany()
            let html = "<html><header><title>Lista de usuarios</title></header><body>"
            html+= "<h1>Lista de usuarios</h1>"
            users.forEach(user => {
                html+= "<p>Nome: <b>"+user.name+"</b></p>";
                html += "<li>Id: "+user.id+"</li>"
                html += "<li>Email: "+user.email+"</li>"
                html += "</br>"
            })
            html += "</body></html>"
            return res.status(200).send(html);

        }catch(err){
            console.log(err)
            return res.status(501).json({ error: "Erro inesperado" });
        }
    }

    static async admin(req: Request, res: Response) {
        const token = req.headers['authorization'];
        if(!token){
            return res.status(401).json({ error: "Token não informado" });
        }
        try{

            const decoded: any  = jwt.verify(token.replace('Barear ',''), secret);
            if(decoded == null){
                return res.status(401).json({ error: "Token invalido" });
            }
            if(decoded.role != 'admin'){
                return res.status(401).json({ error: "Usuario não autorizado" });
            }
            return res.json({ message: "Meus dados sigilosos" });
        }catch(err){
            return res.status(401).json({ error: "Token invalido" });
        }
    }

}