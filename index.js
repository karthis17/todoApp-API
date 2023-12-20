import express from 'express';
import cors from 'cors';
import userRouter from "./router/user.router.js";
import todoRouter from "./router/todolist.router.js";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.use('/api/user', userRouter);
app.use('/api/todo', todoRouter);

app.listen(port, (req, res) => {
    console.log(`listening on port ${port} http://localhost:${3000}`);
});