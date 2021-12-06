import express from 'express';
import codeGen from '../modules/codeGen';
import UUID from '../modules/uuid';
import path from 'path';

const router = express.Router();

router.get('/code', (req, res) => {

    res.send(codeGen.generate());
})

router.get('/uuid', (req, res) => {

    res.send(UUID.generate());
})

router.get('/gun', (req, res) => {

    res.sendFile(path.resolve(__dirname + '/../assets/pages/static/guntest.html'));
})


export default router;