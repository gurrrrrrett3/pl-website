import express from 'express';
import path from 'path';
import Gun from '../modules/gun';
import { GunRegister } from '../modules/types/guns';

import test from './test';
import auth from './auth';
import comms from './comms';

import Database from '../modules/database';
import UUID from '../modules/uuid';
import { Data } from '../modules/types/data';
import codeGen from '../modules/codeGen';

import prices from '../data/prices.json';
import { ShopCode } from '../modules/types/shopcode';
import GetShopPrices from '../modules/getShopPrices';
import { Client } from '..';
import Discord from 'discord.js';

const router = express.Router();

router.use("/test", test)
router.use("/auth", auth)
router.use("/comms", comms)

router.post('/gunregister', (req, res) => {

    const gunRegister: GunRegister ={
        username: req.query.u?.toString() ?? "",
        userUuid: req.query.uu?.toString() ?? UUID.generate(),
        gunType: req.query.t?.toString() ?? "",
        registeredBy: req.query.c?.toString() ?? ""
    }
    
    const gun = new Gun(gunRegister.gunType, gunRegister.username, gunRegister.userUuid, gunRegister.registeredBy);
    
    Database.saveGun(gun);

    const data: Data = {
        success: true,
        message: "Gun registered",
        data: gun.dataToServer()
}

    res.send(data)
})


router.get("/gun/:id", (req, res) => {
    const gun = Database.getGun(req.params.id);

    if(gun) {

        const data: Data = {
            success: true,
            message: "Gun found",
            data: gun
        }
        res.send(data);
    } else {
        res.send({
            success: false,
            message: "Gun not found"
        });
    }

})

router.get("/user/:username/guns", (req, res) => {

    const user = Database.getGunsByUsername(req.params.username);

    if(user) {
        const data: Data = {
            success: true,
            message: "User found",
            data: user
        }
        res.send(data);
    } else {
        const data: Data = {
            success: false,
            message: "User not found",
            data: null
        }

        res.send(data);
    }
})

router.get("/ping", (req, res) => {
    const data: Data = {
        success: true,
        message: "Pong",
        data: {
            timestamp: Date.now(),
            ip: req.ip
        }
    }

    res.send(data);
})

router.get("/string/ping", (req, res) => {
    res.send(`true,Pong,${Date.now()},${req.ip}`);
})

router.get('/code', (req, res) => {

    res.send(codeGen.generate());
})

router.get('/json/code', (req, res) => {

    res.send({    
        code: codeGen.generate()
    });
})

router.get('/uuid', (req, res) => {

    res.send(UUID.generate());
})

router.get('/json/uuid', (req, res) => {

    res.send({
        code: UUID.generate()
    });
})

router.get('/prices', (req, res) => {

    res.send(prices);

}) 

router.get('/shop/:code', (req, res) => {

    const code = req.params.code.toString();

    if (!code) {
        res.send({
            success: false,
            message: "No code provided"
        });
        return;
    }


    const ShopData = Database.getShopCode(code)
    
    if (!ShopData) {
        res.send({
            success: false,
            message: "Code not found"
        });
        return;
    }

    res.send(ShopData)

})

router.get('/alt', (req, res) => {
 
    res.sendFile(path.join(__dirname, '../assets/pages/static/alt.html'));

    console.log(req.ip);
})

router.get('/shop/:code/buy', (req, res) => {

    const code = req.params.code.toString();

    const data = req.query.d?.toString() ?? "";

    if (!code) {
        res.redirect("/");
        return;
    }

    const shopData = Buffer.from(data, 'hex');
    const itemList = shopData.toString().split(",");

   const totalCost = GetShopPrices.computePrices(itemList);

   const shopCode = Database.getShopCode(code);

    if(shopCode) {

        if(shopCode.balance >= totalCost) {

            const newBalance = shopCode.balance - totalCost;
           // Database.updateShopCodeBalance(code, newBalance);

            res.send({
                success: true,
                message: "Purchase successful",
                balance: newBalance
            });

            const embed = new Discord.MessageEmbed()

            embed.setTitle(`Purchase by ${shopCode.username} for ${totalCost}`)
            .setDescription(`${itemList.join("\n")}`)
            .setColor("#00ff00")
            .setTimestamp();

            //@ts-ignore
            Client.sendEmbed(embed, Client.channels.find(c => c.name === "purchase-log").channel);


        } else {
            res.send({
                success: false,
                message: "Not enough money"
            });
        }
    } else {

        res.send({
            success: false,
            message: "Code not found"
        });
    }

})
export default router;