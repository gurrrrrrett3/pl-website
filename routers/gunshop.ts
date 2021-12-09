import express from "express";
import Database from "../modules/database";
import SetLocalStorage from "../modules/setLocalStorage";
import path from 'path';
const router = express.Router();

router.get("/code/:code", (req, res) => {
	let code = req.params.code;

	if (!code) {
		res.redirect("/");
		return;
	}

	const userData = Database.getShopCode(code)

    if (!userData) {
        res.redirect("/");
        return;
    }

	res.send(SetLocalStorage("code", code, "../"));
})

router.get("/", (req, res) => {

	res.sendFile(path.join(__dirname, '../assets/pages/static/gunshop.html'))

})

export default router;
