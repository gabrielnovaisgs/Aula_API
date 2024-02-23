import express, { Request, Response } from 'express';
import userRouter  from './route';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../docs/swagger.output.json';

const app = express();

app.use(express.json());
app.get('/', (req: Request, res: Response)=> {
    return res.status(200).json('Welcome to the server!' );
});

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(userRouter);
app.all('*', (req: Request, res: Response) => {
    return res.status(404).send( 'Route not found');
})
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});