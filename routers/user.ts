import express from 'express';
import path from 'path';
const router = express.Router();

router.get('/', (req, res) => {

    res.sendFile(path.resolve(__dirname + "/../assets/pages/static/user.html"));

})

export default router;