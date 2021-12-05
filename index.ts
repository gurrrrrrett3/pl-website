import express from 'express';
import path from 'path';
import server from './routers/server';
import home from './routers/home';
import gun from './routers/gun';

const port = 80
const app = express()

app.use('/api', server)
app.use("/", home)
app.use("/gun", gun)
app.use("/gun", gun)
app.use("/assets", express.static(path.join(__dirname, 'assets')))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}
)