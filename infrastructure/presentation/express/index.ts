import 'dotenv/config';
import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import apiRoutes from '@infrastructure/presentation/express/routes';

const app = express();
const port = process.env.PORT ?? '3010';

app.use(helmet());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));
app.use('/api/v1', apiRoutes);

app.listen(port, () => {
    console.log(`User manager API running on port ${port}`);
});

export default app;