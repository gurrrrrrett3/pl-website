import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';


const router = express.Router();
router.use(bodyParser.json());

router.get('/', (req, res) => {

    res.sendFile(path.join(__dirname, '../assets/pages/static/index.html'));
})

export default router;