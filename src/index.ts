import express, { Request, Response } from 'express';


const app = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => {
    res: ('Página inicial');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});