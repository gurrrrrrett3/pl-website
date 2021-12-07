import express from 'express';
import path from 'path';
import server from './routers/server';
import home from './routers/home';
import gun from './routers/gun';
import users from './routers/users';
import user from './routers/user';
import gunshop from './routers/gunshop';

const port = 80
const app = express()

app.use('/api', server)
app.use("/", home)
app.use("/gun", gun)
app.use("/users", users)
app.use("/user", user)
app.use("/gunshop", gunshop)
app.use("/assets", express.static(path.join(__dirname, 'assets')))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
}
)