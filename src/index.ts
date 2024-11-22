import express, { Request, Response } from 'express';



const app = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => {
    res.send ('Página inicial');
});

app.get('/ride/estimate', (req: Request, res: Response) => {
    res.send('Estimativa de corrida');
});

app.get('/ride/confirm', (req: Request, res: Response) => {
    res.send('Confirmação de corrida');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});