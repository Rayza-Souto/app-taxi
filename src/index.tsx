import express, { Request, Response } from 'express';
import App from './frontend/pages/Inicial';


const app = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => {
    res.send ('Página inicial');
});

app.get('/ride/estimate', (req: Request, res: Response) => {
    res.send(<App />);
});

app.get('/ride/confirm', (req: Request, res: Response) => {
    res.send('Página de confirmação de corrida');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});