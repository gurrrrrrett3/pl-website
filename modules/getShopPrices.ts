import fs from "fs";
import path from 'path';

const itemDB = fs.readFileSync(path.join(__dirname, "../data/prices.json"), "utf8");

		const itemList: {name :string, type: string, price: number}[] = JSON.parse(itemDB.toString()).guns;

export default class GetShopPrices {
	public static computePrices(items: string[]) {

		let totalPrice = 0;

		items.forEach((item) => {
			const storedItem = itemList.find((i) => i.type === item);

            if (storedItem) {

			totalPrice += storedItem.price;
            }
		});

		return totalPrice;
	}
}
