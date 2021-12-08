import fs from "fs";
import Gun from "./gun";
import codeGen from "./codeGen";
import { ShopCode } from "./types/shopcode";

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

	public static saveShopCode(username: string, code: string, balance: number) {
		if (fs.existsSync(`./data/codes.json`)) {
			const shop = JSON.parse(fs.readFileSync(`./data/codes.json`, "utf8"));

			shop.push({
				username: username,
				code: code,
				balance: balance,
			});

			fs.writeFileSync(`./data/codes.json`, JSON.stringify(shop, null, 2));
		} else {
			fs.writeFileSync(`./data/codes.json`, JSON.stringify([]));
		}
	}

	public static getShopCode(code: string) {
		if (fs.existsSync(`./data/codes.json`)) {
			const shop = JSON.parse(fs.readFileSync(`./data/codes.json`, "utf8"));

			const foundShop: ShopCode = shop.find((shop: any) => shop.code === code);

			return foundShop;
		} else {
			fs.writeFileSync(`./data/codes.json`, JSON.stringify([]));
			return null;
		}
	}

	public static startComm() {
		if (fs.existsSync(`./data/comm.json`)) {
			const code = Date.now();
			const data = JSON.parse(fs.readFileSync(`./data/comm.json`, "utf8"));

			data.push({
				code: code,
			});

			return code;
		} else {
			fs.writeFileSync(`./data/comm.json`, JSON.stringify([{ code: Date.now() }]));
			return Date.now();
		}
	}
}
