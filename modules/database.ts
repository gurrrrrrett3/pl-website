import fs from "fs";
import Gun from "./gun";

export default class Database {
	public static getGun(code: string) {
		if (fs.existsSync(`./data/guns.json`)) {
			const guns = JSON.parse(fs.readFileSync(`./data/guns.json`, "utf8"));

			const foundGun = guns.find((gun: Gun) => gun.code === code);
			return foundGun;
		} else {
			fs.writeFileSync(`./data/guns.json`, JSON.stringify({}));
			return null;
		}
	}

	public static saveGun(gun: Gun) {
		if (fs.existsSync(`./data/guns.json`)) {
			const guns = JSON.parse(fs.readFileSync(`./data/guns.json`, "utf8"));

			guns.push(gun);

			fs.writeFileSync(`./data/guns.json`, JSON.stringify(guns, null, 2));
		} else {
			fs.writeFileSync(`./data/guns.json`, JSON.stringify([gun]));
		}
	}

	public static deleteGun(uuid: string) {
		if (fs.existsSync(`./data/guns.json`)) {
			const guns = JSON.parse(fs.readFileSync(`./data/guns.json`, "utf8"));

			const index = guns.findIndex((gun: Gun) => gun.gunUuid === uuid);

			if (index !== -1) {
				guns.splice(index, 1);
			}

			fs.writeFileSync(`./data/guns.json`, JSON.stringify(guns, null, 2));
		}
	}

	public static getGunsByUsername(username: string) {
		if (fs.existsSync(`./data/guns.json`)) {
			const guns = JSON.parse(fs.readFileSync(`./data/guns.json`, "utf8"));

			const foundGuns: Gun[] = guns.filter((gun: Gun) => gun.username === username);
			return foundGuns;
		} else {
			fs.writeFileSync(`./data/guns.json`, JSON.stringify({}));
			return null;
		}
	}
}
