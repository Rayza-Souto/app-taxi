import express, { Request, Response } from 'express';
import  EstimateRideComponent  from './frontend/pages/rideEstimate';


const app = express();
const port = 8080;

app.get('/', (req: Request, res: Response) => {
    res.send ('Página inicial');
});

app.get('/ride/estimate', (req: Request, res: Response) => {
    res.send(<EstimateRideComponent />);
});

app.get('/ride/confirm', (req: Request, res: Response) => {
    res.send('Página de confirmação de corrida');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});