import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.route.js';
import connectDB from './config/db.js';
import { PORT } from './config/config.js';
import { authenticateToken } from './helpers.js/jwt.helper.js';
import unless from 'express-unless';


connectDB();
const app = express();

//Setting up express
app.use(cors());
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: false, limit: '50mb' }));

authenticateToken.unless = unless;
app.use(
    authenticateToken.unless({
        path: [
            { url: '/user/login', methods: ['POST'] },
            { url: '/user/register', methods: ['POST'] },
        ],
    })
);

app.use('/user', userRoutes);

//Server Listening
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

//Export Server
export default app;
