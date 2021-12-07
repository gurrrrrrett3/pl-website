import express from 'express';
import Gun from '../modules/gun';
import { GunRegister } from '../modules/types/guns';

import test from './test';
import auth from './auth';

import Database from '../modules/database';
import UUID from '../modules/uuid';
import { Data } from '../modules/types/data';
import codeGen from '../modules/codeGen';

const router = express.Router();

router.use("/test", test)
router.use("/auth", auth)

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

export default router;