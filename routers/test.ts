import express from 'express';
import codeGen from '../modules/codeGen';
import UUID from '../modules/uuid';

const router = express.Router();

router.get('/code', (req, res) => {

    res.send(codeGen.generate());
})

router.get('/uuid', (req, res) => {

    res.send(UUID.generate());
})

router.get('/gun', (req, res) => {

    res.sendFile(__dirname, '../assets/pages/static/guntest.html');
})


export default router;