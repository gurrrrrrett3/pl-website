import path from 'path';
import express = require('express');
const router = express.Router();

router.get("/view/:gun", (req, res) => { 

    const code = req.params.gun;

    res.send(`<a id="lnk"href="/gun"></a> <script>window.localStorage.setItem("gunID", "${code}");document.getElementById("lnk").click()</script> `);
})

router.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname + "/../assets/pages/static/gunid.html"));
})
export default router;