import express from "express";
import Database from "../modules/database";
import SetLocalStorage from "../modules/setLocalStorage";
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

    

})

export default router;
