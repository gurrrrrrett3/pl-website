import express from 'express';
import Gun from '../modules/gun';
import { GunRegister } from '../modules/types/guns';

import test from './test';
import Database from '../modules/database';
import UUID from '../modules/uuid';

const router = express.Router();
router.use("/test", test)

router.post('/gunregister', (req, res) => {

    const gunRegister: GunRegister ={
        username: req.query.u?.toString() ?? "",
        userUuid: req.query.uu?.toString() ?? UUID.generate(),
        gunType: req.query.t?.toString() ?? "",
        registeredBy: req.query.c?.toString() ?? ""
    }
    
    const gun = new Gun(gunRegister.gunType, gunRegister.username, gunRegister.userUuid, gunRegister.registeredBy);
    
    Database.saveGun(gun);

    res.send({
        success: true,
        message: "Gun registered",
        gunData: gun.dataToServer()
    });

})

router.get("/gun/:id", (req, res) => {
    const gun = Database.getGun(req.params.id);

    if(gun) {
        res.send({
            success: true,
            message: "Gun found",
            gunData: gun
        });
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
        res.send({
            success: true,
            message: "User found",
            userData: user
        });
    } else {
        res.send({
            success: false,
            message: "User not found"
        });
    }
})

export default router;

