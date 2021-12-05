import fs from 'fs';
import Gun from './gun';

export default class Database {

    public static getGun(code: string) {

        if (fs.existsSync(`./data/guns.json`)) {

            const guns = JSON.parse(fs.readFileSync(`./data/guns.json`, 'utf8'));

            const foundGun = guns.find((gun: Gun) => gun.code === code);
            return foundGun;

        } else {
                
                fs.writeFileSync(`./data/guns.json`, JSON.stringify({}));
                return null;
    
        }

    }

    public static saveGun(gun: Gun) {

        if (fs.existsSync(`./data/guns.json`)) {

            const guns = JSON.parse(fs.readFileSync(`./data/guns.json`, 'utf8'));

            const index = guns.findIndex((gun: Gun) => gun.code === gun.code);

            if (index === -1) {

                guns.push(gun);

            } else {

                guns[index] = gun;

            }

            fs.writeFileSync(`./data/guns.json`, JSON.stringify(guns, null, 2));

        } else {

            fs.writeFileSync(`./data/guns.json`, JSON.stringify([gun]));

        }

    }

}