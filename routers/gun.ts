import path from 'path';
import express = require('express');
import SetLocalStorage from '../modules/setLocalStorage';
const router = express.Router();

router.get("/view/:gun", (req, res) => { 

    const code = req.params.gun;

    res.send(SetLocalStorage("gunID", code, "/gun"));
})

router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../assets/pages/static/gunid.html"));
})
export default router;