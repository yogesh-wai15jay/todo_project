import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import authenticationRouter from './routes/authentication';
import todoRouter from './routes/todos';
import commentRouter from './routes/comments';
// JWT middleware is imported and used in the todo routes

const app = express();
const port = 3000;

app.use(cors({
  origin: "*",
  credentials: true,
}));
app.use(bodyParser.json());
console.log("Testing 1");
app.get('/', (req, res) => {
  res.send('Hello, this is the default route!');
});
app.get('/yogesh', (req, res)=> {
    console.log("Testing 2");
  res.json({ message: 'Hello, Yogesh!' })});
// We will add our routes here later!
app.use('/auth', authenticationRouter);
app.use('/todo', todoRouter);
app.use('/comments', commentRouter);
// Connect to your MongoDB database
mongoose.connect('mongodb+srv://wai-jay15:LKmJHZ8TpJ*.58K@cluster0.2qm2zui.mongodb.net/todos?retryWrites=true&w=majority&appName=Cluster0', { dbName: "todos" });

app.listen(port, () => {
    console.log(`Happy Server is running on port ${port}`);
});

export default app;