import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import test from '@infrastructure/presentation/express/test';

test();

const app = express();
const port = process.env.PORT ?? '3010';

app.use(helmet());
app.use(cors());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '100mb' }));

app.listen(port, () => {
    console.log(`User manager API running on port ${port}`);
});

export default app;