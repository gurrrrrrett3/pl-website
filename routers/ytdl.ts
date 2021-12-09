import express from 'express';
import ytdl from 'ytdl-core';
import fs from 'fs';
import path from 'path';
import SetLocalStorage from '../modules/setLocalStorage';
const router = express.Router();

router.get("/mp3", async (req, res) => {

    const url = req.query.url?.toString() ?? "";

    const video = await ytdl.getInfo(url);

    res.redirect(`/yt/info/save/${video.videoDetails.videoId}`);

    const file = `${__dirname}/../tmp/${video.videoDetails.videoId}.mp3`

    fs.writeFileSync(`${__dirname}/../tmp/${video.videoDetails.videoId}.lock`, "")

    ytdl(url).pipe(fs.createWriteStream(file)).once('close', () => {
    
        fs.rmSync(`${__dirname}/../tmp/${video.videoDetails.videoId}.lock`)
    
    });

});

router.get("/info/save/:code", (req, res) => {

    const code = req.params.code;

    res.send(SetLocalStorage("code", code, "../"))

})

router.get("/info/api/:code", (req, res) => {

    const code = req.params.code;

    if (fs.existsSync(`${__dirname}/../tmp/${code}.lock`)) {

       const file = `${__dirname}/../tmp/${code}.mp3`

       const l = fs.readFileSync(file).length

       res.send({
              size: l
         })
    } else {
        res.send({
            size: -1
        })
    }

})

router.get("/info/", (req, res) => {

    res.sendFile(path.join(__dirname, '../assets/pages/static/ytdl.html'))

})


router.get("/download/mp3/:code", (req, res) => {

    const code = req.params.code;

        const file = path.resolve(`${__dirname}/../tmp/${code}.mp3`)

        res.sendFile(file);

})
export default router;