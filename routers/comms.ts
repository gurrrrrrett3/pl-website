import express from 'express';
import { URL } from '..';
import codeGen from '../modules/codeGen';
import Database from '../modules/database';
const Router = express.Router();

Router.get('/', (req, res) => {

    const code = Database.startComm()

    res.send(code.toString())

});

Router.get("/get", (req, res) => {


    const code = req.query.code?.toString() ?? "";
    const request = req.query.request?.toString() ?? "";
    const frame = parseInt(req.query.frame?.toString() ?? "0");

    const username = req.query.username?.toString() ?? "";
    const balance = parseInt(req.query.balance?.toString() ?? "0");

   switch (request) {
         case "shop":
            if (frame == 0) {
                const shopCode = codeGen.generate()
                Database.saveShopCode(username, shopCode, balance);
                res.send(`${URL}/gunshop/code/${shopCode}`);
                break
            } 

            default:
                res.send("Invalid request")
                break
}
});

export default Router;